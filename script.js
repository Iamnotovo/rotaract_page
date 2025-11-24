// Toggle sidebar
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
});

// Close sidebar when clicking overlay
overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
});

// Handle navigation links
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Skip if this is a dropdown toggle (no data-section attribute)
        const targetSection = link.getAttribute('data-section');
        if (!targetSection) {
            return;
        }
        
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Handle admin dashboard
        if (targetSection === 'admin-dashboard') {
            if (typeof isAdminLoggedIn === 'function' && isAdminLoggedIn()) {
                const target = document.getElementById('admin-dashboard');
                if (target) {
                    target.classList.add('active');
                }
                if (typeof loadAdminDashboard === 'function') {
                    loadAdminDashboard();
                }
            } else {
                const target = document.getElementById('admin-login');
                if (target) {
                    target.classList.add('active');
                }
            }
        } else {
            // Show target section
            const target = document.getElementById(targetSection);
            if (target) {
                target.classList.add('active');
            }
            
            // Load projects if navigating to projects section
            if (targetSection === 'projects' && typeof displayProjects === 'function') {
                setTimeout(displayProjects, 100);
            }
        }
        
        // Close sidebar after navigation
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });
});

// Handle dropdown toggle - prevent navigation when clicking dropdown
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
}

// Prevent dropdown from closing when clicking inside it
const dropdownMenu = document.querySelector('.dropdown-menu');
if (dropdownMenu) {
    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

