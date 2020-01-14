const faker = require('faker')
const assert = require('assert')
const _ = require("lodash")
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://0.0.0.0:27017"
const dbName = "subtube_build_test"

faker.locale = 'ko'

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);

    // // Users
    // const usersCollection = db.collection("user");
    // let users = [];
    // for (let i = 0; i < 10; i += 1) {
    //     let name = faker.name.findName()
    //     let contribution_time = faker.random.number(10)

    //     let newUser = {
    //         name,
    //         contribution_time
    //     };
    //     users.push(newUser);
    // }
    // usersCollection.insertMany(users);

    //Video
    // const videoCollection = db.collection("video")
    // let videos = []
    // let vids = ["3OtA0JxInkQ", ]
    // for (const vid in vids) {
    //     let newVideo = {
    //         vid
    //     };
    //     videos.push(newVideo);
    // }
    // videoCollection.insertMany(videos);


    // const sentenceCollection = db.collection("sentenceBlock")
    // let blocks = []
    // for (let i = 0; i < 10; i += 1) {
    //     let video_id = videos[i]._id

    //     for (let j = 0; j < 5; j += 1) {
    //         let raw_eng = faker.lorem.sentence()
    //         let start_time = faker.random.number()
    //         let duration = faker.random.number()

    //         let newBlock = {
    //             video_id,
    //             raw_eng,
    //             start_time,
    //             duration
    //         };
    //         blocks.push(newBlock);
    //     }
    // }

    // sentenceCollection.insertMany(blocks);

    
    // const transCollection = db.collection("translationBlock")
    // let transBlock = []
    // for (let i = 0; i < 10; i += 1) {
    //     let sentence_block_id = blocks[i]._id

    //     for (let j = 0; j < 5; j += 1) {
    //         let processed_eng = faker.lorem.sentence()
    //         let translated_kor = faker.lorem.sentence()
    //         let num_of_votes = faker.random.number()

    //         let newBlock = {
    //             sentence_block_id,
    //             processed_eng,
    //             translated_kor,
    //             num_of_votes
    //         };
    //         transBlock.push(newBlock);
    //     }
    // }
// 
    const sentenceCollection = db.collection("sentenceBlock")
    sentenceCollection.find({url: ""}, (err, data)=>{
        if(err) console.log(err)
        console.log(data)
    })
    // transCollection.insertMany(transBlock);

    /*
    //Translateion
    let trans =[]
    const transCollection = db.collection("trans");
    for (let i = 0; i < 10; i += 1) {
        let is_modified = faker.random.boolean()
        let translated_kor = faker.lorem.sentence()
        let num_of_votes = faker.random.number()
    
        let newTranslation = {
            is_modified,
            translated_kor,
            num_of_votes
        };
        trans.push(newTranslation);
        console.log(trans.translated_kor);
    }
    transCollection.insertMany(trans)
    */
    console.log("데이터베이스 생성 완료!")
    client.close()
})