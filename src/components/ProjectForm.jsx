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
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        mainPhoto: project.mainPhoto || '',
        mainPhotoPosition: project.mainPhotoPosition || 'center center',
        whatDone: project.whatDone || '',
        whatLearned: project.whatLearned || '',
        photos: project.photos || []
      })
      const candidatePath =
        project.mainPhoto ||
        (Array.isArray(project.photos) && project.photos.length > 0 ? project.photos[0] : '')
      const fromExisting = extractFolderFromPath(candidatePath)
      if (fromExisting) {
        setSelectedFolder(fromExisting)
      }
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

  useEffect(() => {
    fetch(`${BASE}projects/projects-photos.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Not found'))))
      .then((list) => {
        if (Array.isArray(list)) {
          setProjectFolders(list)
          if (!selectedFolder && list.length > 0) {
            setSelectedFolder(list[0].project)
          }
        }
      })
      .catch(() => {
        setProjectFolders([])
      })
  }, [selectedFolder])

  const extractFolderFromPath = (path) => {
    if (!path) return ''
    const parts = path.split('/')
    const idx = parts.indexOf('projects')
    if (idx !== -1 && parts.length > idx + 1) {
      return parts[idx + 1]
    }
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

  const handleMainPhotoPositionChange = (e) => {
    const value = Number(e.target.value)
    const clamped = Number.isNaN(value) ? 50 : Math.min(100, Math.max(0, value))
    setFormData((prev) => ({
      ...prev,
      mainPhotoPosition: `50% ${clamped}%`
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
              <>
                <img
                  src={getProjectPhotoUrl(formData.mainPhoto)}
                  alt="Preview"
                  className="photo-preview"
                  style={{ objectPosition: formData.mainPhotoPosition }}
                />
                <label className="photo-focus-label">
                  Adjust how the main photo is cropped:
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue={50}
                    onChange={handleMainPhotoPositionChange}
                  />
                  <div className="photo-focus-scale">
                    <span>Show more top</span>
                    <span>Center</span>
                    <span>Show more bottom</span>
                  </div>
                </label>
              </>
            )}
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
