import React from 'react'
import './Header.css'

function Header({ onMenuClick }) {
  const base = import.meta.env.BASE_URL
  return (
    <header className="header">
      <div className="logo-container">
        <img src={`${base}logo.png`} alt="Rotaract Club de Barcelona Diagonal Logo" className="logo" />
      </div>
      <div className="nav-bar">
        <button className="menu-toggle" onClick={onMenuClick} aria-label="Toggle menu">
          <img src={`${base}burguer_menu.svg`} alt="Open navigation menu" className="menu-icon" />
        </button>
      </div>
    </header>
  )
}

export default Header
