import React, { useState, useEffect } from 'react'
import './LinkForm.css'

function LinkForm({ link, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: ''
  })

  useEffect(() => {
    if (link) {
      setFormData({
        title: link.title || '',
        url: link.url || '',
        description: link.description || ''
      })
    }
  }, [link])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="form-modal">
      <div className="form-content">
        <h2>{link ? 'Edit Link' : 'Add New Link'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>URL:</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Brief description of what this link is about"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save Link</button>
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LinkForm
