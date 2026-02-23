/**
 * Returns the URL to use for a member photo.
 * - data: or http(s): URLs are used as-is.
 * - Otherwise treated as path under public (e.g. "members/nico.jpg") and prefixed with base.
 */
export function getMemberPhotoUrl(photo) {
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
