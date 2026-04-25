import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.join(__dirname, '..')
const sampleContentDir = path.join(projectRoot, '_sample_content')

const itemsToRestore = [
  'apps/web/components/home',
  'apps/web/hooks/api',
  'apps/web/lib/api/health.ts',
  'apps/web/app/page.tsx',
]

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function restoreItem(itemPath) {
  const sourcePath = path.join(sampleContentDir, itemPath)
  if (!fs.existsSync(sourcePath)) {
    console.log(`Skipped: ${itemPath} (not found in _sample_content)`)
    return
  }

  const destPath = path.join(projectRoot, itemPath)
  ensureDir(path.dirname(destPath))

  if (fs.existsSync(destPath)) {
    fs.rmSync(destPath, { recursive: true, force: true })
  }

  fs.renameSync(sourcePath, destPath)
  console.log(`Restored: ${itemPath}`)
}

function cleanEmptyFoldersRecursively(folder) {
  if (!fs.existsSync(folder)) return

  for (const entry of fs.readdirSync(folder)) {
    const fullPath = path.join(folder, entry)
    if (fs.statSync(fullPath).isDirectory()) {
      cleanEmptyFoldersRecursively(fullPath)
    }
  }

  if (fs.readdirSync(folder).length === 0) {
    fs.rmdirSync(folder)
  }
}

if (!fs.existsSync(sampleContentDir)) {
  console.log('No _sample_content directory found. Nothing to restore.')
  process.exit(0)
}

console.log('Restoring frontend sample content from _sample_content directory...')
itemsToRestore.forEach(restoreItem)
cleanEmptyFoldersRecursively(sampleContentDir)

if (!fs.existsSync(sampleContentDir)) {
  console.log('Removed empty _sample_content directory.')
}

console.log('Restore complete.')
