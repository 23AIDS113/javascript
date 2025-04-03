const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  songArtist: { type: String, required: true },
  songSrc: { type: String, required: true },
  songAvatar: { type: String, required: true },
});

module.exports = mongoose.model('Music', musicSchema);