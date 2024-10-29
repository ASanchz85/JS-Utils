import Pako from 'pako'

const GZIP_HTTP_HEADERS = {
  'Content-Encoding': 'gzip',
  'Accept-Encoding': 'gzip'
}

// compressed
const jsonPayload = JSON.stringify(payload)
const compressedPayload = Pako.gzip(jsonPayload)

// uncompressed and check integrity

try {
    const decompressedData = Pako.ungzip(compressedPayload, { to: 'string' })
    const originalPayload = JSON.parse(decompressedData)

    console.log('Decompressed data:', originalPayload)

    if (JSON.stringify(originalPayload) === JSON.stringify(payload)) {
      console.log('Integrity check passed! Data matches the original payload.')
    } else {
      console.log(
        'Integrity check failed! Data does not match the original payload.'
      )
    }
  } catch (error) {
    console.error('Decompression failed:', error)
  }

// example of use
  try {
    const response = await fetch(`${endpointURL}/export?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...GZIP_HTTP_HEADERS,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(compressedPayload)
    })

    if (!response.ok) {
      const errorResponse = (await response.json()) as RequestErrorResponse
      throw new Error(errorResponse.detail || 'Network response was not ok')
    }

    const data = (await response.json()) as ResponseItem

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error export data data: ${error.message}`)
    } else {
      throw new Error('Unknown error occurred')
    }
  }
}
