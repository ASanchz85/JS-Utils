import { useState, useEffect, useCallback } from 'react'

const DEBOUNCE_DELAY = 300

const useDebouncedSearch = (
  fetchResults: (query: string) => Promise<any[]>,
  initialQuery: string = ''
) => {
  const [query, setQuery] = useState<string>(initialQuery)
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const debounce = (func: Function, delay: number) => {
    let timerId: NodeJS.Timeout
    return (...args: any[]) => {
      if (timerId) {
        clearTimeout(timerId)
      }
      timerId = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const debouncedFetchResults = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.trim() === '') {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const data = await fetchResults(searchQuery)
        setResults(data)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setIsLoading(false)
      }
    }, DEBOUNCE_DELAY),
    [fetchResults]
  )

  useEffect(() => {
    debouncedFetchResults(query)
  }, [query])

  return {
    query,
    setQuery,
    results,
    isLoading
  }
}

export default useDebouncedSearch
