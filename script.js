document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    mobileMenuIcon.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close menu when clicking outside (optional, but good UX)
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuIcon.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Check if it's the stats container to trigger number animation
                if (entry.target.classList.contains('stats-container')) {
                    const numbers = entry.target.querySelectorAll('.stat-number');
                    numbers.forEach(num => {
                        const target = +num.getAttribute('data-target');
                        const suffix = num.getAttribute('data-suffix');
                        const duration = 2000; // 2 seconds
                        const increment = target / (duration / 16); // 60fps

                        let current = 0;
                        const updateCount = () => {
                            current += increment;
                            if (current < target) {
                                // Format number: 57000 -> 57
                                let displayValue;
                                if (target >= 1000) {
                                    displayValue = Math.floor(current / 1000); // just the K part
                                } else {
                                    displayValue = Math.ceil(current);
                                }

                                num.innerText = displayValue + suffix; // We want strictly 57K+ not 57000
                                requestAnimationFrame(updateCount);
                            } else {
                                // Final state logic to ensure clean numbers
                                if (target >= 1000) {
                                    num.innerText = (target / 1000) + suffix;
                                } else {
                                    num.innerText = target + suffix;
                                }
                            }
                        };
                        updateCount();
                    });
                }

                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => {
        observer.observe(el);
    });
});
