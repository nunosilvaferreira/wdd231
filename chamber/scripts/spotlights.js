document.addEventListener('DOMContentLoaded', () => {
    fetch('data/members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displaySpotlights(data);
        })
        .catch(error => {
            console.error('Error loading member data:', error);
            document.querySelector('.spotlight-container').innerHTML = 
                '<p>Member spotlights currently unavailable</p>';
        });
});

function displaySpotlights(members) {
    const container = document.querySelector('.spotlight-container');
    container.innerHTML = '';
    
    // Filter gold and silver members
    const qualifiedMembers = members.filter(member => 
        ['Gold', 'Silver'].includes(member.membershipLevel)
    );
    
    // Randomly select 2-3 members
    const spotlights = [];
    const count = Math.min(3, Math.max(2, qualifiedMembers.length));
    const shuffled = [...qualifiedMembers].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < count; i++) {
        if (shuffled[i]) {
            spotlights.push(shuffled[i]);
        }
    }
    
    spotlights.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <p class="membership-level">${member.membershipLevel} Member</p>
        `;
        container.appendChild(card);
    });
}