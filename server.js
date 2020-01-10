const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/subs', (req, res) => {
  res.send([
    {
      'id': 1,
      'subs': "hello"
    },
    {
      'id': 2,
      'subs': "My Name is"
    }

  ])
})

app.listen(port, () => { console.log(`listen on port ${port}`) })

