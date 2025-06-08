// ===== GLOBAL VARIABLES =====
let isLoaded = false;
let selectedDesign = null;
let selectedCategory = null;

// Categories and subcategories data
const CATEGORIES = {
    'sweatshirts': {
        'name': 'Sweatshirts',
        'icon': 'fas fa-tshirt',
        'subcategories': [
            { id: 'hoodies', name: 'Hoodies', icon: 'fas fa-hoodie' },
            { id: 'crewnecks', name: 'Crewnecks', icon: 'fas fa-tshirt' }
        ]
    },
    'hats': {
        'name': 'Hats',
        'icon': 'fas fa-hat-cowboy',
        'subcategories': [
            { id: 'mesh-snapback', name: 'Mesh Snapback', icon: 'fas fa-baseball-cap' },
            { id: 'baseball-cap', name: 'Baseball Cap', icon: 'fas fa-baseball-cap' },
            { id: 'flattop', name: 'Flattop', icon: 'fas fa-hat-cowboy' },
            { id: 'beanie', name: 'Beanie', icon: 'fas fa-hat-winter' },
            { id: 'bucket-hat', name: 'Bucket Hat', icon: 'fas fa-hat-cowboy' }
        ]
    },
    'shirts': {
        'name': 'Shirts',
        'icon': 'fas fa-tshirt',
        'subcategories': [
            { id: 'tanktop', name: 'Tank Top', icon: 'fas fa-vest' },
            { id: 't-shirts', name: 'T-Shirts', icon: 'fas fa-tshirt' }
        ]
    },
    'accessories': {
        'name': 'Accessories',
        'icon': 'fas fa-shopping-bag',
        'subcategories': [
            { id: 'mugs', name: 'Mugs', icon: 'fas fa-mug-hot' },
            { id: 'phone-cases', name: 'Phone Cases', icon: 'fas fa-mobile-alt' },
            { id: 'blankets', name: 'Blankets', icon: 'fas fa-bed' },
            { id: 'tote-bag', name: 'Tote Bag', icon: 'fas fa-shopping-bag' },
            { id: 'mousepads', name: 'Mousepads', icon: 'fas fa-mouse' }
        ]
    }
};

