import { useCallback, useRef } from 'react'

const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        func(...args)
      }, delay)
    },
    [func, delay]
  )

  return debouncedFunction
}

export default useDebounce


// calling the debounce function

 const debouncedHandleChangeSearch = useDebounce(
    handleChangeSearch,
    DEBOUNCE_DELAY
  )
