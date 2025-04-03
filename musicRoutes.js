const express = require('express');
const Music = require('./models/Music');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Upload Music
router.post('/upload', upload.fields([
  { name: 'song', maxCount: 1 },
  { name: 'avatar', maxCount: 1 },
]), async (req, res) => {
  try {
    const { songName, songArtist } = req.body;
    const songSrc = req.files['song'][0].path;
    const songAvatar = req.files['avatar'][0].path;

    const newMusic = new Music({
      songName,
      songArtist,
      songSrc,
      songAvatar,
    });

    await newMusic.save();
    res.status(201).json({ message: 'Music uploaded successfully', music: newMusic });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload music' });
  }
});

// Get All Music
router.get('/', async (req, res) => {
  try {
    const musicList = await Music.find();
    res.status(200).json(musicList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch music' });
  }
});

module.exports = router;