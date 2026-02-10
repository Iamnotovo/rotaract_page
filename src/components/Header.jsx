import React, { useState, useEffect, useRef } from 'react'
import './Header.css'

function Header({ onMenuClick, currentSection, onNavigate, isAdminLoggedIn }) {
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
        <img src={`${base}logo.png`} alt="Rotaract Club de Barcelona Diagonal Logo" className="logo" />
      </div>
      <nav className="nav-bar">
        <div className="nav-links">
          <button
            className={`nav-link ${currentSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentSection === 'projects' ? 'active' : ''}`}
            onClick={() => handleNav('projects')}
          >
            Projects
          </button>
          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              className={`nav-link ${['about-us', 'meetings', 'useful-links', 'members'].includes(currentSection) ? 'active' : ''}`}
              onClick={() => setClubOpen(!clubOpen)}
              aria-expanded={clubOpen}
            >
              The Club
              <span className={`nav-arrow ${clubOpen ? 'open' : ''}`}>▼</span>
            </button>
            {clubOpen && (
              <div className="nav-dropdown-menu">
                <button onClick={() => handleNav('about-us')}>About Us</button>
                <button onClick={() => handleNav('meetings')}>Meetings</button>
                <button onClick={() => handleNav('useful-links')}>Useful Links</button>
                <button onClick={() => handleNav('members')}>Members</button>
              </div>
            )}
          </div>
          <button
            className={`nav-link ${currentSection === 'admin-login' || currentSection === 'admin-dashboard' ? 'active' : ''}`}
            onClick={() => handleNav(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login')}
          >
            {isAdminLoggedIn ? 'Admin' : 'Login'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
