document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only trigger once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .editorial-item, .collage-image, .collage-text');
    revealElements.forEach(el => {
        el.classList.add('reveal-text');
        observer.observe(el);
    });

    // 3. Simple Parallax Effect
    const parallaxImages = document.querySelectorAll('.parallax-img');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxImages.forEach(el => {
            const speed = el.dataset.speed || 0.1;
            const yPos = -(scrolled * speed);
            // Apply transform to the container or image wrapper if possible, 
            // but here we might need to target the child if it's the background
            // adaptation: let's move the element itself slightly
            el.style.transform = `translateY(${yPos}px)`;
        });

        // Also subtle parallax for hero image
        const heroImg = document.querySelector('.hero-image');
        if (heroImg) {
            heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.05}px)`;
        }
    });

    // 4. Full Menu Toggle
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuBtn = document.getElementById('close-menu');
    // Find all buttons/links that should open the menu
    const menuTriggers = document.querySelectorAll('a[href="#menu"], .text-link');

    // Also bind to the specific "View Full Menu" text link we created 
    // AND let's update the HTML anchor to be a cleaner trigger if needed.

    menuTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    });

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // 5. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

});
