import React, { useState, useEffect } from 'react'
import { getProjectPhotoUrl } from '../utils/memberPhoto'
import './ProjectForm.css'

const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
  ? import.meta.env.BASE_URL
  : './'

function ProjectForm({ project, onSave, onCancel }) {
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
        <h2>{project ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project title (optional)"
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Description (optional)"
            />
          </div>

          <div className="form-group">
            <label>Project folder (from /projects):</label>
            <select
              value={selectedFolder}
              onChange={handleFolderChange}
              required
              className="photo-select"
            >
              <option value="">— Choose a project folder —</option>
              {projectFolders.map((p) => (
                <option key={p.project} value={p.project}>
                  {p.project}
                </option>
              ))}
            </select>
            <p className="photo-hint">
              Folders and images come from the <code>projects/</code> directory in your repo.
              Run <code>npm run sync-projects</code> (or start dev/build) after adding files.
            </p>
          </div>

          <div className="form-group">
            <label>Main Photo:</label>
            <select
              name="mainPhoto"
              value={formData.mainPhoto}
              onChange={handleMainPhotoChange}
              required
              className="photo-select"
              disabled={!selectedFolder || currentFiles.length === 0}
            >
              <option value="">— Choose main photo —</option>
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
                alt="Preview"
                className="photo-preview"
                style={{ objectPosition: formData.mainPhotoPosition }}
              />
            )}
          </div>

          <div className="form-group">
            <label>Show more of the photo (crop focus):</label>
            <select
              name="mainPhotoPosition"
              value={formData.mainPhotoPosition}
              onChange={handleChange}
              className="photo-select"
            >
              <option value="center top">Top</option>
              <option value="center center">Center</option>
              <option value="center bottom">Bottom</option>
            </select>
            <p className="photo-hint">Choose which part of the image is visible when it’s cropped to fit.</p>
          </div>

          <div className="form-group">
            <label>What Was Done:</label>
            <textarea
              name="whatDone"
              value={formData.whatDone}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>What We Learned:</label>
            <textarea
              name="whatLearned"
              value={formData.whatLearned}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Additional Photos (gallery):</label>
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
            <p className="photo-hint">
              Hold Ctrl (Windows) or Cmd (Mac) to select multiple photos for the gallery.
            </p>
            {formData.photos.length > 0 && (
              <div className="photos-preview">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="photo-preview-item">
                    <img src={getProjectPhotoUrl(photo)} alt={`Preview ${index + 1}`} className="photo-preview-small" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save Project</button>
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm
