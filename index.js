// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

var db =  mongoose.connection
db.on('error', console.error)
db.once('open', function(){
  console.log("Connected to mongod server")
})



const app = express();
const port = process.env.PORT;
// const port = 5003;

// Static File Service
app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cors
app.use(cors());

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

// URL routing
app.use('/', require('./routes/base.js'));
// app.use('/', require('./client/src/index.js'));

// app.use('/', express.static('client/public'));





console.log(port)
app.listen(port, () => console.log(`Server listening on port ${port}`));