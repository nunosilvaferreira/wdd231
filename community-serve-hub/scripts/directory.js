// scripts/directory.js

document.addEventListener('DOMContentLoaded', async () => {
  const directoryContainer = document.getElementById('directory-container');
  const gridViewBtn = document.getElementById('grid-view');
  const listViewBtn = document.getElementById('list-view');
  const filterSelect = document.getElementById('membership-filter');

  try {
    const response = await fetch('https://nunosilvaferreira.github.io/wdd231/community-serve-hub/data/members.json');
    if (!response.ok) throw new Error('Failed to load member data.');
    const members = await response.json();

    let currentView = 'grid';
    let currentFilter = 'all';

    const displayMembers = (view, filter) => {
      const filtered = filter === 'all'
        ? members
        : members.filter(m =>
            m.membershipLevel.toLowerCase().includes(filter.toLowerCase())
          );

      directoryContainer.className = view === 'grid' ? 'directory-grid' : 'directory-list';
      directoryContainer.innerHTML = '';

      filtered.forEach(member => {
        const card = document.createElement('div');
        card.className = view === 'grid' ? 'member-card' : 'member-list-item';
        card.innerHTML = view === 'grid'
          ? generateGridView(member)
          : generateListView(member);
        directoryContainer.appendChild(card);
      });
    };

    const generateGridView = (member) => `
      <img src="./images/${member.image}" 
           alt="Logo or photo of ${member.name}" 
           loading="lazy" width="150" height="150" />
      <div class="member-content">
        <h3>${member.name}</h3>
        <span class="membership-badge ${member.membershipLevel.toLowerCase().replace(' ', '-')}">
          ${member.membershipLevel}
        </span>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
        <p class="description">${member.description}</p>
      </div>
    `;

    const generateListView = (member) => `
      <div class="list-item-header">
        <h3>${member.name}</h3>
        <span class="membership-badge ${member.membershipLevel.toLowerCase().replace(' ', '-')}">
          ${member.membershipLevel}
        </span>
      </div>
      <div class="list-item-content">
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Description:</strong> ${member.description}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="list-website-link">
          Visit Website
        </a>
      </div>
    `;

    gridViewBtn?.addEventListener('click', () => {
      currentView = 'grid';
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      displayMembers(currentView, currentFilter);
    });

    listViewBtn?.addEventListener('click', () => {
      currentView = 'list';
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
      displayMembers(currentView, currentFilter);
    });

    filterSelect?.addEventListener('change', (e) => {
      currentFilter = e.target.value;
      displayMembers(currentView, currentFilter);
    });

    gridViewBtn?.classList.add('active');
    displayMembers(currentView, currentFilter);

  } catch (err) {
    console.error('Directory Load Error:', err);
    directoryContainer.innerHTML = `
      <div class="alert-error">
        <p>⚠️ Unable to load the directory. Please try again later.</p>
        <p><small>${err.message}</small></p>
      </div>
    `;
  }
});
