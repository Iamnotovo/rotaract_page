import React, { useState, useEffect } from 'react'
import { getProjectPhotoUrl } from '../utils/memberPhoto'
import { useI18n } from '../i18n/LanguageContext'
import './ProjectForm.css'

const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
  ? import.meta.env.BASE_URL
  : './'

function ProjectForm({ project, onSave, onCancel }) {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mainPhoto: '',
    mainPhotoPosition: 'center center',
    whatDone: '',
    whatLearned: '',
    photos: []
  })
  const [projectFolders, setProjectFolders] = useState([])
  const [selectedFolder, setSelectedFolder] = useState('')

  useEffect(() => {
    fetch(`${BASE}projects/projects-photos.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Not found'))))
      .then((list) => {
        if (Array.isArray(list)) {
          setProjectFolders(list)
          setSelectedFolder((prev) => (prev || (list.length > 0 ? list[0].project : '')))
        }
      })
      .catch(() => setProjectFolders([]))
  }, [])

  useEffect(() => {
    if (project) {
      const mainPhoto = normalizeProjectPath(project.mainPhoto)
      const photos = Array.isArray(project.photos) ? project.photos.map(normalizeProjectPath) : []
      setFormData({
        title: project.title || '',
        description: project.description || '',
        mainPhoto,
        mainPhotoPosition: project.mainPhotoPosition || 'center center',
        whatDone: project.whatDone || '',
        whatLearned: project.whatLearned || '',
        photos
      })
      const folder = extractFolderFromPath(mainPhoto || (photos[0] || ''))
      if (folder) setSelectedFolder(folder)
    } else {
      setFormData({
        title: '',
        description: '',
        mainPhoto: '',
        mainPhotoPosition: 'center center',
        whatDone: '',
        whatLearned: '',
        photos: []
      })
      setSelectedFolder('')
    }
  }, [project])

  function normalizeProjectPath(path) {
    if (!path) return ''
    const s = String(path).trim().replace(/^\.\//, '')
    const match = s.match(/(?:^|\/)projects\/[^?#]+/)
    if (match) {
      const start = s.indexOf('projects/')
      return s.slice(start)
    }
    return s
  }

  function extractFolderFromPath(path) {
    if (!path) return ''
    const parts = String(path).split('/')
    const idx = parts.indexOf('projects')
    if (idx !== -1 && parts.length > idx + 1) return parts[idx + 1]
    return ''
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFolderChange = (e) => {
    const folder = e.target.value
    setSelectedFolder(folder)
    setFormData((prev) => ({
      ...prev,
      mainPhoto: '',
      photos: []
    }))
  }

  const handleMainPhotoChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      mainPhoto: e.target.value
    }))
  }

  const handleGalleryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value)
    setFormData((prev) => ({
      ...prev,
      photos: selected
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const currentFolder = projectFolders.find((p) => p.project === selectedFolder)
  const currentFiles = currentFolder ? currentFolder.files : []

  return (
    <div className="form-modal">
      <div className="form-content">
        <h2>{project ? t('projectForm.editTitle') : t('projectForm.addTitle')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('projectForm.labelTitle')}:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={t('projectForm.titlePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label>{t('projectForm.labelDescription')}:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder={t('projectForm.descriptionPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label>{t('projectForm.labelFolder')}:</label>
            <select
              value={selectedFolder}
              onChange={handleFolderChange}
              required
              className="photo-select"
            >
              <option value="">{t('projectForm.folderPlaceholder')}</option>
              {projectFolders.map((p) => (
                <option key={p.project} value={p.project}>
                  {p.project}
                </option>
              ))}
            </select>
            <p className="photo-hint">
              {t('projectForm.folderHintBefore')}<code>{t('projectForm.folderHintCodeFolder')}</code>{t('projectForm.folderHintMid')}<code>{t('projectForm.folderHintCodeCmd')}</code>{t('projectForm.folderHintAfter')}
            </p>
          </div>

          <div className="form-group">
            <label>{t('projectForm.labelMainPhoto')}:</label>
            <select
              name="mainPhoto"
              value={formData.mainPhoto}
              onChange={handleMainPhotoChange}
              required
              className="photo-select"
              disabled={!selectedFolder || currentFiles.length === 0}
            >
              <option value="">{t('projectForm.mainPhotoPlaceholder')}</option>
              {currentFiles.map((filename) => (
                <option
                  key={filename}
                  value={`projects/${selectedFolder}/${filename}`}
                >
                  {filename}
                </option>
              ))}
            </select>
            {formData.mainPhoto && (
              <img
                src={getProjectPhotoUrl(formData.mainPhoto)}
                alt=""
                className="photo-preview"
                style={{ objectPosition: formData.mainPhotoPosition }}
              />
            )}
          </div>

          <div className="form-group">
            <label>{t('projectForm.labelCrop')}:</label>
            <select
              name="mainPhotoPosition"
              value={formData.mainPhotoPosition}
              onChange={handleChange}
              className="photo-select"
            >
              <option value="center top">{t('projectForm.cropTop')}</option>
              <option value="center center">{t('projectForm.cropCentre')}</option>
              <option value="center bottom">{t('projectForm.cropBottom')}</option>
            </select>
            <p className="photo-hint">{t('projectForm.cropHint')}</p>
          </div>

          <div className="form-group">
            <label>{t('projectForm.labelWhatDone')}:</label>
            <textarea
              name="whatDone"
              value={formData.whatDone}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>{t('projectForm.labelWhatLearned')}:</label>
            <textarea
              name="whatLearned"
              value={formData.whatLearned}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>{t('projectForm.labelGallery')}:</label>
            <select
              multiple
              value={formData.photos}
              onChange={handleGalleryChange}
              className="photo-select"
              disabled={!selectedFolder || currentFiles.length === 0}
            >
              {currentFiles.map((filename) => {
                const value = `projects/${selectedFolder}/${filename}`
                return (
                  <option key={filename} value={value}>
                    {filename}
                  </option>
                )
              })}
            </select>
            <p className="photo-hint">{t('projectForm.galleryHint')}</p>
            {formData.photos.length > 0 && (
              <div className="photos-preview">
                {formData.photos.map((photo, index) => (
                  <div key={photo + index} className="photo-preview-item">
                    <img src={getProjectPhotoUrl(photo)} alt="" className="photo-preview-small" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">{t('projectForm.save')}</button>
            <button type="button" onClick={onCancel} className="cancel-btn">{t('projectForm.cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm
