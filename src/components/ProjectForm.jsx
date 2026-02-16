import React, { useState, useEffect } from 'react'
import './ProjectForm.css'

function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mainPhoto: '',
    whatDone: '',
    whatLearned: '',
    photos: []
  })

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        mainPhoto: project.mainPhoto || '',
        whatDone: project.whatDone || '',
        whatLearned: project.whatLearned || '',
        photos: project.photos || []
      })
    }
  }, [project])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData({
          ...formData,
          [field]: event.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMultipleFiles = (e) => {
    const files = Array.from(e.target.files)
    const readers = []
    
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        readers.push(event.target.result)
        if (readers.length === files.length) {
          setFormData({
            ...formData,
            photos: [...formData.photos, ...readers]
          })
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handlePhotosTextChange = (e) => {
    const urls = e.target.value.split('\n').filter(url => url.trim())
    setFormData({
      ...formData,
      photos: urls
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

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
            <label>Main Photo:</label>
            <div className="photo-input-group">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => handleFileUpload(e, 'mainPhoto')}
              />
              <span className="input-or">OR</span>
              <input
                type="url"
                name="mainPhoto"
                value={formData.mainPhoto}
                onChange={handleChange}
                placeholder="Enter photo URL (optional)"
              />
            </div>
            {formData.mainPhoto && (
              <img src={formData.mainPhoto} alt="Preview" className="photo-preview" />
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
            <label>Additional Photos:</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              multiple
              onChange={handleMultipleFiles}
            />
            <span className="input-or">OR</span>
            <textarea
              value={formData.photos.join('\n')}
              onChange={handlePhotosTextChange}
              rows="4"
              placeholder="Enter one photo URL per line"
            />
            {formData.photos.length > 0 && (
              <div className="photos-preview">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="photo-preview-item">
                    <img src={photo} alt={`Preview ${index + 1}`} className="photo-preview-small" />
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
