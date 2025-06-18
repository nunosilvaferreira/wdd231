// scripts/responsive-menu.js

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-button');
  const primaryNav = document.getElementById('primary-nav');

  if (!menuButton || !primaryNav) return;

  // Toggle menu visibility
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;

    menuButton.setAttribute('aria-expanded', newState);
    primaryNav.setAttribute('aria-expanded', newState);
    menuButton.innerHTML = newState ? '✕' : '☰';
  });

  // Collapse menu on mobile when a nav link is clicked
  document.querySelectorAll('#primary-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuButton.setAttribute('aria-expanded', 'false');
        primaryNav.setAttribute('aria-expanded', 'false');
        menuButton.innerHTML = '☰';
      }
    });
  });

  // Handle screen resizing
  const handleResize = () => {
    const isDesktop = window.innerWidth > 768;
    primaryNav.setAttribute('aria-expanded', isDesktop);
    menuButton.setAttribute('aria-expanded', isDesktop);
    menuButton.innerHTML = isDesktop ? '✕' : '☰';
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // Run once on load
});