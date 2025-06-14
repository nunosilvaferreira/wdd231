// scripts/getdates.js
document.addEventListener('DOMContentLoaded', function() {
    // Get current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    
    // Get last modified date
    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;
});