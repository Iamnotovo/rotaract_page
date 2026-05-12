import React, { useState, useEffect, useMemo } from 'react'
import { loadSiteData } from '../utils/siteData'
import { useI18n } from '../i18n/LanguageContext'
import { getLocalizedUsefulLink } from '../i18n/localizedSite'
import './UsefulLinks.css'

function UsefulLinks() {
  const { locale, t } = useI18n()
  const [links, setLinks] = useState([])

  useEffect(() => {
    let cancelled = false
    loadSiteData().then((data) => {
      if (!cancelled && data.usefulLinks) setLinks(data.usefulLinks)
    })
    return () => { cancelled = true }
  }, [])

  const displayLinks = useMemo(
    () => links.map((link) => getLocalizedUsefulLink(link, locale)),
    [links, locale]
  )

  return (
    <div className="page">
      <h1 className="page-title">{t('linksPage.pageTitle')}</h1>
      <div className="links-content">
        {links.length === 0 ? (
          <p>{t('linksPage.empty')}</p>
        ) : (
          <div className="links-list">
            {displayLinks.map((link, index) => {
              const isMailto = typeof link.url === 'string' && link.url.trim().toLowerCase().startsWith('mailto:')
              return (
              <div key={`${link.url}-${index}`} className="link-item">
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
