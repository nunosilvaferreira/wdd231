// DOM Elements
const yearElement = document.getElementById('year');
const lastModifiedElement = document.getElementById('lastModified');
const spotlightContainer = document.getElementById('spotlight-members');

// Current year and last modified
yearElement.textContent = new Date().getFullYear();
lastModifiedElement.textContent = document.lastModified;

// Fetch spotlight members
async function fetchSpotlightMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displaySpotlightMembers(members);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displaySpotlightMembers(members) {
  // Filter gold and silver members
  const qualifiedMembers = members.filter(member => member.membership >= 2);
  
  // Shuffle and select 2-3 members
  const shuffled = [...qualifiedMembers].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(3, shuffled.length));
  
  spotlightContainer.innerHTML = selected.map(member => `
    <div class="spotlight-card">
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <p>${member.membership === 2 ? 'Silver Member' : 'Gold Member'}</p>
      <a href="${member.website}" target="_blank">Visit Site</a>
    </div>
  `).join('');
}

// Initialize
fetchSpotlightMembers();

// Weather API would be implemented here
// Placeholder for weather functionality
document.getElementById('weather-now').innerHTML = `
  <p>72°F</p>
  <p>Partly Cloudy</p>
`;

document.getElementById('weather-forecast').innerHTML = `
  <div class="forecast-day">
    <p>Tomorrow</p>
    <p>75°F</p>
  </div>
  <div class="forecast-day">
    <p>Day 2</p>
    <p>70°F</p>
  </div>
  <div class="forecast-day">
    <p>Day 3</p>
    <p>68°F</p>
  </div>
`;