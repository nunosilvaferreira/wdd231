// DOM Elements
const menuButton = document.getElementById('menu-button');
const primaryNav = document.getElementById('primary-nav');
const currentYearEl = document.getElementById('current-year');
const lastModifiedEl = document.getElementById('last-modified');

// Mobile Menu Toggle
menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('show');
});

// Set current year
currentYearEl.textContent = new Date().getFullYear();

// Set last modified date
lastModifiedEl.textContent = document.lastModified;

// Close banner
const meetGreetBanner = document.getElementById('meet-greet');
if (meetGreetBanner) {
    const closeBanner = () => {
        meetGreetBanner.style.display = 'none';
        localStorage.setItem('lastBannerDay', new Date().getDay());
    };
    
    // Only show on Wednesdays (day 3)
    if (new Date().getDay() === 3) {
        const lastBannerDay = localStorage.getItem('lastBannerDay');
        if (lastBannerDay !== '3') {
            meetGreetBanner.style.display = 'block';
        }
    }
}