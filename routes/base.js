const router = require('express').Router()

const Video = require('../models/Video')
const SentenceBlock = require('../models/SentenceBlock')
// const Images = require('../models/images');


var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

router.get('/trans/:id', function(req, res){
  videoId = req.params.id
  url = 'http://5dee59d4.ngrok.io/Trans/' + videoId
  
  var xhr = new XMLHttpRequest()

  console.log("subtitle request!")
  xhr.open('GET', url, false)
  xhr.send()
  res.send(xhr.responseText)
  res.end()

  //From here is DB processing
  videoUrl = 'https://www.youtube.com/watch?v=' + videoId
  // if (!Video.find({url: videoUrl})){
    
    
  //   return
  // }


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

// router.use('/contacts', require('../routes/contacts.js'));
// router.use('/images', require('../routes/images.js'));
module.exports = router