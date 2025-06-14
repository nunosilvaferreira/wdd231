// scripts/discover.js
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoad = function(image) {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = function() {
            image.removeAttribute('data-src');
        };
    };
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    lazyLoad(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        lazyImages.forEach(lazyLoad);
    }
    
    // Visit counter
    if (localStorage.getItem('lastVisit')) {
        const lastVisit = new Date(localStorage.getItem('lastVisit'));
        const currentDate = new Date();
        const timeDiff = currentDate - lastVisit;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        document.getElementById('last-visit').textContent = 
            `Your last visit was ${daysDiff} days ago.`;
        
        // Update visit count
        let visitCount = localStorage.getItem('visitCount') || 0;
        visitCount = parseInt(visitCount) + 1;
        localStorage.setItem('visitCount', visitCount);
        document.getElementById('visit-count').textContent = visitCount;
    } else {
        document.getElementById('last-visit').textContent = 
            'This is your first visit! Welcome!';
        localStorage.setItem('visitCount', 1);
        document.getElementById('visit-count').textContent = 1;
    }
    
    // Store current visit date
    localStorage.setItem('lastVisit', new Date());
});