import React, { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useI18n } from '../i18n/LanguageContext'
import './Sidebar.css'

function Sidebar({ isOpen, onClose, currentSection, onNavigate, isAdminLoggedIn }) {
  const { t } = useI18n()
  const [clubDropdownOpen, setClubDropdownOpen] = useState(false)

  const handleNavClick = (section) => {
    onNavigate(section)
  }

  const handleLoginClick = () => {
    if (isAdminLoggedIn) {
      handleNavClick('admin-dashboard')
    } else {
      handleNavClick('admin-login')
    }
  }

  return (
    <>
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('home')
              }}
              className={currentSection === 'home' ? 'active' : ''}
            >
              {t('nav.home')}
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('projects')
              }}
              className={currentSection === 'projects' ? 'active' : ''}
            >
              {t('nav.projects')}
            </a>
          </li>
          <li className="dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              onClick={(e) => {
                e.preventDefault()
                setClubDropdownOpen(!clubDropdownOpen)
              }}
            >
              <span>{t('nav.theClub')}</span>
              <span className={`dropdown-arrow ${clubDropdownOpen ? 'open' : ''}`}>▼</span>
            </a>
            <ul className={`dropdown-menu ${clubDropdownOpen ? 'active' : ''}`}>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('about-us')
                  }}
                  className={currentSection === 'about-us' ? 'active' : ''}
                >
                  {t('nav.aboutUs')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('meetings')
                  }}
                  className={currentSection === 'meetings' ? 'active' : ''}
                >
                  {t('nav.meetings')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('useful-links')
                  }}
                  className={currentSection === 'useful-links' ? 'active' : ''}
                >
                  {t('nav.usefulLinks')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('members')
                  }}
                  className={currentSection === 'members' ? 'active' : ''}
                >
                  {t('nav.members')}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleLoginClick()
              }}
              className={currentSection === 'admin-login' || currentSection === 'admin-dashboard' ? 'active' : ''}
            >
              {isAdminLoggedIn ? t('nav.admin') : t('nav.login')}
            </a>
          </li>
          <li className="sidebar-lang-item">
            <LanguageSwitcher variant="sidebar" />
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Sidebar
