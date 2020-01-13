const faker = require('faker')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const _ = require("lodash")
const url = "mongodb://localhost:27017"
const dbName = "test"

faker.locale = 'ko'

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);

    // Users
    const usersCollection = db.collection("User");
    let users = [];
    for (let i = 0; i < 10; i += 1) {
        let name = faker.name.findName()
        let contribution_time = faker.random.number(10)

        let newUser = {
            name,
            contribution_time
        };
        users.push(newUser);
    }
    usersCollection.insertMany(users);

    //Video
    const videoCollection = db.collection("Video")
    let videos = []
    for (let i = 0; i < 10; i += 1) {
        let url = faker.internet.url()

        let newVideo = {
            url
        };
        videos.push(newVideo);
    }
    videoCollection.insertMany(videos);


    const sentenceCollection = db.collection("SentenceBlock")
    let blocks = []
    for (let i = 0; i < 10; i += 1) {
        let video_id = videos[i]._id

        for (let j = 0; j < 5; j += 1) {
            let raw_eng = faker.lorem.sentence()
            let start_time = faker.random.number()
            let duration = faker.random.number()

            let newBlock = {
                video_id,
                raw_eng,
                start_time,
                duration
            };
            blocks.push(newBlock);
        }
    }

    sentenceCollection.insertMany(blocks);


    const transCollection = db.collection("TranslationBlock")
    let transBlock = []
    for (let i = 0; i < 10; i += 1) {
        let sentence_block_id = blocks[i]._id

        for (let j = 0; j < 5; j += 1) {
            let processed_eng = faker.lorem.sentence()
            let translated_kor = faker.lorem.sentence()
            let num_of_votes = faker.random.number()

            let newBlock = {
                sentence_block_id,
                processed_eng,
                translated_kor,
                num_of_votes
            };
            transBlock.push(newBlock);
        }
    }

    transCollection.insertMany(transBlock);

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