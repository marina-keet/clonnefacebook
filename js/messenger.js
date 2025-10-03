// Messenger functionality for Facebook Clone
class Messenger {
    constructor() {
        this.currentContact = 'marie';
        this.conversations = {
            marie: {
                name: 'Marie Dupont',
                avatar: 'bg-pink-300',
                online: true,
                messages: [
                    { sender: 'marie', content: 'Salut ! Comment ça va ?', time: '14:32', type: 'text' },
                    { sender: 'me', content: 'Salut Marie ! Ça va super bien, merci !', time: '14:33', type: 'text' },
                    { sender: 'marie', content: 'Tu es libre ce weekend ?', time: '14:35', type: 'text' },
                    { sender: 'me', content: 'Oui ! Tu avais quelque chose en tête ?', time: '14:36', type: 'text' },
                    { sender: 'marie', content: 'On pourrait aller au cinéma ! 🎬', time: '14:38', type: 'text' }
                ]
            },
            pierre: {
                name: 'Pierre Martin',
                avatar: 'bg-blue-300',
                online: true,
                messages: [
                    { sender: 'pierre', content: 'Salut ! Tu viens ce soir ?', time: '13:45', type: 'text' },
                    { sender: 'me', content: 'Oui bien sûr ! À quelle heure ?', time: '13:46', type: 'text' },
                    { sender: 'pierre', content: 'Vers 20h, ça te va ?', time: '13:47', type: 'text' },
                    { sender: 'me', content: 'Parfait !', time: '13:48', type: 'text' },
                    { sender: 'pierre', content: 'À tout à l\'heure !', time: '13:50', type: 'text' }
                ]
            },
            sophie: {
                name: 'Sophie Roux',
                avatar: 'bg-purple-300',
                online: false,
                messages: [
                    { sender: 'me', content: 'Hey Sophie ! J\'ai trouvé l\'info que tu cherchais', time: '12:30', type: 'text' },
                    { sender: 'sophie', content: 'Ah super ! Tu peux me l\'envoyer ?', time: '12:35', type: 'text' },
                    { sender: 'me', content: 'Je t\'envoie ça par email', time: '12:36', type: 'text' },
                    { sender: 'sophie', content: 'Merci pour l\'info !', time: '12:45', type: 'text' }
                ]
            },
            julie: {
                name: 'Julie Blanc',
                avatar: 'bg-green-300',
                online: false,
                messages: [
                    { sender: 'julie', content: 'Tu as vu le nouveau restaurant qui a ouvert ?', time: '11:20', type: 'text' },
                    { sender: 'me', content: 'Non, où ça ?', time: '11:25', type: 'text' },
                    { sender: 'julie', content: 'Rue de la Paix, ça a l\'air sympa !', time: '11:26', type: 'text' },
                    { sender: 'me', content: 'On pourrait y aller ensemble un de ces jours', time: '11:28', type: 'text' },
                    { sender: 'julie', content: 'Super ! Je vais regarder ça', time: '11:30', type: 'text' }
                ]
            },
            thomas: {
                name: 'Thomas Noir',
                avatar: 'bg-orange-300',
                online: false,
                messages: [
                    { sender: 'thomas', content: 'On se voit toujours demain ?', time: 'Hier 18:30', type: 'text' },
                    { sender: 'me', content: 'Oui ! À 14h comme prévu', time: 'Hier 18:32', type: 'text' },
                    { sender: 'thomas', content: 'D\'accord, on se voit demain', time: 'Hier 18:35', type: 'text' }
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadConversation(this.currentContact);
        this.setupTypingSimulation();
    }

    setupEventListeners() {
        // Sélection des conversations
        const conversationItems = document.querySelectorAll('.conversation-item');
        conversationItems.forEach(item => {
            item.addEventListener('click', () => {
                const contactId = item.dataset.contact;
                this.switchConversation(contactId);
            });
        });

        // Envoi de messages
        const sendButton = document.getElementById('send-button');
        const messageInput = document.getElementById('message-input');

        sendButton?.addEventListener('click', () => {
            this.sendMessage();
        });

        messageInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Simulation de frappe
        messageInput?.addEventListener('input', (e) => {
            this.showTypingIndicator();
        });

        // Scroll automatique
        this.setupAutoScroll();
    }

    switchConversation(contactId) {
        // Mettre à jour l'interface
        this.currentContact = contactId;
        
        // Mettre à jour la sélection visuelle
        document.querySelectorAll('.conversation-item').forEach(item => {
            item.classList.remove('border-l-4', 'border-facebook-blue', 'bg-blue-50');
        });
        
        const selectedItem = document.querySelector(`[data-contact="${contactId}"]`);
        selectedItem.classList.add('border-l-4', 'border-facebook-blue', 'bg-blue-50');
        
        // Charger la conversation
        this.loadConversation(contactId);
        this.updateChatHeader(contactId);
    }

    loadConversation(contactId) {
        const conversation = this.conversations[contactId];
        if (!conversation) return;

        const messagesContainer = document.getElementById('messages-container');
        if (!messagesContainer) return;

        messagesContainer.innerHTML = '';
        
        conversation.messages.forEach(message => {
            const messageElement = this.createMessageElement(message, conversation);
            messagesContainer.appendChild(messageElement);
        });

        // Scroll vers le bas
        this.scrollToBottom();
    }

    createMessageElement(message, conversation) {
        const messageDiv = document.createElement('div');
        const isMe = message.sender === 'me';
        
        messageDiv.className = `flex items-end space-x-2 ${isMe ? 'justify-end' : ''}`;
        
        const time = message.time;
        const content = message.content;
        
        if (isMe) {
            messageDiv.innerHTML = `
                <p class="text-xs text-gray-500 self-end">${time}</p>
                <div class="bg-facebook-blue text-white rounded-2xl px-4 py-2 max-w-xs">
                    <p class="text-sm">${content}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 ${conversation.avatar} rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-white text-sm"></i>
                </div>
                <div class="bg-gray-100 rounded-2xl px-4 py-2 max-w-xs">
                    <p class="text-sm">${content}</p>
                </div>
                <p class="text-xs text-gray-500 self-end">${time}</p>
            `;
        }
        
        return messageDiv;
    }

    updateChatHeader(contactId) {
        const conversation = this.conversations[contactId];
        const chatHeader = document.getElementById('chat-header');
        
        if (chatHeader && conversation) {
            const onlineStatus = conversation.online ? 
                '<p class="text-sm text-green-500">En ligne</p>' : 
                '<p class="text-sm text-gray-500">Hors ligne</p>';
                
            chatHeader.querySelector('.flex.items-center.space-x-3').innerHTML = `
                <div class="w-10 h-10 ${conversation.avatar} rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-white"></i>
                </div>
                <div>
                    <p class="font-semibold">${conversation.name}</p>
                    ${onlineStatus}
                </div>
            `;
        }
    }

    sendMessage() {
        const messageInput = document.getElementById('message-input');
        const content = messageInput?.value.trim();
        
        if (!content) return;
        
        const currentTime = new Date().toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Ajouter le message à la conversation
        const newMessage = {
            sender: 'me',
            content: content,
            time: currentTime,
            type: 'text'
        };
        
        this.conversations[this.currentContact].messages.push(newMessage);
        
        // Afficher le message
        const messagesContainer = document.getElementById('messages-container');
        const messageElement = this.createMessageElement(newMessage, this.conversations[this.currentContact]);
        messagesContainer.appendChild(messageElement);
        
        // Vider le champ de saisie
        messageInput.value = '';
        
        // Scroll vers le bas
        this.scrollToBottom();
        
        // Simuler une réponse après un délai
        setTimeout(() => {
            this.simulateResponse();
        }, 1500 + Math.random() * 2000);
    }

    simulateResponse() {
        if (Math.random() < 0.7) { // 70% de chance de réponse
            const responses = [
                '😊',
                'D\'accord !',
                'Ah oui ?',
                'Intéressant !',
                'Je vois',
                'Super !',
                'OK 👍',
                'Merci !',
                'À bientôt !',
                'Pas de problème',
                'Bonne idée',
                'On en reparle'
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const currentTime = new Date().toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            const responseMessage = {
                sender: this.currentContact,
                content: randomResponse,
                time: currentTime,
                type: 'text'
            };
            
            this.conversations[this.currentContact].messages.push(responseMessage);
            
            // Afficher l'indicateur de frappe
            this.showTypingIndicator();
            
            setTimeout(() => {
                this.hideTypingIndicator();
                
                const messagesContainer = document.getElementById('messages-container');
                const messageElement = this.createMessageElement(responseMessage, this.conversations[this.currentContact]);
                messagesContainer.appendChild(messageElement);
                
                this.scrollToBottom();
            }, 1000);
        }
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('messages-container');
        const existingIndicator = document.getElementById('typing-indicator');
        
        if (existingIndicator) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex items-end space-x-2';
        
        const conversation = this.conversations[this.currentContact];
        typingDiv.innerHTML = `
            <div class="w-8 h-8 ${conversation.avatar} rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-user text-white text-sm"></i>
            </div>
            <div class="bg-gray-100 rounded-2xl px-4 py-3">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('messages-container');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    setupAutoScroll() {
        const messagesContainer = document.getElementById('messages-container');
        if (messagesContainer) {
            messagesContainer.addEventListener('scroll', () => {
                // Si l'utilisateur scroll vers le haut, ne pas auto-scroll
                const isAtBottom = messagesContainer.scrollTop + messagesContainer.clientHeight >= messagesContainer.scrollHeight - 5;
                this.autoScrollEnabled = isAtBottom;
            });
        }
    }

    setupTypingSimulation() {
        const messageInput = document.getElementById('message-input');
        let typingTimer;
        
        messageInput?.addEventListener('input', () => {
            clearTimeout(typingTimer);
            
            // Simuler que l'autre personne arrête d'écrire après 3 secondes
            typingTimer = setTimeout(() => {
                this.hideTypingIndicator();
            }, 3000);
        });
    }

    // Fonctionnalités supplémentaires
    formatMessageTime(date) {
        const now = new Date();
        const messageDate = new Date(date);
        
        if (now.toDateString() === messageDate.toDateString()) {
            return messageDate.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        } else {
            return messageDate.toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'short' 
            });
        }
    }

    addEmojiSupport() {
        const emojiButton = document.querySelector('.fa-smile').parentElement;
        
        emojiButton?.addEventListener('click', () => {
            this.showEmojiPicker();
        });
    }

    showEmojiPicker() {
        const emojis = ['😀', '😂', '😍', '😢', '😡', '👍', '👎', '❤️', '🎉', '🔥'];
        const messageInput = document.getElementById('message-input');
        
        const emojiPicker = document.createElement('div');
        emojiPicker.className = 'absolute bottom-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-2 grid grid-cols-5 gap-2 z-50';
        
        emojis.forEach(emoji => {
            const emojiBtn = document.createElement('button');
            emojiBtn.textContent = emoji;
            emojiBtn.className = 'p-2 hover:bg-gray-100 rounded text-xl';
            emojiBtn.addEventListener('click', () => {
                messageInput.value += emoji;
                emojiPicker.remove();
                messageInput.focus();
            });
            emojiPicker.appendChild(emojiBtn);
        });
        
        document.body.appendChild(emojiPicker);
        
        // Fermer en cliquant ailleurs
        setTimeout(() => {
            document.addEventListener('click', function closeEmoji(e) {
                if (!emojiPicker.contains(e.target)) {
                    emojiPicker.remove();
                    document.removeEventListener('click', closeEmoji);
                }
            });
        }, 100);
    }
}

// Fonctions utilitaires
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const messenger = new Messenger();
    
    // Ajouter les styles pour les animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
        }
        
        .animate-bounce {
            animation: bounce 1s infinite;
        }
        
        .conversation-item {
            transition: all 0.2s ease;
        }
        
        .conversation-item:hover {
            background-color: #f3f4f6;
        }
        
        #messages-container {
            scroll-behavior: smooth;
        }
        
        .message-animation {
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});