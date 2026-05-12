import React, { useState } from 'react'
import { verifyPassword, getAdminUsername } from '../utils/auth'
import { useI18n } from '../i18n/LanguageContext'
import './AdminLogin.css'

function AdminLogin({ onLogin, navigateTo }) {
  const { t } = useI18n()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const passwordValid = await verifyPassword(password)
      if (username === getAdminUsername() && passwordValid) {
        onLogin()
        navigateTo('admin-dashboard')
      } else {
        setError(t('loginPage.invalidCredentials'))
      }
    } catch {
      setError(t('loginPage.genericError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{t('loginPage.title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder={t('loginPage.usernamePlaceholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder={t('loginPage.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? t('loginPage.checking') : t('loginPage.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
