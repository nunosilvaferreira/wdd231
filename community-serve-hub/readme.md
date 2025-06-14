# Community Serve Hub 🌍

[![Live Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge)](https://nunosilvaferreira.github.io/wdd231/community-serve-hub/)
![GitHub last commit](https://img.shields.io/github/last-commit/nunosilvaferreira/wdd231?style=for-the-badge)

A responsive web portal connecting volunteers with service opportunities in Porto, Portugal. Developed for WDD 230 course.

## Features ✨

- **Member Directory**: Browse 15+ local organizations
- **Responsive Design**: Mobile-first approach
- **Dynamic Content**: JSON-powered data loading
- **Join Form**: Membership application system
- **Discovery Tools**: Community statistics and attractions

## Tech Stack 💻

| Category       | Technologies Used                     |
|----------------|---------------------------------------|
| Frontend       | HTML5, CSS3, JavaScript (ES6)        |
| Styling        | CSS Grid, Flexbox, CSS Variables      |
| Tooling        | GitHub Pages, Visual Studio Code      |
| Optimization   | Lazy Loading, Responsive Images       |

## Project Structure 📂

community-serve-hub/
├── data/
│ └── members.json # Organization data
├── images/ # All visual assets
├── scripts/
│ ├── directory.js # Dynamic directory
│ ├── discover.js # Visit tracking
│ └── responsive-menu.js # Mobile navigation
├── styles/
│ ├── base.css # Core styles
│ └── larger.css # Desktop enhancements
├── index.html # Homepage
├── discover.html # Community info
├── directory.html # Member directory
├── join.html # Membership form
└── thankyou.html # Form confirmation

## Color Scheme 🎨

| Color          | Hex       | Usage                          |
|----------------|-----------|--------------------------------|
| Prussian Blue  | `#1a5f7a` | Primary brand color            |
| Keppel         | `#57C5B6` | Secondary accents              |
| Verdigris      | `#159895` | Interactive elements           |
| Space Cadet    | `#002B5B` | Headers and navigation         |

### Development Notes 📝
Responsive Breakpoints:

Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px

Key JavaScript Features:

javascript
// Dynamic data loading
fetch('./data/members.json')
  .then(response => response.json())
  .then(data => renderMembers(data));

// Local Storage usage
localStorage.setItem('lastVisit', new Date());