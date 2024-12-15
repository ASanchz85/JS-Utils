// noSQL injection prevention -> { "$ne": null }

app.post('/api/user', (req, res) => {
  if (typeof req.body.email !== 'string') {
    res.status(400).send({ error: 'Invalid request' })
  }

  db.collection('users').find({ email: req.body.email }, (err, result) => {
    if (err) {
      res.status(500).send({ error: 'An error has occurred' })
    } else {
      res.status(200).send(result)
    }
  })
})
