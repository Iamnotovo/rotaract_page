import React, { useState, useEffect } from 'react'
import { getMemberPhotoUrl } from '../utils/memberPhoto'
import './MemberForm.css'

const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : './'

function MemberForm({ member, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photo: ''
  })
  const [photoOptions, setPhotoOptions] = useState([])
  const [photoOptionsError, setPhotoOptionsError] = useState(null)

  useEffect(() => {
    fetch(`${BASE}members/member-photos.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Not found'))))
      .then((list) => setPhotoOptions(Array.isArray(list) ? list : []))
      .catch(() => setPhotoOptionsError('Run "npm run sync-members" so member photos are available.'))
  }, [])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const selectedPath = formData.photo

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
            <select
              name="photo"
              value={selectedPath}
              onChange={handleChange}
              required
              className="photo-select"
            >
              <option value="">— Choose a photo —</option>
              {photoOptions.map((filename) => (
                <option key={filename} value={`members/${filename}`}>
                  {filename}
                </option>
              ))}
            </select>
            {photoOptionsError && <p className="photo-options-error">{photoOptionsError}</p>}
            <p className="photo-hint">Photos are taken from the <code>members/</code> folder. Add new images there and run <code>npm run sync-members</code>.</p>
            {selectedPath && (
              <img src={getMemberPhotoUrl(selectedPath)} alt="Preview" className="photo-preview" />
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save Member</button>
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MemberForm
