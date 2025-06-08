// ===== GLOBAL VARIABLES =====
let isLoaded = false;
let scrollTimeout;

// ===== DOM ELEMENTS =====
const loadingScreen = document.querySelector('.loading-screen');
const navbar = document.querySelector('.navbar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const closeModal = document.querySelector('.close-modal');
const designCards = document.querySelectorAll('.design-card');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
    
    initializeScrollAnimations();
    initializeNavigation();
    initializeDesignCards();
    initializeCategoryButtons();
    initializeModal();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeFormHandling();
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            isLoaded = true;
            triggerInitialAnimations();
        }, 500);
    }
}

function triggerInitialAnimations() {
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        if (!el.closest('.hero')) {
            observer.observe(el);
        }
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
}

function handleNavbarScroll() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);
}

// ===== DESIGN CARDS =====
function initializeDesignCards() {
    designCards.forEach(card => {
        card.addEventListener('click', handleDesignCardClick);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function handleDesignCardClick(e) {
    e.preventDefault();
    const designId = this.dataset.design;
    const designTitle = this.querySelector('.design-content h3').textContent;
    
    // Add click animation
    this.style.transform = 'translateY(-8px) scale(0.98)';
    setTimeout(() => {
        this.style.transform = 'translateY(-12px) scale(1)';
    }, 150);
    
    openDesignModal(designId, designTitle);
}

// ===== CATEGORY BUTTONS =====
function initializeCategoryButtons() {
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', handleCategoryClick);
    });
}

function handleCategoryClick(e) {
    e.preventDefault();
    const categoryId = this.dataset.category;
    const categoryName = this.querySelector('span').textContent;
    
    // Add click animation
    this.style.transform = 'translateY(-4px) scale(0.98)';
    setTimeout(() => {
        this.style.transform = 'translateY(0) scale(1)';
    }, 150);
    
    // Show coming soon message
    showNotification(`${categoryName} - Coming Soon!`, 'info');
}

// ===== MODAL =====
function initializeModal() {
    if (closeModal) {
        closeModal.addEventListener('click', closeProductModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeProductModal();
        }
    });
}

function openDesignModal(designId, designTitle) {
    if (!modal) return;
    
    modalTitle.textContent = `Choose Products for ${designTitle}`;
    renderDesignSelection(designId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animate modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.9) translateY(-20px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1) translateY(0)';
        modalContent.style.opacity = '1';
        modalContent.style.transition = 'all 0.3s ease';
    }, 10);
}

function closeProductModal() {
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.9) translateY(-20px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function renderDesignSelection(designId) {
    const designSelection = document.getElementById('design-selection');
    if (!designSelection) return;
    
    designSelection.innerHTML = `
        <div class="design-preview">
            <div class="design-showcase ${getDesignTheme(designId)}">
                <div class="design-icons">
                    ${getDesignIcons(designId)}
                </div>
            </div>
            <h3>Apply this design to any product category</h3>
            <p>Select a category below to see all available products with your chosen design</p>
        </div>
        <div class="category-grid">
            <div class="category-option" data-category="sweatshirts">
                <i class="fas fa-tshirt"></i>
                <h4>Sweatshirts</h4>
                <p>Hoodies & Crewnecks</p>
            </div>
            <div class="category-option" data-category="hats">
                <i class="fas fa-hat-cowboy"></i>
                <h4>Hats</h4>
                <p>Caps, Beanies & More</p>
            </div>
            <div class="category-option" data-category="shirts">
                <i class="fas fa-tshirt"></i>
                <h4>Shirts</h4>
                <p>T-Shirts & Tank Tops</p>
            </div>
            <div class="category-option" data-category="accessories">
                <i class="fas fa-shopping-bag"></i>
                <h4>Accessories</h4>
                <p>Mugs, Cases & More</p>
            </div>
        </div>
    `;
    
    // Add click handlers to category options
    designSelection.querySelectorAll('.category-option').forEach(option => {
        option.addEventListener('click', function() {
            const category = this.dataset.category;
            handleModalCategoryClick(designId, category);
        });
    });
}

function getDesignTheme(designId) {
    const themes = {
        'design1': 'skyline-theme',
        'design2': 'nature-theme',
        'design3': 'culture-theme'
    };
    return themes[designId] || 'skyline-theme';
}

function getDesignIcons(designId) {
    const icons = {
        'design1': '<i class="fas fa-building"></i><i class="fas fa-broadcast-tower"></i><i class="fas fa-city"></i>',
        'design2': '<i class="fas fa-mountain"></i><i class="fas fa-tree"></i><i class="fas fa-water"></i>',
        'design3': '<i class="fas fa-coffee"></i><i class="fas fa-music"></i><i class="fas fa-palette"></i>'
    };
    return icons[designId] || icons['design1'];
}

function handleModalCategoryClick(designId, category) {
    closeProductModal();
    setTimeout(() => {
        showNotification(`${category.charAt(0).toUpperCase() + category.slice(1)} with your selected design - Coming Soon!`, 'success');
    }, 300);
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        if (!isLoaded) return;
        
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax for hero particles
            const particles = document.querySelectorAll('.hero-particle');
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.3;
                particle.style.transform = `translateY(${rate * speed}px)`;
            });
            
            // Parallax for floating cards
            const floatingCards = document.querySelectorAll('.floating-card');
            floatingCards.forEach((card, index) => {
                const speed = (index + 1) * 0.2;
                card.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    });
}

