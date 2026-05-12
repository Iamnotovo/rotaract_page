import fallbackSiteData from './site-data.json'

function siteDataUrl() {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}site-data.json`
}

/** Loads club content from public/site-data.json; falls back to bundled JSON if fetch fails. */
export async function loadSiteData() {
  try {
    const res = await fetch(siteDataUrl())
    if (!res.ok) throw new Error(`site-data.json ${res.status}`)
    return await res.json()
  } catch {
    return { ...fallbackSiteData }
  }
}

export function exportSiteData(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'site-data.json'
  a.click()
  URL.revokeObjectURL(url)
}
