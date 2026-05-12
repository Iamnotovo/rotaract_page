/** Overlays fetched site-data fields with Catalan/Spanish copy from locale bundles. English uses JSON as-is. */
import { peekMessages } from './LanguageContext'

const ROLE_FALLBACK_KEYS = [
  ['Vice President', 'vicePresident'],
  ['President', 'president'],
  ['Treasurer', 'treasurer'],
  ['Secretary', 'secretary'],
  ['Member', 'member'],
  ['Social Networks Manager', 'socialNetworksManager'],
]

function roleKeyFromEnglish(role) {
  if (!role || typeof role !== 'string') return null
  const trimmed = role.trim()
  const direct = ROLE_FALLBACK_KEYS.find(([en]) => en === trimmed)
  if (direct) return direct[1]
  return null
}

export function translateMemberRole(role, locale) {
  if (!role || locale === 'en') return role
  const msgs = peekMessages(locale)
  const slug = roleKeyFromEnglish(role)
  if (!slug) return role
  const table = msgs?.memberRoles
  const translated = table?.[slug]
  return typeof translated === 'string' ? translated : role
}

export function getLocalizedUsefulLink(link, locale) {
  if (!link || locale === 'en') return link
  const key = link.i18nKey
  if (!key) return link
  const msgs = peekMessages(locale)
  const overlay = msgs?.siteLinks?.[key]
  if (!overlay) return link
  return {
    ...link,
    title: overlay.title ?? link.title,
    description: overlay.description ?? link.description,
  }
}

export function getLocalizedProject(project, locale) {
  if (!project || locale === 'en') return project
  const key = project.i18nKey
  if (!key) return project
  const msgs = peekMessages(locale)
  const overlay = msgs?.siteProjects?.[key]
  if (!overlay) return project
  return {
    ...project,
    title: overlay.title ?? project.title,
    description: overlay.description ?? project.description,
    whatDone: overlay.whatDone ?? project.whatDone,
    whatLearned: overlay.whatLearned ?? project.whatLearned,
  }
}
