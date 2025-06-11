// Process form data from URL parameters
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.size > 0) {
        const formDataContainer = document.getElementById('form-data');
        let html = '<h2>Thank you for signing up!</h2><ul>';
        
        params.forEach((value, key) => {
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        });
        
        html += '</ul>';
        formDataContainer.innerHTML = html;
        
        // Store in localStorage
        const submission = {
            date: new Date().toISOString(),
            data: Object.fromEntries(params)
        };
        
        let submissions = JSON.parse(localStorage.getItem('volunteerSubmissions') || []);
        submissions.push(submission);
        localStorage.setItem('volunteerSubmissions', JSON.stringify(submissions));
    }
});