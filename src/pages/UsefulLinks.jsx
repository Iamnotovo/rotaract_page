import React, { useState, useEffect } from 'react'
import { loadSiteData } from '../utils/siteData'
import './UsefulLinks.css'

function UsefulLinks() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    let cancelled = false
    loadSiteData().then((data) => {
      if (!cancelled && data.usefulLinks) setLinks(data.usefulLinks)
    })
    return () => { cancelled = true }
  }, [])

  return (
    <div className="page">
      <h1 className="page-title">Useful Links</h1>
      <div className="links-content">
        {links.length === 0 ? (
          <p>No links available yet.</p>
        ) : (
          <div className="links-list">
            {links.map((link, index) => {
              const isMailto = typeof link.url === 'string' && link.url.trim().toLowerCase().startsWith('mailto:')
              return (
              <div key={index} className="link-item">
                <a
                  href={link.url}
                  className="link-title"
                  {...(isMailto
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {link.title}
                </a>
                {link.description?.trim() ? (
                  <p className="link-description">{link.description.trim()}</p>
                ) : null}
              </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default UsefulLinks
