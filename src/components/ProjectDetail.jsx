import React from 'react'
import './ProjectDetail.css'

function ProjectDetail({ project, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div className="project-detail">
          <h1>{project.title}</h1>
          
          <div className="project-detail-main">
            <img src={project.mainPhoto} alt={project.title} className="project-detail-main-image" />
          </div>
          
          <div className="project-detail-section">
            <h2>Description</h2>
            <p className="project-detail-description-text">{project.description}</p>
          </div>
          
          {project.whatDone && (
            <div className="project-detail-section">
              <h2>What Was Done</h2>
              <p>{project.whatDone}</p>
            </div>
          )}
          
          {project.whatLearned && (
            <div className="project-detail-section">
              <h2>What We Learned</h2>
              <p>{project.whatLearned}</p>
            </div>
          )}
          
          {project.photos && project.photos.length > 0 && (
            <div className="project-detail-section">
              <h2>Gallery</h2>
              <div className="project-gallery">
                {project.photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`Project photo ${index + 1}`} className="gallery-image" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
