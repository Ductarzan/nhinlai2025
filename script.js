document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Image Clip-path Reveal
    const imgRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal-img').forEach(el => imgRevealObserver.observe(el));

    // Smooth Scroll for Hero Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const firstSection = document.querySelector('.intro-section');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Simple Parallax Effect
    const parallaxImages = document.querySelectorAll('.parallax-img img');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxImages.forEach(img => {
            const speed = 0.5;
            // Only apply if in view to save performance
            const rect = img.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Calculate offset based on scroll position relative to the element
                // This is a simplified version; a robust one considers element offsetTop
                // For now, let's just translate slightly based on scroll
                // img.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
            }
        });
    });
    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    // Select all images that should be zoomable
    // stories, gallery, masonry grid
    const zoomableImages = document.querySelectorAll('.full-width-image img, .gallery-grid img, .grid-item img');

    zoomableImages.forEach(img => {
        img.addEventListener('click', function () {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
            // Use alt text or figcaption for caption
            let captionText = this.alt;
            // Try to find a sibling figcaption if exists and alt is empty or generic
            const figcaption = this.parentElement.querySelector('figcaption');
            if (figcaption) {
                captionText = figcaption.textContent;
            } else if (this.parentElement.tagName === 'FIGURE') {
                const fig = this.parentElement.querySelector('figcaption');
                if (fig) captionText = fig.textContent;
            }

            lightboxCaption.textContent = captionText;
        });
    });

    // Close Button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
        });
    }

    // Close on clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === "block") {
            lightbox.style.display = "none";
        }
    });

    // Sticky Home Button Logic
    const homeBtn = document.querySelector('.hero-home-btn');
    if (homeBtn) {
        window.addEventListener('scroll', () => {
            // 15% of viewport height is roughly where user scrolls past the hero content top
            if (window.scrollY > window.innerHeight * 0.15) {
                homeBtn.classList.add('scrolled');
            } else {
                homeBtn.classList.remove('scrolled');
            }
        });
    }

});
