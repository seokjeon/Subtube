const router = require('express').Router()
const mongoose = require('mongoose').Types.ObjectId
const faker = require('faker')

const Video = require('../models/Video')
const TranslationBlock = require('../models/TranslationBlock')
const SentenceBlock = require('../models/SentenceBlock')

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

router.get('/', function (req, res) {
  console.log("hi I'm node js server")
  res.send("HI CLIENT I'M NODE JS")
})

router.get('/trans/delete/:objectID', (req, res) => {
  const objectID = req.params.objectID
  let obj = new mongoose(objectID)
  TranslationBlock.deleteOne().where("_id").equals(obj)
  .then((err, data)=>{
    if(err) console.log(err)
    console.log(data)
  })
  res.send("delete successfully")
})

function timeSort(a, b) {
  return Number(a.start_time) >= Number(b.start_time) ? 1 : -1
}

function recomSort(a, b){
  return Number(a.num_of_votes) >= Number(b.num_of_votes) ? -1: 1
}

  
router.post('/trans/create', function (req, res) {
  console.log(req.body)
  const video_url = req.body.video_url
  const processed_eng = req.body.RawEng
  const translated_kor = req.body.TranslatedKor
  const startTime = req.body.startTime

  SentenceBlock.find().where("url").equals(video_url)
    .where("start_time").equals(startTime)
    .exec((err, data) => {
      TranslationBlock.create({
        sentence_block_id: data[0]._id,
        processed_eng: processed_eng,
        translated_kor: translated_kor,
        num_of_votes: 0,
        url : video_url
      })
    })

  res.status(200).send("Successfully Saved!")
})

router.post('/getmax', function (req, res){
  // console.log("getmax", req.body)
  const objectID = req.body.sentence_block_id
  let obj = new mongoose(objectID)

  TranslationBlock.find().where("sentence_block_id").equals(obj).exec((err, result) =>{
    if (result.length == 0){
      res.send(JSON.stringify({translationNum: 0, maxVote: 0}))
      return
    }
    sortedResult = result.sort(recomSort)
    translationNum = result.length
    maxVote = sortedResult[0].num_of_votes
    returnJson = {translationNum: result.length, maxVote: sortedResult[0].num_of_votes}
    returnValue = JSON.stringify(returnJson)
    res.send(returnValue)
    // res.send(JSON.stringify(returnJson))
    // console.log("getmax: ", JSON.stringify(returnJson))
  })
})


//load other people's subtitle
router.get('/api/:objectID', function (req, res) {
  const objectID = req.params.objectID
  let obj = new mongoose(objectID)
  TranslationBlock.find().where("sentence_block_id").equals(obj).exec((err, block) => {
    if (err) console.log("/api error : ", err)
    res.send(JSON.stringify(block))
  })
})

router.get('/api/userid/video', function (req, res) {
  TranslationBlock.find({}).sort('-num_of_votes').exec((err, block) => {
    if (err) console.log("/api/video error : ", err)
    res.send(JSON.stringify(block))
  })
})

router.get('/vote/:objectID', (req, res)=>{
  const objectID = req.params.objectID

  let obj = new mongoose(objectID)
  TranslationBlock.findOneAndUpdate({"_id" : obj}, { $inc : {num_of_votes : 1}}, {returnResult : true}, (err, data)=>{
    if(err) console.log("/vote error : ", err)
    res.send(JSON.stringify(data.num_of_votes + 1))
  });
  
})

router.get('/trans/:id', function (req, res) {
  videoId = req.params.id
  url = 'http://a1d2760c.ngrok.io/Trans/' + videoId

  var xhr = new XMLHttpRequest()

  console.log("subtitle request!")
  xhr.open('GET', url, false)
  xhr.send()

  videoUrl = videoId
  console.log(videoUrl)
  var dataVideo
  dataVideo = Video.findOne({ url: videoUrl }, (err, result) => {
    dataVideo = result
  }).then(() => {
    console.log(dataVideo)
    if (!dataVideo) {
      Video.create({
        url: videoUrl
      })
      try {
        console.log(xhr.responseText)
        subInfo = JSON.parse(xhr.responseText)
        var subInfos = []
        subInfo.forEach((element, index) => {
          if (index < subInfo.length - 1) {
            var time_term = (Number(subInfo[index + 1].start) - Number(element.start))
            var dur = Number(element.duration) >= time_term ? time_term : Number(element.duration)
          } else {
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
      } catch (e) {
        console.log(e)
        return
      }
    } else {
      SentenceBlock.find({ url: videoUrl }, (err, result) => {
        var returnResult = result.sort(timeSort)
        res.send(returnResult)
        res.end()
      })

    }
  })
})

// router.use('/images', require('../routes/images.js'));
module.exports = router