import React, { useState, useEffect } from 'react'
import { getMemberPhotoUrl } from '../utils/memberPhoto'
import './MemberForm.css'

function MemberForm({ member, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photo: ''
  })
  const [photoLoading, setPhotoLoading] = useState(false)

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        role: member.role || '',
        photo: member.photo || ''
      })
    }
  }, [member])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhotoLoading(true)
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          photo: event.target.result
        }))
        setPhotoLoading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="form-modal">
      <div className="form-content">
        <h2>{member ? 'Edit Member' : 'Add New Member'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., President, Secretary, Member"
            />
          </div>

          <div className="form-group">
            <label>Photo:</label>
            <div className="photo-input-group">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileUpload}
              />
              <span className="input-or">OR</span>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                placeholder="URL or path (e.g. members/nico.jpg)"
                required
              />
            </div>
            <p className="photo-hint">
              For permanent storage: add the image to <code>public/members/</code> in your project, then enter <code>members/filename.jpg</code> here.
            </p>
            {formData.photo && (
              <img src={getMemberPhotoUrl(formData.photo)} alt="Preview" className="photo-preview" />
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={photoLoading}>
              {photoLoading ? 'Loading photo…' : 'Save Member'}
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MemberForm
