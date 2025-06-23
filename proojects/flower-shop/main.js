// DOM Elements
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const shopNowBtn = document.getElementById('shopNowBtn');
const learnMoreBtn = document.getElementById('learnMoreBtn');
const newsletterForm = document.getElementById('newsletterForm');
const currentYear = document.getElementById('currentYear');
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.close-btn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();

    // Initialize quick links
    const quickLinks = [
        { text: 'Home', href: '#' },
        { text: 'Shop', href: '#' },
        { text: 'About Us', href: '#' },
        { text: 'FAQ', href: '#' },
        { text: 'Shipping', href: '#' },
        { text: 'Returns', href: '#' }
    ];

    const quickLinksContainer = document.getElementById('quickLinks');
    quickLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        quickLinksContainer.appendChild(li);
    });

    // Initialize contact info
    const contactInfo = document.getElementById('contactInfo');
    const contactDetails = [
        '123 Flower Street, Garden City',
        'Phone: (123) 456-7890',
        'Email: info@bloomsandpetals.com',
        'Open: Mon-Sat 9am-7pm'
    ];

    contactDetails.forEach(detail => {
        const p = document.createElement('p');
        p.textContent = detail;
        contactInfo.appendChild(p);
    });
});

// Search functionality
searchBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
        // In a real app, this would filter products
    }
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Shop Now button
shopNowBtn.addEventListener('click', function() {
    window.location.href = '#productsGrid';
});

// Learn More button
learnMoreBtn.addEventListener('click', function() {
    document.querySelector('.about-content').scrollIntoView({ behavior: 'smooth' });
});

// Newsletter form
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing with ${email}!`);
    this.reset();
});

// Modal functionality
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle (would be added for mobile responsiveness)
function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.id = 'menuToggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.logo-container').appendChild(menuToggle);
    
    const mainNav = document.getElementById('mainNav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
}

// Initialize mobile menu if screen is small
if (window.innerWidth < 768) {
    initMobileMenu();
}

window.addEventListener('resize', function() {
    if (window.innerWidth < 768) {
        initMobileMenu();
    } else {
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) menuToggle.remove();
        document.getElementById('mainNav').classList.remove('active');
    }
});