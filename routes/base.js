const router = require('express').Router()
const mongoose = require('mongoose').Types.ObjectId
const faker = require('faker')

const cors = require('cors')
const Video = require('../models/Video')
const TranslationBlock = require('../models/TranslationBlock')
const SentenceBlock = require('../models/SentenceBlock')

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

router.get('/', function (req, res) {
  console.log("hi I'm node js server")
  res.send("HI CLIENT I'M NODE JS")
})


function timeSort(a, b){
  return Number(a.start_time) >= Number(b.start_time) ? 1 : -1
}

  
router.post('/trans/:id', function (req, res) {
  const video_url = req.body.video_url
  const processed_eng = req.body.RawEng
  const translated_kor = req.body.TranslatedKor
  const startTime = req.body.startTime

  SentenceBlock.find().where("url").equals(video_url)
  .where("start_time").equals(startTime)
  .exec((err, data)=>{
    TranslationBlock.create({
      sentence_block_id: data._id,
      processed_eng: processed_eng,
      translated_kor: translated_kor,
      num_of_votes: 0
    })
  })
  
  res.status(200)
  
  
})

//load other people's subtitle
router.get('/api', cors(), function(req, res){
  const objectID = req.param('objectID')
  let obj = new mongoose(objectID)
  TranslationBlock.find().where("sentence_block_id").equals(obj).exec((err, block)=>{
    if(err) console.log("/api error : ", err)
    res.send(JSON.stringify(block))
  })
})

router.get('/trans/:id', function (req, res) {
  videoId = req.params.id
  url = 'http://ebebf5ff.ngrok.io/Trans/' + videoId

  var xhr = new XMLHttpRequest()

  console.log("subtitle request!")
  xhr.open('GET', url, false)
  xhr.send()

  videoUrl = videoId
  console.log(videoUrl)
  var dataVideo
  dataVideo = Video.findOne({url: videoUrl}, (err, result)=>{
    dataVideo = result
  }).then(()=>{
    console.log(dataVideo)
    if (!dataVideo){
      Video.create({
        url: videoUrl
      })
      try{
        subInfo = JSON.parse(xhr.responseText)
        var subInfos = []
        subInfo.forEach((element, index) => {
          if (index < subInfo.length-1){
            var time_term = (Number(subInfo[index+1].start) - Number(element.start))
            var dur = Number(element.duration) >= time_term ? time_term : Number(element.duration)
          }else{
            dur = Number(element.duration)
          }
          var sentence = SentenceBlock.create({
                url: videoUrl,
                raw_eng: element.text,
                start_time: Number(element.start),
                duration: dur,
                maxRec: 0
            })
          subInfos.push(sentence)
        })
        var returnResult = subInfos.sort(timeSort)
        res.send(JSON.stringify(returnResult))
        res.end()
      }catch (e){
        console.log(e)
        return
      } 
    }else{
      SentenceBlock.find({url: videoUrl}, (err, result) =>{
        var returnResult = result.sort(timeSort)
        res.send(returnResult)
        res.end()
      })
      
    }
  })
})

// router.use('/images', require('../routes/images.js'));
module.exports = router