document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('nav ul');

    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('show');
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navList.classList.remove('show');
            }
        });
    });

    // Dark/light theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme or use preferred color scheme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Skills page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-level-bar');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease';
            }, 100);
        });
    };

    // Only animate if on skills page
    if (window.location.pathname.includes('SKILLS.html')) {
        // Small delay to ensure DOM is fully loaded
        setTimeout(animateSkillBars, 300);
        
        // Also animate when scrolling to skills
        window.addEventListener('scroll', function() {
            const skillsSection = document.querySelector('.skills-page');
            if (isElementInViewport(skillsSection)) {
                animateSkillBars();
            }
        });
    }

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});

    // Active link highlighting
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Profile image hover effect
    const profileImg = document.getElementById('profile-img');
    profileImg.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(5deg)';
    });
    
    profileImg.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0)';
    });
});