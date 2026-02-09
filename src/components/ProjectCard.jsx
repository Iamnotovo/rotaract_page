import React from 'react'
import './ProjectCard.css'

function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      <img src={project.mainPhoto} alt={project.title} className="project-card-image" />
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.description.substring(0, 150)}{project.description.length > 150 ? '...' : ''}</p>
      </div>
    </div>
  )
}

export default ProjectCard
