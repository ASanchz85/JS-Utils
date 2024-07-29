import { useState, useEffect } from 'react'

interface FetchDataResponse<T> {
  data: T | null
  error: string | null
  isLoading: boolean
}

function useFetch<T> (fetchFunction: () => Promise<T>): FetchDataResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetchFunction()
        setData(response)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData().catch((error) => {
      console.error('Error during fetch operation:', error)
    })
  }, [fetchFunction])

  return { data, isLoading, error }
}

export default useFetch
