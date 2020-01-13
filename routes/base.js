const router = require('express').Router()
const mongoose = require('mongoose')

const Video = require('../models/Video')
const TranslationBlock = require('../models/TranslationBlock')
const SentenceBlock = require('../models/SentenceBlock')


var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

router.get('/', function (req, res) {
  console.log("hi I'm node js server")
  res.send("HI CLIENT I'M NODE JS")
})


router.post('/trans/:id', function (req, res) {
  const video_url = req.body.video_url
  const processed_eng = req.body.RawEng
  const translated_kor = req.body.TranslatedKor
  
  console.log(video_url)
  Video.find({url: video_url}, (err, video) =>{
    TranslationBlock.create({
      sentence_block_id: video[0]._id,
      processed_eng: processed_eng,
      translated_kor: translated_kor,
      num_of_votes: 4967
    })
  })
  res.status(200)
  // console.log(SentenceBlock.find({video_id: Video.find({url: video_url})._id})._id)
  //DB에 저장
  
  //아이콘 바꾸기

  console.log(processed_eng + ' / ' + translated_kor)
})

router.get('/trans/:id', function (req, res) {
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
  }).then(() => {
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