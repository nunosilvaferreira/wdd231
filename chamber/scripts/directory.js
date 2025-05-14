const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Failed to fetch member data:", error);
    membersContainer.innerHTML = "<p>Error loading member data. Please try again later.</p>";
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      <p class="level">Level: ${["Member", "Silver", "Gold"][member.membership - 1]}</p>
    `;
    membersContainer.appendChild(card);
  });
}

gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid-view");
  membersContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list-view");
  membersContainer.classList.remove("grid-view");
});

// Mobile menu toggle
const toggleButton = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

toggleButton.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Footer info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Initialize
fetchMembers();