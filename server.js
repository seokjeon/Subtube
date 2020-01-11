const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/translate/:url', (req, res) => {
    res.send("HEYYY I am REACT!!")
})

app.listen(port, () => { console.log(`listen on port ${port}`) })

