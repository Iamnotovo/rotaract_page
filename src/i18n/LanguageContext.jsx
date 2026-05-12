import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './messages/en.json'
import esUi from './messages/es-ui.json'
import siteEs from './messages/site-es.json'
import caUi from './messages/ca-ui.json'
import siteCa from './messages/site-ca.json'

export const SITE_LOCALES = ['en', 'es', 'ca']

const STORAGE_KEY = 'rotaract_site_locale'
const TABLES = {
  en,
  es: { ...esUi, ...siteEs },
  ca: { ...caUi, ...siteCa },
}

function resolvePath(table, path) {
  const parts = path.split('.')
  let cur = table
  for (const p of parts) {
    cur = cur?.[p]
    if (cur === undefined) return undefined
  }
  return cur
}

function interpolate(str, vars) {
  if (typeof str !== 'string' || !vars) return str
  return Object.keys(vars).reduce((s, key) => s.replaceAll(`{{${key}}}`, String(vars[key])), str)
}

function LanguageProviderImpl({ children }) {
  const [locale, setLocaleState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && SITE_LOCALES.includes(stored)) return stored
    } catch {
      /* ignore */
    }
    const nav = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2)?.toLowerCase() : ''
    if (nav === 'ca') return 'ca'
    if (nav === 'es') return 'es'
    return 'en'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = locale === 'ca' ? 'ca' : locale === 'es' ? 'es' : 'en'
    document.documentElement.setAttribute('data-locale', locale)
  }, [locale])

  const setLocale = useCallback((next) => {
    if (SITE_LOCALES.includes(next)) setLocaleState(next)
  }, [])

  const t = useCallback(
    (path, vars) => {
      const table = TABLES[locale] || TABLES.en
      let value = resolvePath(table, path)
      if (value === undefined) value = resolvePath(TABLES.en, path)
      if (typeof value !== 'string') return path
      return interpolate(value, vars)
    },
    [locale]
  )

  const messages = TABLES[locale] || TABLES.en
  const value = useMemo(
    () => ({ locale, setLocale, t, messages }),
    [locale, setLocale, t, messages]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  return <LanguageProviderImpl>{children}</LanguageProviderImpl>
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}

export function peekMessages(locale) {
  return TABLES[locale] || TABLES.en
}
