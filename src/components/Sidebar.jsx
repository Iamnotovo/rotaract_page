import React, { useState } from 'react'
import './Sidebar.css'

function Sidebar({ isOpen, onClose, currentSection, onNavigate, isAdminLoggedIn }) {
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
              Home
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
              Projects
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
              <span>The Club</span>
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
                  About Us
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
                  Meetings
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
                  Useful Links
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
                  Members
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
              {isAdminLoggedIn ? 'Admin' : 'Login'}
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Sidebar
