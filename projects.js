// Projects management and display

// Handle file upload and convert to base64
function handleFileUpload(fileInput, urlInputId, previewId) {
    const file = fileInput.files[0];
    if (file) {
        // Check if it's a valid image file
        if (!file.type.match('image.*')) {
            alert('Please select a valid image file (PNG, JPG, JPEG)');
            fileInput.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;
            document.getElementById(urlInputId).value = base64Image;
            
            // Show preview
            const preview = document.getElementById(previewId);
            if (preview) {
                preview.src = base64Image;
                preview.style.display = 'block';
                preview.style.maxWidth = '300px';
                preview.style.maxHeight = '300px';
                preview.style.marginTop = '10px';
            }
        };
        reader.readAsDataURL(file);
    }
}

// Handle multiple file uploads
function handleMultipleFiles(fileInput, textareaId) {
    const files = Array.from(fileInput.files);
    const photos = [];
    
    files.forEach((file, index) => {
        if (!file.type.match('image.*')) {
            alert(`File ${file.name} is not a valid image file`);
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            photos.push(e.target.result);
            
            // Update textarea with all photos
            if (index === files.length - 1) {
                const textarea = document.getElementById(textareaId);
                const existingPhotos = textarea.value ? textarea.value.split('\n').filter(url => url.trim()) : [];
                const allPhotos = [...existingPhotos, ...photos];
                textarea.value = allPhotos.join('\n');
                
                // Show previews
                displayAdditionalPhotosPreview(allPhotos);
            }
        };
        reader.readAsDataURL(file);
    });
}

// Display additional photos preview
function displayAdditionalPhotosPreview(photos) {
    const previewContainer = document.getElementById('additionalPhotosPreview');
    if (!previewContainer) return;
    
    previewContainer.innerHTML = photos.map((photo, index) => `
        <div class="photo-preview-item">
            <img src="${photo}" alt="Preview ${index + 1}" class="photo-preview-small">
            <button type="button" onclick="removePhoto(${index})" class="remove-photo-btn">×</button>
        </div>
    `).join('');
}

// Remove photo from additional photos
function removePhoto(index) {
    const textarea = document.getElementById('formPhotos');
    const photos = textarea.value.split('\n').filter(url => url.trim());
    photos.splice(index, 1);
    textarea.value = photos.join('\n');
    displayAdditionalPhotosPreview(photos);
}

// Make functions globally available
window.handleFileUpload = handleFileUpload;
window.handleMultipleFiles = handleMultipleFiles;
window.removePhoto = removePhoto;

// Get projects from localStorage
function getProjects() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
}

// Save projects to localStorage
function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Display projects in grid
function displayProjects() {
    const projects = getProjects();
    const grid = document.getElementById('projects-grid');
    
    if (projects.length === 0) {
        grid.innerHTML = '<p>No projects available at the moment.</p>';
        return;
    }
    
    grid.innerHTML = projects.map((project, index) => `
        <div class="project-card" onclick="showProjectDetail(${index})">
            <img src="${project.mainPhoto}" alt="${project.title}" class="project-card-image">
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}</p>
            </div>
        </div>
    `).join('');
}

// Show project detail modal
function showProjectDetail(index) {
    const projects = getProjects();
    const project = projects[index];
    const modal = document.getElementById('projectModal');
    const detail = document.getElementById('projectDetail');
    
    detail.innerHTML = `
        <div class="project-detail">
            <h1>${project.title}</h1>
            <div class="project-detail-main">
                <img src="${project.mainPhoto}" alt="${project.title}" class="project-detail-main-image">
            </div>
            <div class="project-detail-section">
                <h2>Description</h2>
                <p class="project-detail-description-text">${project.description}</p>
            </div>
            <div class="project-detail-section">
                <h2>What Was Done</h2>
                <p>${project.whatDone}</p>
            </div>
            <div class="project-detail-section">
                <h2>What We Learned</h2>
                <p>${project.whatLearned}</p>
            </div>
            ${project.photos && project.photos.length > 0 ? `
            <div class="project-detail-section">
                <h2>Gallery</h2>
                <div class="project-gallery">
                    ${project.photos.map(photo => `<img src="${photo}" alt="Project photo" class="gallery-image">`).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    modal.style.display = 'block';
}

// Handle project form submission
document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const projects = getProjects();
            const projectId = document.getElementById('projectId').value;
            
            // Get main photo (from file upload or URL)
            let mainPhoto = document.getElementById('formMainPhoto').value;
            if (!mainPhoto) {
                alert('Please upload or enter a main photo');
                return;
            }
            
            // Get additional photos (from file uploads or URLs)
            const photosText = document.getElementById('formPhotos').value;
            const photos = photosText ? photosText.split('\n').filter(url => url.trim()) : [];
            
            const projectData = {
                title: document.getElementById('formTitleInput').value,
                description: document.getElementById('formDescription').value,
                mainPhoto: mainPhoto,
                whatDone: document.getElementById('formWhatDone').value,
                whatLearned: document.getElementById('formWhatLearned').value,
                photos: photos
            };
            
            if (projectId !== '') {
                // Edit existing
                projects[parseInt(projectId)] = projectData;
            } else {
                // Add new
                projects.push(projectData);
            }
            
            saveProjects(projects);
            if (typeof loadAdminDashboard === 'function') {
                loadAdminDashboard();
            }
            displayProjects();
            document.getElementById('projectFormModal').style.display = 'none';
            projectForm.reset();
            
            // Clear file inputs and previews
            document.getElementById('formMainPhotoFile').value = '';
            document.getElementById('formPhotosFiles').value = '';
            document.getElementById('mainPhotoPreview').style.display = 'none';
            document.getElementById('additionalPhotosPreview').innerHTML = '';
        });
    }
    
    // Close modals
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('projectModal').style.display = 'none';
            document.getElementById('projectFormModal').style.display = 'none';
        });
    });
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            document.getElementById('projectFormModal').style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const projectModal = document.getElementById('projectModal');
        const formModal = document.getElementById('projectFormModal');
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
        if (e.target === formModal) {
            formModal.style.display = 'none';
        }
    });
    
    // Load projects on page load
    displayProjects();
});

// Make functions globally available
window.showProjectDetail = showProjectDetail;
window.editProject = editProject;
window.deleteProject = deleteProject;

