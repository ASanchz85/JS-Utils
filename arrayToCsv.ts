export default function arrayToCsv(array: any[], filename: string) {
  const headerRow = Object.keys(array[0]).join(',') + ('\n')
  const csv = array.map((row) => Object.values(row).join(',')).join('\n')
  const csvWithHeader = headerRow + csv
  const blob = new Blob([csvWithHeader], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
