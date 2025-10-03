// JavaScript pour la page de connexion Facebook
class FacebookLogin {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.populateSelectOptions();
    }

    setupEventListeners() {
        // Formulaire de connexion
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Bouton créer un compte
        const createAccountBtn = document.getElementById('create-account-btn');
        if (createAccountBtn) {
            createAccountBtn.addEventListener('click', () => this.openSignupModal());
        }

        // Modal d'inscription
        const closeSignupModal = document.getElementById('close-signup-modal');
        if (closeSignupModal) {
            closeSignupModal.addEventListener('click', () => this.closeSignupModal());
        }

        const signupModal = document.getElementById('signup-modal');
        if (signupModal) {
            signupModal.addEventListener('click', (e) => {
                if (e.target === signupModal) {
                    this.closeSignupModal();
                }
            });
        }

        // Formulaire d'inscription
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Clic sur le profil Chance
        const chanceProfile = document.querySelector('.group');
        if (chanceProfile) {
            chanceProfile.addEventListener('click', () => this.loginAsChance());
        }

        // Bouton de suppression du profil
        const removeProfileBtn = document.querySelector('.fa-times').parentElement;
        if (removeProfileBtn) {
            removeProfileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeProfile();
            });
        }
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Validation basique
        if (!email || !password) {
            this.showError('Veuillez remplir tous les champs.');
            return;
        }

        if (!this.isValidEmail(email) && !this.isValidPhone(email)) {
            this.showError('Veuillez entrer une adresse e-mail ou un numéro de téléphone valide.');
            return;
        }

        // Simulation de la connexion
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.showSuccess('Connexion réussie !');
            
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        }, 1000);
    }

    handleSignup(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validation des champs requis
        if (!data.firstName || !data.lastName || !data.email || !data.password) {
            this.showError('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        if (!this.isValidEmail(data.email)) {
            this.showError('Veuillez entrer une adresse e-mail valide.');
            return;
        }

        if (data.password.length < 6) {
            this.showError('Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        // Simulation de l'inscription
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.showSuccess('Compte créé avec succès !');
            this.closeSignupModal();
            
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        }, 1500);
    }

    loginAsChance() {
        document.getElementById('email').value = 'chance.marina@email.com';
        document.getElementById('password').value = '••••••••';
        
        this.showSuccess('Connexion en cours...');
        
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1000);
    }

    removeProfile() {
        const profileContainer = document.querySelector('.group').parentElement;
        
        // Animation de suppression
        profileContainer.style.transform = 'scale(0.8)';
        profileContainer.style.opacity = '0.5';
        
        setTimeout(() => {
            profileContainer.remove();
            this.showNotification('Profil supprimé');
        }, 300);
    }

    openSignupModal() {
        const modal = document.getElementById('signup-modal');
        modal.classList.remove('hidden');
        
        // Animation d'ouverture
        setTimeout(() => {
            modal.querySelector('.bg-white').style.transform = 'scale(1)';
            modal.querySelector('.bg-white').style.opacity = '1';
        }, 10);
    }

    closeSignupModal() {
        const modal = document.getElementById('signup-modal');
        const modalContent = modal.querySelector('.bg-white');
        
        // Animation de fermeture
        modalContent.style.transform = 'scale(0.95)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 200);
    }

    populateSelectOptions() {
        // Remplir les options de jour
        const daySelect = document.querySelector('select:nth-of-type(1)');
        if (daySelect) {
            for (let i = 1; i <= 31; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                daySelect.appendChild(option);
            }
        }

        // Remplir les options de mois
        const monthSelect = document.querySelector('select:nth-of-type(2)');
        if (monthSelect) {
            const months = [
                'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
            ];
            
            months.forEach((month, index) => {
                const option = document.createElement('option');
                option.value = index + 1;
                option.textContent = month;
                monthSelect.appendChild(option);
            });
        }

        // Remplir les options d'année
        const yearSelect = document.querySelector('select:nth-of-type(3)');
        if (yearSelect) {
            const currentYear = new Date().getFullYear();
            for (let year = currentYear; year >= currentYear - 100; year--) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }
        }
    }

    setupAnimations() {
        // Animation au chargement de la page
        window.addEventListener('load', () => {
            const elements = document.querySelectorAll('.bg-white');
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 150);
            });

            // Animation du logo
            const logo = document.querySelector('h1');
            if (logo) {
                logo.style.opacity = '0';
                logo.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    logo.style.transition = 'all 0.8s ease';
                    logo.style.opacity = '1';
                    logo.style.transform = 'translateY(0)';
                }, 100);
            }
        });

        // Animation des boutons au survol
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Fonctions utilitaires
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    showLoading() {
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Connexion...';
            submitBtn.disabled = true;
        }
    }

    hideLoading() {
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = 'Se connecter';
            submitBtn.disabled = false;
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : 
                        type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        
        notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 transform transition-all duration-300`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                     type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        // Animation d'entrée
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Auto-suppression
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new FacebookLogin();
});

// Styles additionnels pour les transitions
const additionalStyles = `
    .transition-all {
        transition: all 0.3s ease;
    }
    
    button {
        transition: all 0.2s ease;
    }
    
    input:focus {
        transform: scale(1.02);
    }
    
    .group:hover .w-24 {
        transform: scale(1.05);
    }
    
    .modal-enter {
        animation: modalEnter 0.3s ease;
    }
    
    @keyframes modalEnter {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .notification-enter {
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Ajouter les styles à la page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);