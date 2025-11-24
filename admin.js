// Admin authentication and management
const ADMIN_USERNAME = 'nico';
const ADMIN_PASSWORD = 'admin12345';

// Check if user is logged in
function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Login function
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('loginError');
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        errorMsg.textContent = '';
        addAdminNavLink();
        showSection('admin-dashboard');
        loadAdminDashboard();
    } else {
        errorMsg.textContent = 'Invalid username or password';
    }
}

// Logout function
function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    addAdminNavLink(); // Update navigation
    showSection('home');
}

// Show section helper
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }
}

// Load admin dashboard
function loadAdminDashboard() {
    const projects = getProjects();
    const projectsList = document.getElementById('projects-list');
    
    if (projects.length === 0) {
        projectsList.innerHTML = '<p>No projects yet. Click "Add New Project" to create one.</p>';
        return;
    }
    
    projectsList.innerHTML = projects.map((project, index) => `
        <div class="project-item">
            <img src="${project.mainPhoto}" alt="${project.title}" class="project-thumb">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 100)}...</p>
            </div>
            <div class="project-actions">
                <button onclick="editProject(${index})" class="edit-btn">Edit</button>
                <button onclick="deleteProject(${index})" class="delete-btn">Delete</button>
            </div>
        </div>
    `).join('');
}

// Add project button handler
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => {
            openProjectForm();
        });
    }
    
    // Check if admin is logged in on page load and update navigation
    setTimeout(() => {
        addAdminNavLink();
    }, 100);
    
    // Add click handler for nav bar login button
    const loginBtnNav = document.getElementById('loginBtnNav');
    if (loginBtnNav && !isAdminLoggedIn()) {
        loginBtnNav.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('admin-login');
        });
    }
});

// Add admin navigation link and update login button
function addAdminNavLink() {
    const sidebar = document.querySelector('.sidebar ul');
    const loginNavItem = document.getElementById('loginNavItem');
    const loginNavItemPublic = document.getElementById('loginNavItemPublic');
    const loginBtnNav = document.getElementById('loginBtnNav');
    
    if (isAdminLoggedIn()) {
        // Show admin link, hide login link
        if (loginNavItem) loginNavItem.style.display = 'block';
        if (loginNavItemPublic) loginNavItemPublic.style.display = 'none';
        if (loginBtnNav) {
            loginBtnNav.textContent = 'Admin';
            loginBtnNav.onclick = (e) => {
                e.preventDefault();
                showSection('admin-dashboard');
                loadAdminDashboard();
            };
        }
    } else {
        // Show login link, hide admin link
        if (loginNavItem) loginNavItem.style.display = 'none';
        if (loginNavItemPublic) loginNavItemPublic.style.display = 'block';
        if (loginBtnNav) {
            loginBtnNav.textContent = 'Login';
            loginBtnNav.onclick = (e) => {
                e.preventDefault();
                showSection('admin-login');
            };
        }
    }
}

// Make functions globally available
window.isAdminLoggedIn = isAdminLoggedIn;
window.showSection = showSection;
window.loadAdminDashboard = loadAdminDashboard;

// Edit project
function editProject(index) {
    const projects = getProjects();
    const project = projects[index];
    
    document.getElementById('projectId').value = index;
    document.getElementById('formTitleInput').value = project.title;
    document.getElementById('formDescription').value = project.description;
    document.getElementById('formMainPhoto').value = project.mainPhoto;
    document.getElementById('formWhatDone').value = project.whatDone;
    document.getElementById('formWhatLearned').value = project.whatLearned;
    document.getElementById('formPhotos').value = project.photos ? project.photos.join('\n') : '';
    document.getElementById('formTitle').textContent = 'Edit Project';
    
    // Clear file inputs
    document.getElementById('formMainPhotoFile').value = '';
    document.getElementById('formPhotosFiles').value = '';
    
    // Show previews for existing images
    const mainPreview = document.getElementById('mainPhotoPreview');
    if (mainPreview && project.mainPhoto) {
        mainPreview.src = project.mainPhoto;
        mainPreview.style.display = 'block';
    }
    
    // Show additional photos preview
    if (project.photos && project.photos.length > 0) {
        if (typeof displayAdditionalPhotosPreview === 'function') {
            displayAdditionalPhotosPreview(project.photos);
        }
    }
    
    document.getElementById('projectFormModal').style.display = 'block';
}

// Delete project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        const projects = getProjects();
        projects.splice(index, 1);
        saveProjects(projects);
        loadAdminDashboard();
        displayProjects(); // Refresh public view
    }
}

// Open project form
function openProjectForm() {
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
    document.getElementById('formTitle').textContent = 'Add New Project';
    
    // Clear file inputs
    document.getElementById('formMainPhotoFile').value = '';
    document.getElementById('formPhotosFiles').value = '';
    
    // Hide previews
    document.getElementById('mainPhotoPreview').style.display = 'none';
    document.getElementById('additionalPhotosPreview').innerHTML = '';
    
    document.getElementById('projectFormModal').style.display = 'block';
}

