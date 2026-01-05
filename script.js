document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-loaded');

    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const icon = themeBtn.querySelector('i');

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        root.setAttribute('data-theme', 'light');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        if (currentTheme === 'light') {
            root.removeAttribute('data-theme'); // Go back to default (Dark)
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobileIcon = mobileBtn.querySelector('i');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            mobileIcon.classList.remove('fa-bars');
            mobileIcon.classList.add('fa-xmark');
        } else {
            mobileIcon.classList.remove('fa-xmark');
            mobileIcon.classList.add('fa-bars');
        }
    });

    // Smooth Scroll for Navigation and Close Mobile Menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileIcon.classList.remove('fa-xmark');
                mobileIcon.classList.add('fa-bars');
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
