// scripts/responsive-menu.js
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    
    menuButton.addEventListener('click', function() {
        const isExpanded = primaryNav.getAttribute('aria-expanded') === 'true';
        primaryNav.setAttribute('aria-expanded', !isExpanded);
        menuButton.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle hamburger icon
        if (!isExpanded) {
            menuButton.innerHTML = '✕'; // Close icon
        } else {
            menuButton.innerHTML = '☰'; // Hamburger icon
        }
    });
    
    // Close menu when clicking on a link (mobile)
    document.querySelectorAll('#primary-nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                primaryNav.setAttribute('aria-expanded', 'false');
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.innerHTML = '☰';
            }
        });
    });
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768) {
            primaryNav.setAttribute('aria-expanded', 'true');
            menuButton.setAttribute('aria-expanded', 'true');
        } else {
            primaryNav.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.innerHTML = '☰';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
});