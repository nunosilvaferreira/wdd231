function displayMembers(view = 'grid', filter = 'all') {
    directoryContainer.innerHTML = '';
    
    filteredMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <div class="member-content">
                <h3>${member.name}</h3>
                <span class="membership-level ${member.membershipLevel.toLowerCase()}">
                    ${member.membershipLevel}
                </span>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="description">${member.description}</p>
            </div>
        `;
        
        directoryContainer.appendChild(memberCard);
    });
}