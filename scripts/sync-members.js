import { cpSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const ROOT = join(process.cwd(), 'members')
const OUT = join(process.cwd(), 'public', 'members')
const EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp'])

if (!existsSync(ROOT)) {
  console.log('No members/ folder found, skipping sync.')
  process.exit(0)
}

mkdirSync(OUT, { recursive: true })
const files = readdirSync(ROOT).filter((f) => EXT.has(f.slice(f.lastIndexOf('.')).toLowerCase()))
cpSync(ROOT, OUT, { recursive: true })
writeFileSync(join(OUT, 'member-photos.json'), JSON.stringify(files.sort(), null, 2))
console.log('Synced', files.length, 'member photos to public/members/')