const DESIGN_COLLECTIONS = {
// ===== GLOBAL VARIABLES =====
let selectedDesign = null;
let selectedCategory = null;

// Categories and subcategories data
const CATEGORIES = {
    'sweatshirts': {
        'name': 'Sweatshirts',
        'icon': 'fas fa-tshirt',
        'subcategories': [
            { id: 'hoodies', name: 'Premium Hoodies', icon: 'fas fa-hoodie' },
            { id: 'crewnecks', name: 'Classic Crewnecks', icon: 'fas fa-tshirt' }
        ]
    },
    'hats': {
        'name': 'Hats',
        'icon': 'fas fa-hat-cowboy',
        'subcategories': [
            { id: 'mesh-snapback', name: 'Mesh Snapback', icon: 'fas fa-baseball-cap' },
            { id: 'baseball-cap', name: 'Baseball Cap', icon: 'fas fa-baseball-cap' },
            { id: 'flattop', name: 'Flattop', icon: 'fas fa-hat-cowboy' },
            { id: 'beanie', name: 'Beanie', icon: 'fas fa-hat-winter' },
            { id: 'bucket-hat', name: 'Bucket Hat', icon: 'fas fa-hat-cowboy' }
        ]
    },
    'shirts': {
        'name': 'Shirts',
        'icon': 'fas fa-vest',
        'subcategories': [
            { id: 'tanktop', name: 'Tank Top', icon: 'fas fa-vest' },
            { id: 't-shirts', name: 'T-Shirts', icon: 'fas fa-tshirt' }
        ]
    },
    'accessories': {
        'name': 'Accessories',
        'icon': 'fas fa-shopping-bag',
        'subcategories': [
            { id: 'mugs', name: 'Custom Mugs', icon: 'fas fa-mug-hot' },
            { id: 'phone-cases', name: 'Phone Cases', icon: 'fas fa-mobile-alt' },
            { id: 'blankets', name: 'Cozy Blankets', icon: 'fas fa-bed' },
            { id: 'tote-bag', name: 'Tote Bags', icon: 'fas fa-shopping-bag' },
            { id: 'mousepads', name: 'Mouse Pads', icon: 'fas fa-mouse' }
        ]
    }
};

const DESIGN_COLLECTIONS = {
    'design1': {
        name: 'Urban Collection',
        description: 'Modern cityscape designs inspired by Seattle\'s iconic skyline',
        theme: 'urban-gradient',
        icons: ['fas fa-building', 'fas fa-broadcast-tower', 'fas fa-city']
    },
    'design2': {
        name: 'Nature Collection',
        description: 'Pacific Northwest wilderness and natural beauty',
        theme: 'nature-gradient',
        icons: ['fas fa-mountain', 'fas fa-tree', 'fas fa-water']
    },
    'design3': {
        name: 'Culture Collection',
        description: 'Local arts, coffee culture, and Seattle lifestyle',
        theme: 'culture-gradient',
        icons: ['fas fa-coffee', 'fas fa-music', 'fas fa-palette']
    }
};

// DOM Elements
const navbar = document.querySelector('.navbar');
const collectionCards = document.querySelectorAll('.collection-card');
const collectionModal = document.getElementById('collection-modal');
const subcategoryModal = document.getElementById('subcategory-modal');
const closeModalBtns = document.querySelectorAll('.close-modal, .close-subcategory-modal');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeNavigation();
    initializeCollectionCards();
    initializeModals();
    initializeSmoothScrolling();
});

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-up elements
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
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

// ===== COLLECTION CARDS =====
function initializeCollectionCards() {
    collectionCards.forEach(card => {
        card.addEventListener('click', function() {
            const designId = this.dataset.design;
            selectedDesign = designId;
            openCollectionModal(designId);
        });
    });
}

function openCollectionModal(designId) {
    const collection = DESIGN_COLLECTIONS[designId];
    
    // Update modal title
    document.getElementById('modal-title').textContent = `${collection.name} - Choose Category`;
    
    // Render collection preview
    renderCollectionPreview(designId);
    
    // Render categories
    renderModalCategories();
    
    // Show modal
    collectionModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function renderCollectionPreview(designId) {
    const collection = DESIGN_COLLECTIONS[designId];
    const previewContainer = document.getElementById('selected-collection');
    
    previewContainer.innerHTML = `
        <h3>${collection.name}</h3>
        <p>${collection.description}</p>
        <div class="collection-icons">
            ${collection.icons.map(icon => `<i class="${icon}"></i>`).join('')}
        </div>
    `;
}

function renderModalCategories() {
    const categoriesContainer = document.getElementById('modal-categories');
    
    categoriesContainer.innerHTML = Object.entries(CATEGORIES).map(([categoryId, categoryData]) => `
        <div class="modal-category" data-category="${categoryId}">
            <div class="category-icon">
                <i class="${categoryData.icon}"></i>
            </div>
            <h4>${categoryData.name}</h4>
            <p>${categoryData.subcategories.length} items available</p>
        </div>
    `).join('');
    
    // Add click handlers
    categoriesContainer.querySelectorAll('.modal-category').forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.dataset.category;
            selectedCategory = categoryId;
            closeModal(collectionModal);
            setTimeout(() => openSubcategoryModal(categoryId), 300);
        });
    });
}

