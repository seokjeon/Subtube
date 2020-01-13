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


function timeSort(a, b){
  return Number(a.start_time) >= Number(b.start_time) ? 1 : -1
}

  
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
  // res.send(xhr.responseText)
  // res.end()

  //From here is DB processing
  // videoUrl = 'https://www.youtube.com/watch?v=' + videoId
  videoUrl = videoId

  var dataVideo
  dataVideo = Video.findOne({url: videoUrl}, (err, result)=>{
    dataVideo = result
  }).then(()=>{
    console.log(dataVideo)
    if (!dataVideo){
      Video.create({
        url: videoUrl
      }).then(()=>{
        console.log("Saved video successfully")
      }) 
      try{
        subInfo = JSON.parse(xhr.responseText)
        var subInfos = []
        // console.log(subInfo)
        subInfo.forEach((element, index) => {
          // console.log(element.start, element.text)
          if (index < subInfo.length-1){
            var time_term = (Number(subInfo[index+1].start) - Number(element.start))
            var dur = Number(element.duration) >= time_term ? time_term : Number(element.duration)
            // console.log(dur)
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
        console.log("not exist")
        var returnResult = subInfos.sort(timeSort)
        res.send(JSON.stringify(returnResult))
        res.end()
      }catch (e){
        console.log(e)
        return
      } 
    }else{
      SentenceBlock.find({url: videoUrl}, (err, result) =>{
        console.log("exist")
        var returnResult = result.sort(timeSort)
        res.send(returnResult)
        res.end()
      })
      
    }
  })
})

// router.use('/images', require('../routes/images.js'));
module.exports = router