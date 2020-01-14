const mongoose = require('mongoose');
// Define Schemes
const translationBlockSchema = new mongoose.Schema({
  sentence_block_id: {type: mongoose.Schema.Types.ObjectId, ref: 'SentenceBlock'},
  processed_eng: {type: String, require: true},
  translated_kor: {type: String, require: true},
  num_of_votes: {type: Number, require: true},
  url : {type: String, require : true}
},
{
  timestamps: true
});
translationBlockSchema.statics.create = function (payload) {
    const translationBlock = new this(payload);
    // return Promise
    return translationBlock.save();
  };

module.exports = mongoose.model('TranslationBlock', translationBlockSchema);