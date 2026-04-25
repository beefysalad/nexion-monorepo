import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.join(__dirname, '..')
const sampleContentDir = path.join(projectRoot, '_sample_content')

const itemsToMove = [
  'apps/web/components/home',
  'apps/web/hooks/api',
  'apps/web/lib/api/health.ts',
]

const filesToReset = [
  {
    path: 'apps/web/app/page.tsx',
    content: `export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background p-6 text-center text-foreground">
      <h1 className="text-4xl font-semibold tracking-tight">Nexion Monorepo</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
        Start building by editing <code>apps/web/app/page.tsx</code>.
      </p>
    </main>
  )
}
`,
  },
]

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function moveToSampleContent(itemPath) {
  const sourcePath = path.join(projectRoot, itemPath)
  if (!fs.existsSync(sourcePath)) {
    console.log(`Skipped: ${itemPath} (not found)`)
    return
  }

  const destPath = path.join(sampleContentDir, itemPath)
  if (fs.existsSync(destPath)) {
    console.log(`Skipped: ${itemPath} (already exists in _sample_content)`)
    return
  }

  ensureDir(path.dirname(destPath))
  fs.renameSync(sourcePath, destPath)
  console.log(`Moved: ${itemPath}`)
}

function resetFile(file) {
  const sourcePath = path.join(projectRoot, file.path)
  if (!fs.existsSync(sourcePath)) {
    console.log(`Skipped: ${file.path} (not found)`)
    return
  }

  const destPath = path.join(sampleContentDir, file.path)
  if (!fs.existsSync(destPath)) {
    ensureDir(path.dirname(destPath))
    fs.copyFileSync(sourcePath, destPath)
  }

  fs.writeFileSync(sourcePath, file.content)
  console.log(`Reset: ${file.path}`)
}

ensureDir(sampleContentDir)

console.log('Moving frontend sample content to _sample_content directory...')
itemsToMove.forEach(moveToSampleContent)

console.log('Overwriting frontend sample pages with minimal boilerplate...')
filesToReset.forEach(resetFile)

console.log(
  'Cleanup complete. Run `npm run restore` to restore the previous frontend sample content.'
)
