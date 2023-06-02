const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Upload = mongoose.model('upload', uploadSchema);

module.exports = Upload;
