const router = require('express').Router();

// const Contacts = require('../models/contacts');
// const Images = require('../models/images');

router.get('/', (req, res)=>{
    console.log("hi web")
    res.send("I'm node js server hi client")
})

// router.use('/contacts', require('../routes/contacts.js'));
// router.use('/images', require('../routes/images.js'));
module.exports = router