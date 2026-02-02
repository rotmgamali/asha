document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. PREMIUM LOADING SCREEN =====
    const loader = document.getElementById('loader');

    if (loader) {
        // Hide loader after a set time
        const hideLoader = () => {
            if (!loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        };

        // Check if page is already loaded (e.g. from cache or defer)
        if (document.readyState === 'complete') {
            setTimeout(hideLoader, 1000);
        } else {
            window.addEventListener('load', () => setTimeout(hideLoader, 1000));
        }

        // Safety net: force hide after 2.5 seconds if window.load hangs
        setTimeout(hideLoader, 2500);

        // Prevent scrolling during load
        document.body.style.overflow = 'hidden';
    }

    // ===== 2. HEADER SCROLL EFFECT =====
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== 3. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS =====
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

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal-text, .editorial-item, .collage-image, .collage-text, .content-section');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // ===== 4. SIMPLE PARALLAX EFFECT =====
    const parallaxImages = document.querySelectorAll('.parallax-img');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxImages.forEach(el => {
            const speed = el.dataset.speed || 0.1;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });

        // Subtle parallax for hero image
        const heroImg = document.querySelector('.hero-image');
        if (heroImg) {
            heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.05}px)`;
        }
    });

    // ===== 5. FULL MENU TOGGLE =====
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuBtn = document.getElementById('close-menu');

    // Only bind to specific menu triggers (not all text-links)
    const menuTriggers = document.querySelectorAll('a[href="#menu"], .hero-description .cta-link, .editorial-item.text-block .text-link');

    menuTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== 6. MOBILE MENU TOGGLE =====
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

    // ===== 7. BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== 8. SMOOTH ANCHOR SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if it's the menu trigger or empty hash
            if (targetId === '#menu' || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== 9. MENU ITEM STAGGER ANIMATION =====
    const menuItems = document.querySelectorAll('.menu-category li, .clean-list li');
    menuItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 50}ms`;
    });

    // ===== 10. IMAGE LAZY LOADING ENHANCEMENT =====
    const lazyImages = document.querySelectorAll('.img-wrapper, .dish-thumb, .curry-hero-image');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

});

// ===== 11. SIMPLE LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item img');

// Create lightbox elements
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <div class="lightbox-content">
            <img src="" alt="Gallery Preview">
        </div>
    `;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

// Open Lightbox
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.dataset.full || item.src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close Lightbox functions
const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        lightboxImg.src = '';
    }, 300);
};

lightboxClose.addEventListener('click', closeLightbox);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
    }
});

// Close on Escape key (already handled by global listener but specific for lightbox is good)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});
