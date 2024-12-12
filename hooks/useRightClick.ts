import { useState, useEffect, MouseEvent } from 'react'
import {
  getHtmlElementSize,
  removeDivsWithClassName
} from '../helpers/domVanillaHandlers'
import { TABLE_DOM_ELEMENTS } from '../config/table'
import { POSITION_TYPES } from '../config/constants'
import type { MenuPosition } from '../types/menuPosition'

interface RightClickMenuProps {
  x: number
  y: number
  show: boolean
  position: MenuPosition
  clickedHref: string | null
}

const useRightClickMenu = () => {
  const [menuProps, setMenuProps] = useState<RightClickMenuProps>({
    x: 0,
    y: 0,
    show: false,
    position: POSITION_TYPES.RIGHT,
    clickedHref: null
  })

  const handleRightClick = (event: MouseEvent) => {
    removeDivsWithClassName(TABLE_DOM_ELEMENTS.RIGHT_CLICK_MENU)

    const target = event.target as HTMLElement
    let targetHref = ''

    if (target.tagName === 'SPAN' && target.dataset.href) {
      targetHref = target.dataset.href
    } else if (target.tagName === 'A') {
      targetHref = (target as HTMLAnchorElement).href
    }

    const divContainer = getHtmlElementSize(TABLE_DOM_ELEMENTS.TABLE_CONTAINER)
    if (!divContainer) return

    if (event.button === 2) {
      event.preventDefault()

      const x = event.clientX - divContainer.left
      const y = event.clientY - divContainer.top
      const thresholdX = 150
      const thresholdY = 100

      const isNearRightEdge = divContainer.width - x < thresholdX
      const isNearBottomEdge = divContainer.height - y < thresholdY

      let position: MenuPosition = POSITION_TYPES.BOTTOM
      if (isNearRightEdge) position = POSITION_TYPES.LEFT
      if (isNearBottomEdge) position = POSITION_TYPES.TOP
      if (!isNearRightEdge && !isNearBottomEdge) { position = POSITION_TYPES.BOTTOM }

      setMenuProps({
        x: event.clientX,
        y: event.clientY,
        show: true,
        position,
        clickedHref: targetHref.split('/').pop() || null
      })
    }
  }

  const handleClickOutside = () => {
    setMenuProps((prevState) => ({
      ...prevState,
      show: false,
      clickedHref: null
    }))
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return { menuProps, handleRightClick, handleClickOutside }
}

export default useRightClickMenu
