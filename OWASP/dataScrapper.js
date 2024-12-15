// Server Side Request Forgery (SSRF)

app.get('/api/data', async (req, res) => {
  const allowedUrls = ['https://example.com']
  const url = req.query.url
  try {
    if (!allowedUrls.includes(url)) {
      throw new Error('Invalid URL')
    }

    const response = await fetch(url)
    const data = await response.json()

    res.status(200).json({ data })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
})
