import React, { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectDetail from '../components/ProjectDetail'
import './Projects.css'

function Projects() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    const saved = localStorage.getItem('projects')
    if (saved) {
      setProjects(JSON.parse(saved))
    }
  }

  return (
    <div className="projects-page">
      <h1 className="page-title">Projects</h1>
      
      {projects.length === 0 ? (
        <p className="no-projects">No projects available at the moment.</p>
      ) : (
        <>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                onClick={() => setSelectedProject(index)}
              />
            ))}
          </div>
          
          {selectedProject !== null && (
            <ProjectDetail
              project={projects[selectedProject]}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Projects
