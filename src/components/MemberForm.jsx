import React, { useState, useEffect } from 'react'
import { getMemberPhotoUrl } from '../utils/memberPhoto'
import { useI18n } from '../i18n/LanguageContext'
import './MemberForm.css'

const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : './'

function MemberForm({ member, onSave, onCancel }) {
  const { t } = useI18n()
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
      .catch(() => setPhotoOptionsError(t('memberForm.syncErrorHint')))
  }, [t])

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
        <h2>{member ? t('memberForm.editTitle') : t('memberForm.addTitle')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('memberForm.labelName')}:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('memberForm.labelRole')}:</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder={t('memberForm.rolePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label>{t('memberForm.labelPhoto')}:</label>
            <select
              name="photo"
              value={selectedPath}
              onChange={handleChange}
              required
              className="photo-select"
            >
              <option value="">{t('memberForm.photoPlaceholder')}</option>
              {photoOptions.map((filename) => (
                <option key={filename} value={`members/${filename}`}>
                  {filename}
                </option>
              ))}
            </select>
            {photoOptionsError && <p className="photo-options-error">{photoOptionsError}</p>}
            <p className="photo-hint">
              {t('memberForm.photosHintBefore')}<code>{t('memberForm.photosHintCodeFolder')}</code>{t('memberForm.photosHintMid')}<code>{t('memberForm.photosHintCodeCmd')}</code>{t('memberForm.photosHintAfter')}
            </p>
            {selectedPath && (
              <img src={getMemberPhotoUrl(selectedPath)} alt="" className="photo-preview" />
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">{t('memberForm.save')}</button>
            <button type="button" onClick={onCancel} className="cancel-btn">{t('memberForm.cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MemberForm
