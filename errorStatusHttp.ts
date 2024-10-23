 if (!response.ok) {
      let errorMessage: string

      // Custom error messages for specific HTTP status codes
      switch (response.status) {
        case 400:
          errorMessage = 'Bad Request: Please check the data you provided.'
          break
        case 401:
          errorMessage = 'Unauthorized: Invalid or missing token.'
          break
        case 404:
          errorMessage = 'Not Found: The requested resource was not found.'
          break
        case 500:
          errorMessage = 'Server Error: Something went wrong on the server.'
          break
        default:
          errorMessage = `Unexpected Error: ${response.statusText}`
      }

      // Optionally, get the response body for more details
      const errorText = await response.text()
      errorMessage += errorText ? ` - Details: ${errorText}` : ''

      throw new Error(errorMessage)
    }
