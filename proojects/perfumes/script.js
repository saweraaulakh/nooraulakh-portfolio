// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const cartCount = document.getElementById('cart-count');
const productContainer = document.getElementById('product-container');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');

// Sample product data
const products = [
    {
        id: 1,
        name: "Chic Elegance",
        price: 89.99,
        image: "https://i.postimg.cc/pdp80h23/download-6.jpg",
        description: "A captivating blend of floral and woody notes that creates a sophisticated and timeless fragrance.",
        rating: 4.5
    },
    {
        id: 2,
        name: "Mystic Aura",
        price: 99.99,
        image: "https://i.postimg.cc/htqcyHKn/download-7.jpg",
        description: "An enchanting fragrance with hints of vanilla and amber that lingers all day long.",
        rating: 4.8
    },
    {
        id: 3,
        name: "Ocean Breeze",
        price: 79.99,
        image: "https://i.postimg.cc/9F9qq5xH/download-8.jpg",
        description: "Fresh and invigorating with marine notes that evoke the crispness of ocean air.",
        rating: 4.3
    },
    {
        id: 4,
        name: "Midnight Rose",
        price: 109.99,
        image: "https://i.postimg.cc/T1wZhvgz/download-9.jpg",
        description: "A deep, sensual blend of dark roses and musk for an unforgettable evening scent.",
        rating: 4.9
    },
    {
        id: 5,
        name: "Citrus Splash",
        price: 69.99,
        image: "https://i.postimg.cc/CxyQpqrT/download-10.jpg",
        description: "Bright and energetic with top notes of lemon, bergamot, and grapefruit.",
        rating: 4.2
    },
    {
        id: 6,
        name: "Vanilla Dream",
        price: 89.99,
        image: "https://i.postimg.cc/sfbr11HK/download-11.jpg",
        description: "A warm, comforting fragrance with creamy vanilla and subtle caramel undertones.",
        rating: 4.6
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });

    // Display products
    displayProducts();
    updateCartCount();

    // Form submissions
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Add animations
    addScrollAnimations();
});

// Display products function
function displayProducts() {
    productContainer.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = `product fade-in delay-${index % 3}`;
        
        // Generate star rating
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="rating">${stars} (${product.rating})</div>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        
        productContainer.appendChild(productCard);
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCartCount();
    saveCartToLocalStorage();
    
    // Show add to cart animation
    const button = event.target;
    button.textContent = 'Added!';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = 'var(--primary-color)';
    }, 1000);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Scroll animations
function addScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});