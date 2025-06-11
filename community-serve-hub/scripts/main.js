// DOM Manipulation
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

// Event Handling
menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', 
        menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
});

// Local Storage
if (!localStorage.getItem('visited')) {
    localStorage.setItem('visited', 'true');
    showWelcomeModal();
}

// Modal Dialog
function showWelcomeModal() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h2>Welcome to Community Serve Hub!</h2>
                <p>Discover local volunteer opportunities that match your interests.</p>
                <button id="close-modal">Get Started</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('close-modal').addEventListener('click', () => {
        modal.remove();
    });
}

// Dynamic Content Generation (opportunities.js)
async function loadOpportunities() {
    try {
        const response = await fetch('scripts/data/opportunities.json');
        const data = await response.json();
        
        const container = document.getElementById('opportunities-container');
        
        // Array method (map) and template literals
        container.innerHTML = data.opportunities.map(opp => `
            <article class="opportunity-card">
                <img src="images/opportunities/${opp.image}" 
                     alt="${opp.title}" 
                     loading="lazy">
                <h3>${opp.title}</h3>
                <p><strong>Organization:</strong> ${opp.organization}</p>
                <p><strong>Date:</strong> ${new Date(opp.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> ${opp.location}</p>
                <button class="sign-up" data-id="${opp.id}">Sign Up</button>
            </article>
        `).join('');
        
        // Event delegation for sign-up buttons
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('sign-up')) {
                const oppId = e.target.dataset.id;
                const opportunity = data.opportunities.find(o => o.id === oppId);
                showSignUpModal(opportunity);
            }
        });
    } catch (error) {
        console.error('Error loading opportunities:', error);
        document.getElementById('error-message').textContent = 
            'Failed to load opportunities. Please try again later.';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load featured opportunities
        await loadFeaturedOpportunities();
        
        // Load and animate statistics
        animateStatistics();
    } catch (error) {
        console.error('Error initializing home page:', error);
    }
});

/**
 * Loads and displays featured opportunities
 */
async function loadFeaturedOpportunities() {
    const featuredContainer = document.getElementById('featured-container');
    if (!featuredContainer) return;

    try {
        // Show loading state
        featuredContainer.innerHTML = '<div class="loading-spinner"></div>';

        // Fetch data (in production, this would be an API call)
        const response = await fetch('scripts/data/opportunities.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const featuredOpportunities = data.opportunities
            .sort(() => 0.5 - Math.random()) // Simple shuffle
            .slice(0, 3); // Get first 3 for featured section

        // Generate HTML
        featuredContainer.innerHTML = featuredOpportunities.map(opp => `
            <article class="featured-card" data-id="${opp.id}">
                <img src="images/opportunities/${opp.image}" 
                     alt="${opp.title}" 
                     loading="lazy"
                     width="400"
                     height="300">
                <div class="featured-content">
                    <h3>${opp.title}</h3>
                    <div class="opportunity-meta">
                        <p><i class="fas fa-calendar-alt"></i> ${formatDate(opp.date)}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${opp.location} District</p>
                    </div>
                    <p class="truncate">${opp.description}</p>
                    <a href="opportunities.html#${opp.id}" class="learn-more">Learn More</a>
                </div>
            </article>
        `).join('');

    } catch (error) {
        console.error('Error loading featured opportunities:', error);
        featuredContainer.innerHTML = `
            <div class="error-message">
                <p>We couldn't load featured opportunities right now.</p>
                <a href="opportunities.html" class="button">View All Opportunities</a>
            </div>
        `;
    }
}

/**
 * Animates the statistics counters
 */
function animateStatistics() {
    const counters = [
        { element: document.getElementById('volunteer-count'), target: 1250, duration: 2000 },
        { element: document.getElementById('organization-count'), target: 235, duration: 1500 },
        { element: document.getElementById('hours-count'), target: 5430, duration: 2500 }
    ];

    counters.forEach(counter => {
        if (!counter.element) return;
        
        const start = 0;
        const increment = counter.target / (counter.duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            counter.element.textContent = Math.floor(current).toLocaleString();
            
            if (current >= counter.target) {
                counter.element.textContent = counter.target.toLocaleString();
                clearInterval(timer);
            }
        }, 16);
    });
}

/**
 * Formats date for display
 */
function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}