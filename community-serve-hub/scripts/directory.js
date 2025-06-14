document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load member data with absolute URL
        const response = await fetch('https://nunosilvaferreira.github.io/wdd231/community-serve-hub/data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const members = await response.json();
        const directoryContainer = document.getElementById('directory-container');
        
        // Display loading state
        directoryContainer.innerHTML = '<div class="loading">Loading members...</div>';
        
        if (members && members.length > 0) {
            displayMembers(members, directoryContainer);
        } else {
            throw new Error('No member data found');
        }
        
    } catch (error) {
        console.error('Error loading directory:', error);
        document.getElementById('directory-container').innerHTML = `
            <div class="error">
                <p>Unable to load member directory. Please try again later.</p>
                <p><small>${error.message}</small></p>
            </div>
        `;
    }
});

function displayMembers(members, container) {
    container.innerHTML = members.map(member => `
        <div class="member-card">
            <img src="https://nunosilvaferreira.github.io/wdd231/community-serve-hub/images/${member.image}" 
                 alt="${member.name}" 
                 loading="lazy"
                 width="400"
                 height="300"
                 onerror="this.src='https://nunosilvaferreira.github.io/wdd231/community-serve-hub/images/placeholder.jpg'">
            <div class="member-content">
                <h3>${member.name}</h3>
                <span class="membership-level ${member.membershipLevel.toLowerCase().replace(/\s+/g, '-')}">
                    ${member.membershipLevel}
                </span>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
                <p class="description">${member.description}</p>
            </div>
        </div>
    `).join('');
}