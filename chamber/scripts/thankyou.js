document.addEventListener('DOMContentLoaded', function() {
    // Set dynamic dates
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

    // Display submitted data
    const urlParams = new URLSearchParams(window.location.search);
    const detailsContainer = document.getElementById('application-details');
    
    if (urlParams.size > 0) {
        let html = '<h3>Your Application Summary</h3><ul>';
        
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
        
        const membershipLevels = {
            np: 'NP Membership (Non-Profit)',
            bronze: 'Bronze Membership ($100/year)',
            silver: 'Silver Membership ($250/year)',
            gold: 'Gold Membership ($500/year)'
        };

        for (const [key, value] of urlParams) {
            if (value && fieldLabels[key]) {
                let displayValue = value;
                
                if (key === 'timestamp') {
                    displayValue = new Date(value).toLocaleString();
                } else if (key === 'membership') {
                    displayValue = membershipLevels[value] || value;
                }
                
                html += `<li><strong>${fieldLabels[key]}:</strong> ${displayValue}</li>`;
            }
        }
        
        html += '</ul>';
        detailsContainer.innerHTML = html;
    } else {
        detailsContainer.innerHTML = '<p>No application data received. Please complete the <a href="join.html">membership form</a>.</p>';
    }
});