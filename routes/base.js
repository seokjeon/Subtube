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
  const processed_eng = req.body.RawEng
  const translated_kor = req.body.TranslatedKor
  
  //DB에 저장
  TranslationBlock.create({
    sentence_block_id: '5e1c15b747a4361fd416fef8',
    processed_eng: processed_eng,
    translated_kor: translated_kor,
    num_of_votes: 4967
  })
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