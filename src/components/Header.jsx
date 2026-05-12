import React, { useState, useEffect, useRef } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useI18n } from '../i18n/LanguageContext'
import './Header.css'

function Header({ onMenuClick, currentSection, onNavigate, isAdminLoggedIn }) {
  const { t } = useI18n()
  const base = import.meta.env.BASE_URL
  const [clubOpen, setClubOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setClubOpen(false)
      }
    }
    if (clubOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [clubOpen])

  const handleNav = (section) => {
    onNavigate(section)
    setClubOpen(false)
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img src={`${base}logo.png`} alt={t('meta.logoAlt')} className="logo" />
      </div>
      <nav className="nav-bar">
        <div className="nav-links">
          <button
            className="nav-link nav-link-ghost"
            onClick={() => handleNav(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
          >
            {isAdminLoggedIn ? t('nav.admin') : t('nav.login')}
          </button>
          <div className="nav-links-main">
            <button
              className={`nav-link ${currentSection === 'home' ? 'active' : ''}`}
              onClick={() => handleNav('home')}
            >
              {t('nav.home')}
            </button>
            <button
              className={`nav-link ${currentSection === 'projects' ? 'active' : ''}`}
              onClick={() => handleNav('projects')}
            >
              {t('nav.projects')}
            </button>
            <div className="nav-dropdown" ref={dropdownRef}>
              <button
                className={`nav-link ${['about-us', 'meetings', 'useful-links', 'members'].includes(currentSection) ? 'active' : ''}`}
                onClick={() => setClubOpen(!clubOpen)}
                aria-expanded={clubOpen}
              >
                {t('nav.theClub')}
                <span className={`nav-arrow ${clubOpen ? 'open' : ''}`}>▼</span>
              </button>
              {clubOpen && (
                <div className="nav-dropdown-menu">
                  <button onClick={() => handleNav('about-us')}>{t('nav.aboutUs')}</button>
                  <button onClick={() => handleNav('meetings')}>{t('nav.meetings')}</button>
                  <button onClick={() => handleNav('useful-links')}>{t('nav.usefulLinks')}</button>
                  <button onClick={() => handleNav('members')}>{t('nav.members')}</button>
                </div>
              )}
            </div>
          </div>
          <div className="nav-links-trailing">
            <LanguageSwitcher variant="header" />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
