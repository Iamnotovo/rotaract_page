import React from 'react'
import { getProjectPhotoUrl } from '../utils/memberPhoto'
import { useI18n } from '../i18n/LanguageContext'
import './ProjectDetail.css'

function ProjectDetail({ project, onClose }) {
  const { t } = useI18n()
  const title = project.title || t('projectsPage.untitled')
  return (
    <div className="modal" onClick={onClose} role="presentation">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="project-detail-heading">
        <button type="button" className="close-modal close-modal-btn" onClick={onClose} aria-label={t('projectDetail.closeAria')}>×</button>
        <div className="project-detail">
          <h1 id="project-detail-heading">{title}</h1>
          
          {project.mainPhoto && (
            <div className="project-detail-main">
              <img
                src={getProjectPhotoUrl(project.mainPhoto)}
                alt={title}
                className="project-detail-main-image"
                style={{ objectPosition: project.mainPhotoPosition || 'center center' }}
              />
            </div>
          )}
          
          <div className="project-detail-section">
            <h2>{t('projectDetail.description')}</h2>
            <p className="project-detail-description-text">{project.description || ''}</p>
          </div>
          
          {project.whatDone && (
            <div className="project-detail-section">
              <h2>{t('projectDetail.whatDone')}</h2>
              <p>{project.whatDone}</p>
            </div>
          )}
          
          {project.whatLearned && (
            <div className="project-detail-section">
              <h2>{t('projectDetail.whatLearned')}</h2>
              <p>{project.whatLearned}</p>
            </div>
          )}
          
          {project.photos && project.photos.length > 0 && (
            <div className="project-detail-section">
              <h2>{t('projectDetail.gallery')}</h2>
              <div className="project-gallery">
                {project.photos.map((photo, index) => (
                  <img key={photo} src={getProjectPhotoUrl(photo)} alt={t('projectDetail.photoAlt', { n: index + 1 })} className="gallery-image" />
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
