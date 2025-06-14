// scripts/thankyou.js
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Display submitted data
    document.getElementById('user-email').textContent = urlParams.get('email');
    
    // Display membership benefits based on selected level
    const membershipLevel = urlParams.get('membership');
    const benefitsContainer = document.getElementById('membership-benefits');
    
    let benefits = '';
    switch(membershipLevel) {
        case 'np':
            benefits = `
                <h3>Non-Profit Membership Benefits</h3>
                <ul>
                    <li>Free directory listing</li>
                    <li>Access to volunteer database</li>
                    <li>Monthly newsletter</li>
                </ul>
            `;
            break;
        case 'bronze':
            benefits = `
                <h3>Bronze Membership Benefits</h3>
                <ul>
                    <li>All Non-Profit benefits</li>
                    <li>Featured in monthly spotlight</li>
                    <li>Event promotion</li>
                    <li>Basic analytics</li>
                </ul>
            `;
            break;
        case 'silver':
            benefits = `
                <h3>Silver Membership Benefits</h3>
                <ul>
                    <li>All Bronze benefits</li>
                    <li>Priority listing in directory</li>
                    <li>Social media promotion</li>
                    <li>Advanced analytics</li>
                </ul>
            `;
            break;
        case 'gold':
            benefits = `
                <h3>Gold Membership Benefits</h3>
                <ul>
                    <li>All Silver benefits</li>
                    <li>Homepage featured placement</li>
                    <li>Dedicated account manager</li>
                    <li>Premium analytics dashboard</li>
                </ul>
            `;
            break;
        default:
            benefits = '<p>Thank you for your interest in our community.</p>';
    }
    
    benefitsContainer.innerHTML = benefits;
});