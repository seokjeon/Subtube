const mongoose = require('mongoose');
// Define Schemes
const sentenceBlockSchema = new mongoose.Schema({
  video_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Video'},
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
    return sentence_block.save();
  };

module.exports = mongoose.model('SentenceBlock', sentenceBlockSchema);