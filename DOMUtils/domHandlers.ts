export const removeDivsWithClassName = (className: string) => {
  const elements = document.querySelectorAll<HTMLDivElement>(className)
  if (!elements || elements.length === 0) {
    console.warn('Element to remove not found.')
    return
  }

  elements.forEach((element) => (element.style.display = 'none'))
}

export const getHtmlElementSize = (className: string) => {
  const element = document.querySelector<HTMLDivElement>(className)

  if (!element) {
    console.warn('Table container not found.')
    return
  }

  return element.getBoundingClientRect()
}
