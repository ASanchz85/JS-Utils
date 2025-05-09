const fs = require('fs')
const path = require('path')

const SRC_DIR = path.resolve(__dirname, 'src')

function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      getAllFiles(fullPath, files)
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

function fixImportsInFile(filePath) {
  const relDir = path.relative(SRC_DIR, path.dirname(filePath))
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const newContent = fileContent.replace(
    /from ['"](\.{1,}\/[^'"]+)['"]/g,
    (match, relImport) => {
      const absPath = path.resolve(path.dirname(filePath), relImport)

      if (!absPath.startsWith(SRC_DIR)) return match

      const importFromSrc = path.relative(SRC_DIR, absPath).replace(/\\/g, '/')
      return `from '${importFromSrc}'`
      // return `from '${
      //   importFromSrc.startsWith('.') ? importFromSrc : '@/' + importFromSrc
      // }'`
    }
  )

  if (newContent !== fileContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8')
    console.log(`✔ Updated imports in ${path.relative(SRC_DIR, filePath)}`)
  }
}

function main() {
  const files = getAllFiles(SRC_DIR)
  files.forEach(fixImportsInFile)

  console.log('\n[!] All relative imports converted.')
}

main()
