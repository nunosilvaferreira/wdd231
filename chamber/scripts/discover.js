// Load attractions data from JSON and create cards
document.addEventListener('DOMContentLoaded', function() {
    // Load visitor message functionality
    displayVisitorMessage();
    
    // Load attractions data
    fetch('data/attractions.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('attractions-container');
            data.attractions.forEach((attraction, index) => {
                const card = createAttractionCard(attraction, index + 1);
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading attractions:', error));
});

function createAttractionCard(attraction, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.gridArea = `card${index}`;
    
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = attraction.image;
    img.alt = attraction.name;
    img.loading = "lazy";
    figure.appendChild(img);
    
    const content = document.createElement('div');
    content.className = 'card-content';
    
    const title = document.createElement('h3');
    title.textContent = attraction.name;
    
    const address = document.createElement('address');
    address.textContent = attraction.address;
    
    const description = document.createElement('p');
    description.textContent = attraction.description;
    
    const button = document.createElement('button');
    button.textContent = 'Learn More';
    button.addEventListener('click', () => {
        // In a real application, this would navigate to a detail page
        alert(`More information about ${attraction.name} coming soon!`);
    });
    
    content.appendChild(title);
    content.appendChild(address);
    content.appendChild(description);
    content.appendChild(button);
    
    card.appendChild(figure);
    card.appendChild(content);
    
    return card;
}

function displayVisitorMessage() {
    const now = new Date();
    const lastVisit = localStorage.getItem('lastVisit');
    const messageContainer = document.querySelector('.visitor-message');
    
    if (!lastVisit) {
        messageContainer.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDiff = now - lastVisitDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) {
            messageContainer.textContent = 'Back so soon! Awesome!';
        } else {
            const dayText = daysDiff === 1 ? 'day' : 'days';
            messageContainer.textContent = `You last visited ${daysDiff} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', now.getTime().toString());
}