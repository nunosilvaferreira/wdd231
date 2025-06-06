document.addEventListener('DOMContentLoaded', function() {
    // Set dynamic dates
    const copyrightYear = document.getElementById('copyright-year');
    const lastModified = document.getElementById('last-modified');
    
    copyrightYear.textContent = new Date().getFullYear();
    lastModified.textContent = `Last Modified: ${document.lastModified}`;

    // Set form timestamp
    const timestampField = document.getElementById('timestamp');
    timestampField.value = new Date().toISOString();

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('show');
        this.setAttribute('aria-expanded', navList.classList.contains('show'));
    });

    // Animate plan cards with staggered delay
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    });

    // Modal functionality
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Close modals with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
    });

    // Form validation for business position
    const positionInput = document.querySelector('input[name="position"]');
    if (positionInput) {
        positionInput.addEventListener('input', function() {
            const pattern = /^[A-Za-z\- ]{7,}$/;
            if (!pattern.test(this.value)) {
                this.setCustomValidity('Minimum 7 letters, hyphens or spaces only');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth > 768) {
            navList.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    window.addEventListener('resize', handleResize);
});