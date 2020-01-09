const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.get('/api/customers', (req, res)=>{
    res.send([
        {
            'id': 1,
            'image': "https://placeimg.com/64/64/1",
            'name': '김주영',
            'birthday': '010000',
            'gender': '여'
          },
          {
            'id': 2,
            'image': "https://placeimg.com/64/64/2",
            'name': '김명민',
            'birthday': '000000',
            'gender': '남'
          },
          {
            'id': 3,
            'image': "https://placeimg.com/64/64/3",
            'name': '김준수',
            'birthday': '000111',
            'gender': '남'
          }]
          )
})

app.listen(port, ()=>{console.log(`listen on port ${port}`)})

