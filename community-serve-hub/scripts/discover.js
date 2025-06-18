// scripts/discover.js

document.addEventListener('DOMContentLoaded', () => {
  // === Lazy Loading Images ===
  const lazyImages = document.querySelectorAll('img[data-src]');

  const lazyLoad = (image) => {
    image.src = image.getAttribute('data-src');
    image.onload = () => image.removeAttribute('data-src');
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lazyLoad(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(lazyLoad);
  }

  // === Visit Counter ===
  const lastVisitElement = document.getElementById('last-visit');
  const visitCountElement = document.getElementById('visit-count');

  const lastVisit = localStorage.getItem('lastVisit');
  const currentDate = new Date();

  if (lastVisit) {
    const previousDate = new Date(lastVisit);
    const timeDiff = currentDate - previousDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (lastVisitElement) {
      lastVisitElement.textContent = `Your last visit was ${daysDiff} day${daysDiff !== 1 ? 's' : ''} ago.`;
    }

    let visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
    visitCount++;
    localStorage.setItem('visitCount', visitCount);

    if (visitCountElement) {
      visitCountElement.textContent = visitCount;
    }
  } else {
    if (lastVisitElement) {
      lastVisitElement.textContent = 'This is your first visit! Welcome!';
    }

    localStorage.setItem('visitCount', 1);
    if (visitCountElement) {
      visitCountElement.textContent = 1;
    }
  }

  localStorage.setItem('lastVisit', currentDate.toISOString());
});