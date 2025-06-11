/**
 * opportunities.js - Handles dynamic loading and filtering of volunteer opportunities
 */

import { showSignUpModal } from './main.js';

// DOM Elements
const opportunitiesContainer = document.getElementById('opportunities-container');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const locationFilter = document.getElementById('location');
const categoryFilter = document.getElementById('category');
const applyFiltersBtn = document.getElementById('apply-filters');

// Global variables
let allOpportunities = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadOpportunities();
        setupEventListeners();
    } catch (error) {
        console.error('Initialization error:', error);
        displayError('Failed to initialize page. Please refresh.');
    }
});

/**
 * Loads opportunities data from JSON file
 */
async function loadOpportunities() {
    try {
        showLoadingState(true);
        
        // In a real implementation, this could be a fetch to an API
        const response = await fetch('scripts/data/opportunities.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        allOpportunities = data.opportunities || [];
        
        if (allOpportunities.length === 0) {
            displayError('No opportunities found.');
            return;
        }
        
        displayOpportunities(allOpportunities);
    } catch (error) {
        console.error('Error loading opportunities:', error);
        displayError('Failed to load opportunities. Please try again later.');
    } finally {
        showLoadingState(false);
    }
}

/**
 * Displays opportunities in the container
 * @param {Array} opportunities - Array of opportunity objects
 */
function displayOpportunities(opportunities) {
    if (!opportunitiesContainer) return;

    // Clear existing content
    opportunitiesContainer.innerHTML = '';

    if (opportunities.length === 0) {
        opportunitiesContainer.innerHTML = `
            <div class="no-results">
                <p>No opportunities match your filters.</p>
                <button id="reset-filters">Reset Filters</button>
            </div>
        `;
        
        document.getElementById('reset-filters')?.addEventListener('click', resetFilters);
        return;
    }

    // Use array method (map) and template literals
    opportunitiesContainer.innerHTML = opportunities.map(opp => `
        <article class="opportunity-card" data-id="${opp.id}" data-category="${opp.category}" data-location="${opp.location}">
            <img src="images/opportunities/${opp.image}" 
                 alt="${opp.title}" 
                 loading="lazy"
                 width="400"
                 height="300">
            <div class="opportunity-card-content">
                <h3>${opp.title}</h3>
                <div class="opportunity-meta">
                    <p><strong>Organization:</strong> ${opp.organization}</p>
                    <p><strong>Date:</strong> ${formatDate(opp.date)}</p>
                    <p><strong>Time:</strong> ${opp.time}</p>
                    <p><strong>Location:</strong> ${opp.location} District</p>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${calculateProgress(opp)}%"></div>
                    <span>${opp.volunteersRegistered}/${opp.volunteersNeeded} volunteers</span>
                </div>
                <button class="sign-up-button" data-id="${opp.id}">Sign Up Now</button>
            </div>
        </article>
    `).join('');

    // Add event listeners to all sign-up buttons
    document.querySelectorAll('.sign-up-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const oppId = e.target.dataset.id;
            const opportunity = allOpportunities.find(o => o.id === oppId);
            if (opportunity) {
                showSignUpModal(opportunity);
            }
        });
    });
}

/**
 * Sets up event listeners for filters
 */
function setupEventListeners() {
    applyFiltersBtn?.addEventListener('click', applyFilters);
    
    // Allow Enter key to apply filters
    [locationFilter, categoryFilter].forEach(filter => {
        filter?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    });
}

/**
 * Applies the selected filters
 */
function applyFilters() {
    const selectedLocation = locationFilter.value;
    const selectedCategory = categoryFilter.value;
    
    let filteredOpportunities = [...allOpportunities];
    
    if (selectedLocation) {
        filteredOpportunities = filteredOpportunities.filter(
            opp => opp.location.toLowerCase() === selectedLocation.toLowerCase()
        );
    }
    
    if (selectedCategory) {
        filteredOpportunities = filteredOpportunities.filter(
            opp => opp.category.toLowerCase() === selectedCategory.toLowerCase()
        );
    }
    
    displayOpportunities(filteredOpportunities);
    
    // Scroll to results
    opportunitiesContainer.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Resets all filters
 */
function resetFilters() {
    locationFilter.value = '';
    categoryFilter.value = '';
    displayOpportunities(allOpportunities);
}

/**
 * Shows/hides loading state
 * @param {boolean} isLoading - Whether to show loading state
 */
function showLoadingState(isLoading) {
    if (loadingMessage) {
        loadingMessage.style.display = isLoading ? 'block' : 'none';
    }
    if (opportunitiesContainer) {
        opportunitiesContainer.style.display = isLoading ? 'none' : 'grid';
    }
}

/**
 * Displays an error message
 * @param {string} message - The error message to display
 */
function displayError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    if (opportunitiesContainer) {
        opportunitiesContainer.style.display = 'none';
    }
}

/**
 * Formats a date string
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Calculates volunteer progress percentage
 * @param {Object} opportunity - The opportunity object
 * @returns {number} Percentage of volunteers registered
 */
function calculateProgress(opportunity) {
    return Math.min(
        Math.round((opportunity.volunteersRegistered / opportunity.volunteersNeeded) * 100),
        100
    );
}