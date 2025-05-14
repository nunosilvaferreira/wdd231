// DOM Elements
const membersContainer = document.getElementById("members");
const [gridBtn, listBtn] = document.querySelectorAll(".view-btn");
const toggleBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");

// View toggle functionality
function setView(view) {
  membersContainer.className = view;
  gridBtn.classList.toggle("active", view === "grid-view");
  listBtn.classList.toggle("active", view === "list-view");
}

// Fetch and display members
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching members:", error);
    membersContainer.innerHTML = `<p class="error">Error loading members. Please try again later.</p>`;
    return [];
  }
}

function createMemberCard(member) {
  const card = document.createElement("article");
  card.className = "member-card";
  const levels = ["Basic", "Silver", "Gold"];
  
  card.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
    <h2>${member.name}</h2>
    <address>${member.address}</address>
    <p><a href="tel:${member.phone.replace(/\D/g, '')}">${member.phone}</a></p>
    <a href="${member.website}" target="_blank" rel="noopener">Website</a>
    <p class="level">Level: ${levels[member.membership - 1]}</p>
  `;
  
  return card;
}

async function displayMembers() {
  const members = await getMembers();
  membersContainer.innerHTML = "";
  members.forEach(member => {
    membersContainer.appendChild(createMemberCard(member));
  });
}

// Event Listeners
gridBtn.addEventListener("click", () => setView("grid-view"));
listBtn.addEventListener("click", () => setView("list-view"));
toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  toggleBtn.setAttribute("aria-expanded", nav.classList.contains("open"));
});

// Initialize
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
displayMembers();