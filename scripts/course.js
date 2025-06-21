// Course list functionality
document.addEventListener('DOMContentLoaded', function() {
    const courses = [
        { code: "CSE 110", name: "Programming Building Blocks", credits: 3, completed: true },
        { code: "CSE 111", name: "Programming With Functions", credits: 3, completed: true },
        { code: "CSE 210", name: "Programming With Classes", credits: 3, completed: true },
        { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
        { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
        { code: "WDD 231", name: "Web Frontend Development I", credits: 3, completed: true }
    ];

    const courseCardsContainer = document.getElementById('course-cards');
    const courseCountElement = document.getElementById('course-count');
    const allCoursesBtn = document.getElementById('all-courses');
    const wddCoursesBtn = document.getElementById('wdd-courses');
    const cseCoursesBtn = document.getElementById('cse-courses');

    function displayCourses(filter = 'all') {
        let filteredCourses = courses;
        
        if (filter === 'wdd') {
            filteredCourses = courses.filter(course => course.code.includes('WDD'));
        } else if (filter === 'cse') {
            filteredCourses = courses.filter(course => course.code.includes('CSE'));
        }
        
        courseCountElement.textContent = filteredCourses.length;
        
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        courseCardsContainer.innerHTML = '';
        
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
            
            courseCard.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.name}</p>
                <p>Credits: ${course.credits}</p>
                <p>Status: ${course.completed ? '✓ Completed' : 'Not Completed'}</p>
            `;
            
            courseCardsContainer.appendChild(courseCard);
        });
    }

    // Event listeners for filter buttons
    allCoursesBtn.addEventListener('click', () => displayCourses('all'));
    wddCoursesBtn.addEventListener('click', () => displayCourses('wdd'));
    cseCoursesBtn.addEventListener('click', () => displayCourses('cse'));

    // Initial display
    displayCourses();
});