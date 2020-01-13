const mongoose = require('mongoose');
// Define Schemes
const sentenceBlockSchema = new mongoose.Schema({
  url: {type: String, require: true},
  raw_eng: {type: String, require: true},
  start_time: {type: String, require: true},
  duration: {type: String, require: true}
},
{
  timestamps: true
});
sentenceBlockSchema.statics.create = function (payload) {
    const sentence_block = new this(payload);
    // return Promise
    sentence_block.save();
    return sentence_block;
  };

module.exports = mongoose.model('SentenceBlock', sentenceBlockSchema);