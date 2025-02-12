const fs = require('fs')
const path = require('path')

const directoryToScan = path.join(__dirname, 'src')

function findCSSFiles(dir) {
  let cssFiles = []
  const files = fs.readdirSync(dir, { withFileTypes: true })

  files.forEach((file) => {
    const filePath = path.join(dir, file.name)

    if (file.isDirectory()) {
      cssFiles = cssFiles.concat(findCSSFiles(filePath))
    } else if (
      file.isFile() &&
      file.name.endsWith('.css') &&
      file.name !== 'global.css'
    ) {
      cssFiles.push(filePath)
    }
  })

  return cssFiles
}

function detectComments(file) {
  const content = fs.readFileSync(file, 'utf8')
  const commentRegex = /\/\*[\s\S]*?\*\//g

  const matches = content.match(commentRegex)
  if (matches) {
    console.log(`\nComments found in: ${file}`)
    matches.forEach((comment, index) => {
      console.log(`  Comment ${index + 1}: ${comment.trim()}`)
    })
    return matches.length
  }
  return 0
}

const cssFiles = findCSSFiles(directoryToScan)
let totalCommentsFound = 0

if (cssFiles.length === 0) {
  console.log('No CSS files found.')
} else {
  cssFiles.forEach((file) => {
    totalCommentsFound += detectComments(file)
  })
}

if (totalCommentsFound > 0) {
  console.error(
    `\nTotal CSS comments detected: ${totalCommentsFound}. Test failed.`
  )
  process.exit(1)
} else {
  console.log('\nNo CSS comments found.')
}