// ===== FORM HANDLING =====
function initializeFormHandling() {
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--emerald)';
        
        // Reset form
        this.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
        showNotification('Thank you! Your message has been sent successfully.', 'success');
    }, 2000);
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto hide
    setTimeout(() => hideNotification(notification), 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || icons['info'];
}

// ===== CART FUNCTIONALITY =====
let cart = [];

function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

function addToCart(item) {
    cart.push(item);
    updateCartCount();
    showNotification(`${item.name} added to cart!`, 'success');
}

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
const debouncedResize = debounce(() => {
    // Handle resize events
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}, 250);

window.addEventListener('resize', debouncedResize);

// ===== ACCESSIBILITY =====
document.addEventListener('keydown', function(e) {
    // Focus management for modal
    if (modal && modal.style.display === 'block') {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
});

// ===== CUSTOM STYLES FOR DYNAMIC ELEMENTS =====
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 3000;
        background: var(--white);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-2xl);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        padding: var(--space-4);
        display: flex;
        align-items: center;
        gap: var(--space-3);
    }
    
    .notification-success {
        border-left: 4px solid var(--emerald);
    }
    
    .notification-error {
        border-left: 4px solid #ef4444;
    }
    
    .notification-warning {
        border-left: 4px solid #f59e0b;
    }
    
    .notification-info {
        border-left: 4px solid var(--seattle-blue);
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--space-1);
        border-radius: 50%;
        transition: background var(--transition-normal);
        margin-left: auto;
    }
    
    .notification-close:hover {
        background: var(--gray-100);
    }
    
    .design-preview {
        text-align: center;
        margin-bottom: var(--space-8);
    }
    
    .design-showcase {
        width: 200px;
        height: 150px;
        margin: 0 auto var(--space-4);
        border-radius: var(--radius-xl);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .design-showcase .design-icons {
        display: flex;
        gap: var(--space-4);
        color: var(--white);
    }
    
    .design-showcase .design-icons i {
        font-size: var(--font-size-2xl);
    }
    
    .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: var(--space-4);
    }
    
    .category-option {
        background: var(--light-gray);
        padding: var(--space-6);
        border-radius: var(--radius-xl);
        text-align: center;
        cursor: pointer;
        transition: all var(--transition-normal);
        border: 2px solid transparent;
    }
    
    .category-option:hover {
        background: var(--primary-green);
        color: var(--white);
        transform: translateY(-4px);
        border-color: var(--primary-green);
    }
    
    .category-option i {
        font-size: var(--font-size-2xl);
        margin-bottom: var(--space-2);
        color: var(--primary-green);
        transition: color var(--transition-normal);
    }
    
    .category-option:hover i {
        color: var(--white);
    }
    
    .category-option h4 {
        font-weight: 600;
        margin-bottom: var(--space-1);
    }
    
    .category-option p {
        font-size: var(--font-size-sm);
        opacity: 0.8;
    }
    
    @media (max-width: 480px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .category-grid {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(dynamicStyles);

// ===== INITIALIZE ON LOAD =====
window.addEventListener('load', function() {
    // Final initialization after all resources are loaded
    updateCartCount();
    
    // Set initial viewport height for mobile
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
