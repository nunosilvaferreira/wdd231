document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic dates
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;
    
    // Set form timestamp
    document.getElementById('timestamp').value = new Date().toISOString();
    
    // Animate benefit cards with staggered delay
    const cards = document.querySelectorAll('.benefit-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    menuToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.style.display = '';
        }
    });
});