import React, { useState, useEffect, useMemo } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectDetail from '../components/ProjectDetail'
import { useI18n } from '../i18n/LanguageContext'
import { getLocalizedProject } from '../i18n/localizedSite'
import { loadSiteData } from '../utils/siteData'
import './Projects.css'

function Projects() {
  const { locale, t } = useI18n()
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    let cancelled = false
    loadSiteData().then((data) => {
      if (!cancelled && data.projects) {
        setProjects([...data.projects].sort((a, b) => (a.pinned ? 0 : 1) - (b.pinned ? 0 : 1)))
      }
    })
    return () => { cancelled = true }
  }, [])

  const displayProjects = useMemo(
    () => projects.map((p) => getLocalizedProject(p, locale)),
    [projects, locale]
  )

  return (
    <div className="projects-page">
      <h1 className="page-title">{t('projectsPage.pageTitle')}</h1>
      
      {projects.length === 0 ? (
        <p className="no-projects">{t('projectsPage.none')}</p>
      ) : (
        <>
          <div className="projects-grid">
            {displayProjects.map((project, index) => (
              <ProjectCard
                key={`${locale}-${project.i18nKey ?? index}`}
                project={project}
                onClick={() => setSelectedProject(index)}
              />
            ))}
          </div>

          {selectedProject !== null && (
            <ProjectDetail
              project={displayProjects[selectedProject]}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Projects
