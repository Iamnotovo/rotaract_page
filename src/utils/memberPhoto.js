/**
 * Returns the URL to use for an asset (member photo, project photo, etc.).
 * - data: or http(s): URLs are used as-is.
 * - Otherwise treated as path under public (e.g. "members/nico.jpg", "projects/myproj/photo.jpg") and prefixed with base.
 */
export function getAssetUrl(photo) {
  if (!photo) return ''
  if (photo.startsWith('data:') || photo.startsWith('http://') || photo.startsWith('https://')) {
    return photo
  }
  const base = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL
    : './'
  const path = photo.startsWith('/') ? photo.slice(1) : photo
  return `${base}${path}`
}

export function getMemberPhotoUrl(photo) {
  return getAssetUrl(photo)
}

export function getProjectPhotoUrl(photo) {
  return getAssetUrl(photo)
}
