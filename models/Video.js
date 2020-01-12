const mongoose = require('mongoose');
// Define Schemes
const videoSchema = new mongoose.Schema({
  url: { type: String, require: true}
},
{
  timestamps: true
});
videoSchema.statics.create = function (payload) {
    const video = new this(payload);
    // return Promise
    return video.save();
  };

module.exports = mongoose.model('Video', videoSchema);