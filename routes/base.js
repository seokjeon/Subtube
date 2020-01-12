const router = require('express').Router()

const Video = require('../models/Video')
const SentenceBlock = require('../models/SentenceBlock')


var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

router.get('/', function(req, res){
  console.log("hi I'm node js server")
  res.send("HI CLIENT I'M NODE JS")
})


router.get('/trans/:id', function(req, res){
  videoId = req.params.id
  url = 'http://c1235100.ngrok.io/Trans/' + videoId
  
  var xhr = new XMLHttpRequest()

  console.log("subtitle request!")
  xhr.open('GET', url, false)
  xhr.send()
  res.send(xhr.responseText)
  res.end()

  //From here is DB processing
  videoUrl = 'https://www.youtube.com/watch?v=' + videoId

  var newVideo = Video.create({
    url: videoUrl
  }).then(()=>{
    console.log("Saved video successfully")
  })

  subInfo = JSON.parse(xhr.responseText)
  subInfo.forEach(element => {
    SentenceBlock.create({
          video_id: newVideo.id,
          raw_eng: element.text,
          start_time: element.start,
          duration: element.duration 
      })
  })

})

// router.use('/images', require('../routes/images.js'));
module.exports = router