function openSubcategoryModal(categoryId) {
    const collection = DESIGN_COLLECTIONS[selectedDesign];
    const category = CATEGORIES[categoryId];
    
    // Update modal title
    document.getElementById('subcategory-title').textContent = `${category.name} - Choose Product`;
    
    // Render selection summary
    renderSelectionSummary(selectedDesign, categoryId);
    
    // Render subcategories
    renderModalSubcategories(categoryId);
    
    // Show modal
    subcategoryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function renderSelectionSummary(designId, categoryId) {
    const collection = DESIGN_COLLECTIONS[designId];
    const category = CATEGORIES[categoryId];
    const summaryContainer = document.getElementById('selection-info');
    
    summaryContainer.innerHTML = `
        <h4>${collection.name} × ${category.name}</h4>
        <p>Select your specific product from the ${category.name.toLowerCase()} category</p>
    `;
}

function renderModalSubcategories(categoryId) {
    const category = CATEGORIES[categoryId];
    const subcategoriesContainer = document.getElementById('modal-subcategories');
    
    subcategoriesContainer.innerHTML = category.subcategories.map(subcategory => `
        <div class="modal-subcategory" data-subcategory="${subcategory.id}">
            <div class="category-icon">
                <i class="${subcategory.icon}"></i>
            </div>
            <h4>${subcategory.name}</h4>
        </div>
    `).join('');
    
    // Add click handlers
    subcategoriesContainer.querySelectorAll('.modal-subcategory').forEach(subcategory => {
        subcategory.addEventListener('click', function() {
            const subcategoryId = this.dataset.subcategory;
            const subcategoryData = category.subcategories.find(sub => sub.id === subcategoryId);
            handleFinalSelection(selectedDesign, categoryId, subcategoryId, subcategoryData);
        });
    });
}

function handleFinalSelection(designId, categoryId, subcategoryId, subcategoryData) {
    const collection = DESIGN_COLLECTIONS[designId];
    const category = CATEGORIES[categoryId];
    
    // Close modal
    closeModal(subcategoryModal);
    
    // Show success message
    setTimeout(() => {
        alert(`Perfect! You selected:\n${collection.name} design on ${subcategoryData.name}\n\nComing Soon!`);
    }, 300);
    
    // Log the selection for future processing
    console.log('Final selection:', {
        design: collection,
        category: category,
        subcategory: subcategoryData
    });
}

// ===== MODALS =====
function initializeModals() {
    // Close button handlers
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('close-modal')) {
                closeModal(collectionModal);
            } else {
                closeModal(subcategoryModal);
            }
        });
    });
    
    // Click outside to close
    [collectionModal, subcategoryModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(collectionModal);
            closeModal(subcategoryModal);
        }
    });
}

function closeModal(modal) {
    if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== BUTTON HANDLERS =====
document.addEventListener('click', function(e) {
    // Shop Collections button
    if (e.target.matches('.btn-primary') || e.target.textContent.includes('Shop Collections')) {
        e.preventDefault();
        document.getElementById('collections').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Shop Now button
    if (e.target.matches('.cta-button') || e.target.textContent.includes('Shop Now')) {
        e.preventDefault();
        document.getElementById('collections').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // See Our Work button
    if (e.target.matches('.btn-secondary') || e.target.textContent.includes('See Our Work')) {
        e.preventDefault();
        document.getElementById('products').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Add some dynamic styles for modals
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .collection-icons {
        display: flex;
        justify-content: center;
        gap: var(--space-md);
        margin-top: var(--space-md);
        color: var(--primary-blue);
    }
    
    .collection-icons i {
        font-size: 1.5rem;
    }
    
    .modal-category .category-icon,
    .modal-subcategory .category-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-light));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--space-sm);
        color: white;
        font-size: 1.5rem;
    }
    
    .modal-category h4,
    .modal-subcategory h4 {
        font-size: 1.1rem;
        font-weight: var(--font-weight-semibold);
        color: var(--text-dark);
        margin-bottom: var(--space-xs);
    }
    
    .modal-category p {
        color: var(--text-medium);
        font-size: 0.875rem;
    }
`;

document.head.appendChild(modalStyles);
