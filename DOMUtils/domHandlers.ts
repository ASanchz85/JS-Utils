export const removeDivsWithClassName = (className: string) => {
  const elements = document.querySelectorAll<HTMLDivElement>(className)
  if (!elements || elements.length === 0) {
    console.warn('Element to remove not found or already unmounted.')
    return
  }

  elements.forEach((element) => {
    try {
      if (element.parentNode) {
        element.parentNode.removeChild(element)
      }
    } catch (error) {
      console.warn('Element parent not found. Skipping removal.')
    }
  })
}

export const toggleVisibility = (className: string) => {
  const elements = document.querySelectorAll<HTMLDivElement>(className)
  if (!elements || elements.length === 0) {
    return
  }

  elements.forEach((element) => {
    element.classList.add('hidden')
  })
}

export const getHtmlElementSize = (className: string) => {
  const element = document.querySelector<HTMLDivElement>(className)

  if (!element) {
    console.warn('Table container not found.')
    return
  }

  return element.getBoundingClientRect()
}

export const removeClass = (className: string, classToRemove: string) => {
  const elements = document.querySelectorAll<HTMLDivElement>(className)
  if (!elements || elements.length === 0) {
    return
  }

  elements.forEach((element) => {
    element.classList.remove(classToRemove)
  })
}
