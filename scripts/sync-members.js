import { copyFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const ROOT = join(process.cwd(), 'members')
const OUT = join(process.cwd(), 'public', 'members')
const EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp'])

function isImage(name) {
  return EXT.has(name.slice(name.lastIndexOf('.')).toLowerCase())
}

mkdirSync(OUT, { recursive: true })

// Copy from root members/ into public/members/ (don’t remove existing files in public/members/)
if (existsSync(ROOT)) {
  const fromRoot = readdirSync(ROOT).filter((f) => isImage(f))
  for (const f of fromRoot) {
    copyFileSync(join(ROOT, f), join(OUT, f))
  }
}

// Manifest = all image files now in public/members/ (so manual adds there are kept)
const allImages = readdirSync(OUT).filter((f) => isImage(f) && f !== 'member-photos.json')
writeFileSync(join(OUT, 'member-photos.json'), JSON.stringify([...new Set(allImages)].sort(), null, 2))
console.log('Synced', allImages.length, 'member photos to public/members/')
