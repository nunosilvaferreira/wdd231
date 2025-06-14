document.addEventListener('DOMContentLoaded', async function() {
    const directoryContainer = document.getElementById('directory-container');
    directoryContainer.innerHTML = '<div class="loading">Loading members...</div>';

    try {
        // Solution 1: Relative path from the HTML file's location
        const response = await fetch('./data/members.json');
        
        // Fallback Solution: Absolute path if relative fails
        // const response = await fetch('https://nunosilvaferreira.github.io/wdd231/community-serve-hub/data/members.json');
        
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);
        
        const members = await response.json();
        
        if (!Array.isArray(members)) throw new Error('Invalid data format');
        
        renderMembers(members, directoryContainer);
        
    } catch (error) {
        console.error('Failed to load directory:', error);
        showError(directoryContainer, error);
    }
});

function renderMembers(members, container) {
    container.innerHTML = members.map(member => `
        <div class="member-card">
            <img src="./images/${member.image}" 
                 alt="${member.name}"
                 loading="lazy"
                 width="400"
                 height="300"
                 onerror="this.onerror=null;this.src='./images/placeholder.jpg'">
            <div class="member-content">
                <h3>${member.name}</h3>
                <span class="membership-badge ${member.membershipLevel.toLowerCase()}">
                    ${member.membershipLevel}
                </span>
                <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
                <p><i class="fas fa-phone"></i> ${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    <i class="fas fa-external-link-alt"></i> Visit Website
                </a>
                <p class="description">${member.description}</p>
            </div>
        </div>
    `).join('');
}

function showError(container, error) {
    container.innerHTML = `
        <div class="alert alert-error">
            <h3>Directory Unavailable</h3>
            <p>We couldn't load the member directory. Please try again later.</p>
            ${error.message ? `<p><small>Technical details: ${error.message}</small></p>` : ''}
            <button onclick="window.location.reload()">Retry</button>
        </div>
    `;
}