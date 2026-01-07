// Mobile Menu Toggle
const menuIcon = document.querySelector('.mobile-menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const closeIcon = document.querySelector('.mobile-menu-close');

if (menuIcon && mobileMenu && closeIcon) {
    menuIcon.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeIcon.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
}

// Close menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});


// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));


// Number Count Up Animation
const statsSection = document.querySelector('.stats-container');
let statsAnimated = false; // Ensure it only runs once per page load

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    statsObserver.observe(statsSection);
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target'); // Get target number
        const suffix = stat.getAttribute('data-suffix') || '';
        const duration = 2000; // Animation duration in ms
        const increment = target / (duration / 16); // 60fps

        let current = 0;

        const updateCount = () => {
            current += increment;

            if (current < target) {
                stat.innerText = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                stat.innerText = target + suffix;
            }
        };

        updateCount();
    });
}

// Collapsible Footer Locations
const locationsHeader = document.querySelector('.locations-header');
const locationsList = document.querySelector('.locations-list');
const locationsArrow = document.querySelector('.locations-arrow');

if (locationsHeader && locationsList) {
    locationsHeader.addEventListener('click', () => {
        locationsList.classList.toggle('open');
        if (locationsArrow) {
            locationsArrow.classList.toggle('open');
        }
    });
}
