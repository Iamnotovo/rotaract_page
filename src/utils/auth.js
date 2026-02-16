// SHA-256 hash of the admin password (admin12345). Passwords are never stored in plain text.
const STORED_PASSWORD_HASH = '41e5653fc7aeb894026d6bb7b2db7f65902b454945fa8fd65a6327047b5277fb'

const ADMIN_USERNAME = 'nico'

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password) {
  const hash = await sha256(password)
  return hash === STORED_PASSWORD_HASH
}

export function getAdminUsername() {
  return ADMIN_USERNAME
}
