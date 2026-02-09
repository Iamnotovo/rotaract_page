import React, { useState, useEffect } from 'react'
import './UsefulLinks.css'

function UsefulLinks() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('usefulLinks')
    if (saved) {
      setLinks(JSON.parse(saved))
    }
  }, [])

  return (
    <div className="page">
      <h1 className="page-title">Useful Links</h1>
      <div className="links-content">
        {links.length === 0 ? (
          <p>No links available yet.</p>
        ) : (
          <div className="links-list">
            {links.map((link, index) => (
              <div key={index} className="link-item">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-title">
                  {link.title}
                </a>
                {link.description && <p className="link-description">{link.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UsefulLinks
