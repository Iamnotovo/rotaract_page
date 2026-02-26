import { cpSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const ROOT = join(process.cwd(), 'projects')
const OUT = join(process.cwd(), 'public', 'projects')
const EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp'])

if (!existsSync(ROOT)) {
  console.log('No projects/ folder found, skipping sync.')
  process.exit(0)
}

mkdirSync(OUT, { recursive: true })
const dirs = readdirSync(ROOT, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
const manifest = []

for (const dir of dirs) {
  const srcDir = join(ROOT, dir)
  const destDir = join(OUT, dir)
  mkdirSync(destDir, { recursive: true })
  cpSync(srcDir, destDir, { recursive: true })
  const files = readdirSync(srcDir).filter((f) => EXT.has(f.slice(f.lastIndexOf('.')).toLowerCase()))
  manifest.push({ project: dir, path: `projects/${dir}`, files: files.sort() })
}

writeFileSync(join(OUT, 'projects-photos.json'), JSON.stringify(manifest, null, 2))
console.log('Synced', manifest.length, 'project folders to public/projects/')
