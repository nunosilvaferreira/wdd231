// Responsive navigation menu
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const navList = document.querySelector('nav ul');
    
    menuButton.addEventListener('click', function() {
        navList.classList.toggle('show');
    });
    
    // Close menu when a link is clicked (for mobile)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navList.classList.remove('show');
            }
        });
    });
});