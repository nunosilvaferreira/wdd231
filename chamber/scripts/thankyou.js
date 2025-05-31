document.addEventListener('DOMContentLoaded', () => {
    // Set dynamic dates
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;
    
    // Display submitted data
    const urlParams = new URLSearchParams(window.location.search);
    const detailsContainer = document.getElementById('application-details');
    
    if (urlParams.size > 0) {
        let html = '<h3>Application Summary:</h3><ul>';
        
        const fieldLabels = {
            firstName: 'First Name',
            lastName: 'Last Name',
            position: 'Position',
            email: 'Email',
            phone: 'Phone',
            business: 'Business Name',
            membership: 'Membership Level',
            timestamp: 'Application Date'
        };
        
        for (const [key, value] of urlParams) {
            if (value && fieldLabels[key]) {
                const displayValue = key === 'timestamp' 
                    ? new Date(value).toLocaleString() 
                    : value;
                html += `<li><strong>${fieldLabels[key]}:</strong> ${displayValue}</li>`;
            }
        }
        
        html += '</ul>';
        detailsContainer.innerHTML = html;
    } else {
        detailsContainer.innerHTML = '<p>No application data received.</p>';
    }
});