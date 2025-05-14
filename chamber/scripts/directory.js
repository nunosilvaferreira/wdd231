const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Failed to fetch member data:", error);
    membersContainer.innerHTML = `
      <div class="error-message">
        <p>We're sorry, we couldn't load the member directory at this time.</p>
        <p>Please try again later.</p>
      </div>
    `;
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";
  
  members.forEach(member => {
    const card = document.createElement("article");
    card.classList.add("member-card");
    
    const membershipLevels = ["Member", "Silver", "Gold"];
    const levelClass = `level-${member.membership}`;
    
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="80">
      <h2>${member.name}</h2>
      <address>${member.address}</address>
      <p><a href="tel:${member.phone.replace(/\D/g, '')}">${member.phone}</a></p>
      <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
      <p class="level" data-level="${member.membership}">
        Membership Level: ${membershipLevels[member.membership - 1]}
      </p>
    `;
    
    membersContainer.appendChild(card);
  });
}

// View toggle functionality
gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid-view");
  membersContainer.classList.remove("list-view");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list-view");
  membersContainer.classList.remove("grid-view");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

// Mobile menu toggle
const toggleButton = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

toggleButton.addEventListener('click', () => {
  nav.classList.toggle('open');
  toggleButton.setAttribute('aria-expanded', nav.classList.contains('open'));
});

// Close menu when clicking on a link
document.querySelectorAll('#main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggleButton.setAttribute('aria-expanded', 'false');
  });
});

// Footer info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Initialize
gridBtn.classList.add("active");
fetchMembers();