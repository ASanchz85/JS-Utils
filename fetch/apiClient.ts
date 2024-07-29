const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || ''

const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${apiBaseUrl}${endpoint}`

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  const response = await fetch(url, defaultOptions)

  if (!response.ok) {
    const error: unknown = await response.json()
    throw new Error(
      (error as Error).message || 'An error occurred while fetching data'
    )
  }

  return response.json()
}

export default apiClient
