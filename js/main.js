// Facebook Clone - Fonctionnalités principales
class FacebookClone {
    constructor() {
        this.posts = [
            {
                id: 1,
                author: "Marie Dupont",
                time: "Il y a 2 heures",
                content: "Magnifique coucher de soleil aujourd'hui ! 🌅",
                likes: 15,
                comments: [
                    { author: "Pierre Martin", content: "Superbe photo !" },
                    { author: "Sophie Roux", content: "J'adore ! Où était-ce ?" }
                ],
                liked: false
            },
            {
                id: 2,
                author: "Pierre Martin",
                time: "Il y a 4 heures",
                content: "Premier jour de vacances ! Direction la montagne 🏔️",
                likes: 23,
                comments: [
                    { author: "Marie Dupont", content: "Profite bien !" }
                ],
                liked: true
            },
            {
                id: 3,
                author: "Sophie Roux",
                time: "Il y a 6 heures",
                content: "Nouveau projet terminé ! Fière du travail accompli 💪",
                likes: 31,
                comments: [],
                liked: false
            }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderPosts();
    }

    setupEventListeners() {
        // Modal pour créer un post
        const postInput = document.getElementById('post-input');
        const postModal = document.getElementById('post-modal');
        const closeModal = document.getElementById('close-modal');
        const publishPost = document.getElementById('publish-post');

        postInput?.addEventListener('click', () => {
            postModal.classList.remove('hidden');
        });

        closeModal?.addEventListener('click', () => {
            postModal.classList.add('hidden');
        });

        publishPost?.addEventListener('click', () => {
            this.createNewPost();
        });

        // Fermer le modal en cliquant à l'extérieur
        postModal?.addEventListener('click', (e) => {
            if (e.target === postModal) {
                postModal.classList.add('hidden');
            }
        });

        // Recherche
        this.setupSearch();
    }

    setupSearch() {
        const searchInput = document.querySelector('input[placeholder="Rechercher sur Facebook"]');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.filterPosts(query);
            });
        }
    }

    filterPosts(query) {
        if (!query) {
            this.renderPosts();
            return;
        }

        const filteredPosts = this.posts.filter(post => 
            post.author.toLowerCase().includes(query) || 
            post.content.toLowerCase().includes(query)
        );

        this.renderPosts(filteredPosts);
    }

    createNewPost() {
        const postContent = document.getElementById('post-content');
        const content = postContent.value.trim();

        if (content) {
            const newPost = {
                id: this.posts.length + 1,
                author: "Vous",
                time: "À l'instant",
                content: content,
                likes: 0,
                comments: [],
                liked: false
            };

            this.posts.unshift(newPost);
            this.renderPosts();
            
            // Réinitialiser le modal
            postContent.value = '';
            document.getElementById('post-modal').classList.add('hidden');

            // Animation de création
            this.animateNewPost();
        }
    }

    animateNewPost() {
        const firstPost = document.querySelector('#posts-container .post-item');
        if (firstPost) {
            firstPost.style.transform = 'translateY(-20px)';
            firstPost.style.opacity = '0';
            
            setTimeout(() => {
                firstPost.style.transition = 'all 0.3s ease';
                firstPost.style.transform = 'translateY(0)';
                firstPost.style.opacity = '1';
            }, 100);
        }
    }

    renderPosts(postsToRender = this.posts) {
        const container = document.getElementById('posts-container');
        if (!container) return;

        container.innerHTML = postsToRender.map(post => this.createPostHTML(post)).join('');
        
        // Ajouter les event listeners pour les interactions
        this.setupPostInteractions();
    }

    createPostHTML(post) {
        return `
            <div class="bg-white rounded-lg shadow-sm mb-6 post-item" data-post-id="${post.id}">
                <!-- En-tête du post -->
                <div class="p-4">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-gray-600"></i>
                        </div>
                        <div>
                            <p class="font-medium">${post.author}</p>
                            <p class="text-sm text-gray-500">${post.time}</p>
                        </div>
                        <div class="ml-auto">
                            <button class="text-gray-400 hover:text-gray-600">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Contenu du post -->
                    <div class="mb-4">
                        <p class="text-gray-800">${post.content}</p>
                    </div>
                </div>

                <!-- Statistiques -->
                ${post.likes > 0 || post.comments.length > 0 ? `
                <div class="px-4 pb-2">
                    <div class="flex justify-between text-sm text-gray-500">
                        ${post.likes > 0 ? `
                        <div class="flex items-center space-x-1">
                            <div class="flex -space-x-1">
                                <div class="w-5 h-5 bg-facebook-blue rounded-full flex items-center justify-center">
                                    <i class="fas fa-thumbs-up text-white text-xs"></i>
                                </div>
                            </div>
                            <span>${post.likes}</span>
                        </div>
                        ` : '<div></div>'}
                        ${post.comments.length > 0 ? `
                        <div>
                            <span>${post.comments.length} commentaire${post.comments.length > 1 ? 's' : ''}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}

                <!-- Actions -->
                <div class="border-t border-gray-200 px-4 py-2">
                    <div class="flex justify-around">
                        <button class="like-btn flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg flex-1 justify-center ${post.liked ? 'text-facebook-blue' : 'text-gray-600'}">
                            <i class="fas fa-thumbs-up"></i>
                            <span>J'aime</span>
                        </button>
                        <button class="comment-btn flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg flex-1 justify-center text-gray-600">
                            <i class="fas fa-comment"></i>
                            <span>Commenter</span>
                        </button>
                        <button class="share-btn flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-lg flex-1 justify-center text-gray-600">
                            <i class="fas fa-share"></i>
                            <span>Partager</span>
                        </button>
                    </div>
                </div>

                <!-- Section commentaires -->
                <div class="comments-section border-t border-gray-200 ${post.comments.length === 0 ? 'hidden' : ''}">
                    <div class="p-4 space-y-3">
                        ${post.comments.map(comment => `
                            <div class="flex space-x-3">
                                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-user text-gray-600 text-xs"></i>
                                </div>
                                <div class="bg-gray-100 rounded-xl px-3 py-2 flex-1">
                                    <p class="font-medium text-sm">${comment.author}</p>
                                    <p class="text-sm">${comment.content}</p>
                                </div>
                            </div>
                        `).join('')}
                        
                        <!-- Zone de saisie des commentaires -->
                        <div class="flex space-x-3">
                            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-user text-gray-600 text-xs"></i>
                            </div>
                            <div class="flex-1">
                                <input type="text" placeholder="Écrivez un commentaire..." 
                                       class="w-full bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:bg-white focus:shadow-sm comment-input">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupPostInteractions() {
        // Gestion des likes
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postElement = e.target.closest('.post-item');
                const postId = parseInt(postElement.dataset.postId);
                this.toggleLike(postId);
            });
        });

        // Gestion des commentaires
        document.querySelectorAll('.comment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postElement = e.target.closest('.post-item');
                const commentsSection = postElement.querySelector('.comments-section');
                commentsSection.classList.toggle('hidden');
            });
        });

        // Soumission des commentaires
        document.querySelectorAll('.comment-input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                    const postElement = e.target.closest('.post-item');
                    const postId = parseInt(postElement.dataset.postId);
                    this.addComment(postId, e.target.value.trim());
                    e.target.value = '';
                }
            });
        });

        // Gestion du partage
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.sharePost();
            });
        });
    }

    toggleLike(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            this.renderPosts();
            
            // Animation du like
            this.animateLike(postId);
        }
    }

    animateLike(postId) {
        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        const likeBtn = postElement.querySelector('.like-btn');
        
        likeBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            likeBtn.style.transform = 'scale(1)';
        }, 150);
    }

    addComment(postId, content) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.comments.push({
                author: "Vous",
                content: content
            });
            this.renderPosts();
        }
    }

    sharePost() {
        // Simulation du partage
        const shareModal = this.createShareModal();
        document.body.appendChild(shareModal);
        
        setTimeout(() => {
            shareModal.remove();
        }, 2000);
    }

    createShareModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        modal.innerHTML = '<i class="fas fa-check mr-2"></i>Post partagé !';
        return modal;
    }

    // Fonctionnalités additionnelles
    initializeRealtimeFeatures() {
        // Simulation de nouvelles notifications
        setInterval(() => {
            this.simulateNotification();
        }, 30000); // Toutes les 30 secondes

        // Simulation de nouveaux messages
        setInterval(() => {
            this.simulateMessage();
        }, 45000); // Toutes les 45 secondes
    }

    simulateNotification() {
        const notificationBtn = document.querySelector('.fa-bell').parentElement;
        if (notificationBtn) {
            // Ajouter un point rouge de notification
            if (!notificationBtn.querySelector('.notification-dot')) {
                const dot = document.createElement('div');
                dot.className = 'notification-dot absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full';
                notificationBtn.style.position = 'relative';
                notificationBtn.appendChild(dot);
            }
        }
    }

    simulateMessage() {
        const messageBtn = document.querySelector('.fa-facebook-messenger').parentElement;
        if (messageBtn) {
            // Ajouter un point rouge de notification
            if (!messageBtn.querySelector('.message-dot')) {
                const dot = document.createElement('div');
                dot.className = 'message-dot absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full';
                messageBtn.style.position = 'relative';
                messageBtn.appendChild(dot);
            }
        }
    }
}

// Fonctions utilitaires
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    const app = new FacebookClone();
    
    // Initialiser les fonctionnalités en temps réel après 5 secondes
    setTimeout(() => {
        app.initializeRealtimeFeatures();
    }, 5000);

    // Ajouter un style de transition global
    const style = document.createElement('style');
    style.textContent = `
        .post-item {
            transition: all 0.3s ease;
        }
        
        .post-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        button {
            transition: all 0.2s ease;
        }
        
        .like-btn:hover i,
        .comment-btn:hover i,
        .share-btn:hover i {
            transform: scale(1.1);
        }
        
        .notification-dot,
        .message-dot {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .story-item {
            transition: transform 0.2s ease;
        }
        
        .story-item:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
});

// Gestion responsive pour mobile
function handleMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Initialiser le menu mobile si nécessaire
document.addEventListener('DOMContentLoaded', handleMobileMenu);