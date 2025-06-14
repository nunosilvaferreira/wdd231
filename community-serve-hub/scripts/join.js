// scripts/join.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.membership-form');
    
    // Set timestamp
    const timestampField = document.getElementById('timestamp');
    timestampField.value = new Date().toISOString();
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const params = new URLSearchParams();
        
        // Add form data to URL params
        formData.forEach((value, key) => {
            params.append(key, value);
        });
        
        // Redirect to thank you page with form data
        window.location.href = `thankyou.html?${params.toString()}`;
    });
});