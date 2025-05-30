// Global variable to store member data
let memberData = [];

// Load member data and display
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        memberData = data.members; // Store member data globally
        displayMembers(memberData, getPreferredView());
    } catch (error) {
        console.error('Error loading member data:', error);
    }
}

// Display members in grid or list view
function displayMembers(members, view) {
    const container = document.getElementById('member-container');
    container.innerHTML = '';
    
    // Set the appropriate class based on view
    container.className = view === 'grid' ? 'grid-view' : 'list-view';

    members.forEach(member => {
        const element = view === 'grid' ? createMemberCard(member) : createMemberListItem(member);
        container.appendChild(element);
    });
}

// Create member card for grid view
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership: ${getMembershipLevel(member.membership)}</p>
        ${member.description ? `<p>${member.description}</p>` : ''}
    `;
    return card;
}

// Create list item for list view
function createMemberListItem(member) {
    const item = document.createElement('div');
    item.className = 'member-item';
    item.innerHTML = `
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
        ${member.description ? `<p><strong>Description:</strong> ${member.description}</p>` : ''}
        <hr>
    `;
    return item;
}

// Helper function to get membership level name
function getMembershipLevel(level) {
    const levels = {
        1: 'Basic',
        2: 'Silver',
        3: 'Gold'
    };
    return levels[level] || 'Unknown';
}

// Get the preferred view from localStorage
function getPreferredView() {
    return localStorage.getItem('memberViewPreference') || 'grid';
}

// Set up event listeners for view toggle
function setupViewToggle() {
    const viewRadios = document.querySelectorAll('input[name="view"]');
    viewRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const view = e.target.value;
            localStorage.setItem('memberViewPreference', view);
            displayMembers(memberData, view);
        });
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set copyright year
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    
    // Set last modified date
    document.getElementById('last-modified').textContent = document.lastModified;
    
    // Set up view toggle
    setupViewToggle();
    
    // Load initial view preference
    const preferredView = getPreferredView();
    document.getElementById(`view-${preferredView}`).checked = true;
    
    // Load members
    getMembers();
});