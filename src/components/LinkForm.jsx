import React, { useState, useEffect } from 'react'
import { useI18n } from '../i18n/LanguageContext'
import './LinkForm.css'

function LinkForm({ link, onSave, onCancel }) {
  const { t } = useI18n()
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
        <h2>{link ? t('linkForm.editTitle') : t('linkForm.addTitle')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('linkForm.labelTitle')}:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('linkForm.labelUrl')}:</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder={t('linkForm.urlPlaceholder')}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('linkForm.labelDescription')}:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder={t('linkForm.descriptionPlaceholder')}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">{t('linkForm.save')}</button>
            <button type="button" onClick={onCancel} className="cancel-btn">{t('linkForm.cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LinkForm
