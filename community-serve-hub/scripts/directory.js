document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load member data
        const response = await fetch('./data/members.json');
        
        if (!response.ok) {
            throw new Error('Failed to load member data');
        }
        
        const members = await response.json();
        const directoryContainer = document.getElementById('directory-container');
        
        // Display all members initially
        displayMembers(members, directoryContainer);
        
        // Rest of your event listeners...
    } catch (error) {
        console.error('Error loading directory:', error);
        document.getElementById('directory-container').innerHTML = `
            <div class="error">
                <p>Unable to load member directory. Please try again later.</p>
                <p>${error.message}</p>
            </div>
        `;
    }
});

function displayMembers(members, container) {
    container.innerHTML = members.map(member => `
        <div class="member-card">
            <img src="./images/${member.image}" alt="${member.name}" loading="lazy">
            <div class="member-content">
                <h3>${member.name}</h3>
                <span class="membership-level ${member.membershipLevel.toLowerCase().replace(' ', '-')}">
                    ${member.membershipLevel}
                </span>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="description">${member.description}</p>
            </div>
        </div>
    `).join('');
}