import React from 'react'
import './ProjectCard.css'

function ProjectCard({ project, onClick }) {
  const title = project.title || 'Untitled project'
  const description = project.description || ''
  const mainPhoto = project.mainPhoto || ''
  return (
    <div className="project-card" onClick={onClick}>
      {mainPhoto && <img src={mainPhoto} alt={title} className="project-card-image" />}
      <div className="project-card-content">
        <h3>{title}</h3>
        <p>{description.substring(0, 150)}{description.length > 150 ? '...' : ''}</p>
      </div>
    </div>
  )
}

export default ProjectCard
