const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
  ? import.meta.env.BASE_URL
  : './'

/**
 * Load site data: tries public/site-data.json first; if missing or error, falls back to localStorage.
 * Returns { projects, members, directionSlots, usefulLinks }.
 */
export async function loadSiteData() {
  try {
    const url = `${BASE}site-data.json`
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      return {
        projects: Array.isArray(data.projects) ? data.projects : [],
        members: Array.isArray(data.members) ? data.members : [],
        directionSlots: Array.isArray(data.directionSlots) && data.directionSlots.length >= 5
          ? data.directionSlots.slice(0, 5)
          : [null, null, null, null, null],
        usefulLinks: Array.isArray(data.usefulLinks) ? data.usefulLinks : []
      }
    }
  } catch (_) {}
  return getFromLocalStorage()
}

function getFromLocalStorage() {
  const projects = JSON.parse(localStorage.getItem('projects') || '[]')
  const members = JSON.parse(localStorage.getItem('members') || '[]')
  const raw = JSON.parse(localStorage.getItem('directionSlots') || 'null')
  const directionSlots = Array.isArray(raw) && raw.length >= 5 ? raw.slice(0, 5) : [null, null, null, null, null]
  const usefulLinks = JSON.parse(localStorage.getItem('usefulLinks') || '[]')
  return { projects, members, directionSlots, usefulLinks }
}

/**
 * Export current site data as JSON (for saving to public/site-data.json in the repo).
 */
export function exportSiteData(data) {
  const payload = {
    projects: data.projects || [],
    members: data.members || [],
    directionSlots: data.directionSlots || [null, null, null, null, null],
    usefulLinks: data.usefulLinks || []
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'site-data.json'
  a.click()
  URL.revokeObjectURL(a.href)
}
