const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  }
});

var Post = mongoose.model('Post', postSchema);
module.exports = { Post }
