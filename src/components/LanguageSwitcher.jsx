import React, { useState, useEffect, useRef } from 'react'
import { SITE_LOCALES, useI18n } from '../i18n/LanguageContext'
import './LanguageSwitcher.css'

export default function LanguageSwitcher({ variant = 'header' }) {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!open || variant !== 'header') return
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [open, variant])

  const selectId = 'sidebar-locale-select'

  if (variant === 'sidebar') {
    return (
      <div className="lang-switcher-sidebar">
        <label className="lang-switcher-sidebar-label" htmlFor={selectId}>
          {t('langSwitcher.label')}
        </label>
        <select
          id={selectId}
          className="lang-switcher-select"
          value={locale}
          onChange={(e) => {
            const v = e.target.value
            if (SITE_LOCALES.includes(v)) setLocale(v)
          }}
        >
          {SITE_LOCALES.map((code) => (
            <option key={code} value={code}>
              {t(`langSwitcher.${code}`)}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="lang-switcher-wrap" ref={wrapRef}>
      <button
        type="button"
        className="lang-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('langSwitcher.label')}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
      >
        <span>{t(`langSwitcher.${locale}`)}</span>
        <span className={`lang-trigger-arrow ${open ? 'open' : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>
      {open && (
        <ul className="lang-dropdown-menu" role="listbox">
          {SITE_LOCALES.map((code) => (
            <li key={code} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={locale === code}
                className={locale === code ? 'active' : ''}
                lang={code}
                onClick={() => {
                  setLocale(code)
                  setOpen(false)
                }}
              >
                {t(`langSwitcher.${code}`)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
