document.addEventListener('DOMContentLoaded', async function() {
    // DOM Elements
    const directoryContainer = document.getElementById('directory-container');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const filterSelect = document.getElementById('membership-filter');

    try {
        // Load member data
        const response = await fetch('https://nunosilvaferreira.github.io/wdd231/community-serve-hub/data/members.json');
        if (!response.ok) throw new Error('Failed to load data');
        const members = await response.json();

        // Initialize view
        let currentView = 'grid';
        let currentFilter = 'all';

        // Display members function
        function displayMembers(view, filter) {
            const filteredMembers = filter === 'all' 
                ? members 
                : members.filter(m => m.membershipLevel.toLowerCase().includes(filter.toLowerCase()));

            directoryContainer.className = view === 'grid' ? 'directory-grid' : 'directory-list';
            directoryContainer.innerHTML = '';

            filteredMembers.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.className = view === 'grid' ? 'member-card' : 'member-list-item';

                memberCard.innerHTML = view === 'grid' 
                    ? generateGridView(member) 
                    : generateListView(member);

                directoryContainer.appendChild(memberCard);
            });
        }

        // View templates
        function generateGridView(member) {
            return `
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
            `;
        }

        function generateListView(member) {
            return `
                <div class="list-item-header">
                    <h3>${member.name}</h3>
                    <span class="membership-level ${member.membershipLevel.toLowerCase().replace(' ', '-')}">
                        ${member.membershipLevel}
                    </span>
                </div>
                <div class="list-item-content">
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Description:</strong> ${member.description}</p>
                    <a href="${member.website}" target="_blank" class="list-website-link">Visit Website</a>
                </div>
            `;
        }

        // Event listeners
        gridViewBtn.addEventListener('click', () => {
            currentView = 'grid';
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            displayMembers(currentView, currentFilter);
        });

        listViewBtn.addEventListener('click', () => {
            currentView = 'list';
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            displayMembers(currentView, currentFilter);
        });

        filterSelect.addEventListener('change', (e) => {
            currentFilter = e.target.value;
            displayMembers(currentView, currentFilter);
        });

        // Initial display
        gridViewBtn.classList.add('active');
        displayMembers('grid', 'all');

    } catch (error) {
        console.error('Error:', error);
        directoryContainer.innerHTML = `
            <div class="error">
                <p>Unable to load directory. Please try again later.</p>
                <p><small>${error.message}</small></p>
            </div>
        `;
    }
});