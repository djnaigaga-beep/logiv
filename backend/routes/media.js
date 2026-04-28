const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Media = require('../models/Media');
const auth = require('../middleware/auth');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Upload media
router.post('/upload', auth, upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const mediaType = req.body.mediaType || (req.file.mimetype.startsWith('image') ? 'image' : 'video');
    
    const media = new Media({
      userId: req.userId,
      mediaType,
      filePath: `/uploads/${req.file.filename}`
    });

    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user media
router.get('/user/:userId', async (req, res) => {
  try {
    const media = await Media.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all media (feed)
router.get('/', async (req, res) => {
  try {
    const media = await Media.find().populate('userId', 'firstName lastName').sort({ createdAt: -1 }).limit(100);
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like media
router.post('/:mediaId/like', auth, async (req, res) => {
  try {
    const media = await Media.findById(req.params.mediaId);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    if (!media.likes.includes(req.userId)) {
      media.likes.push(req.userId);
      await media.save();
    }

    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete media
router.delete('/:mediaId', auth, async (req, res) => {
  try {
    const media = await Media.findById(req.params.mediaId);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    if (media.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Media.findByIdAndDelete(req.params.mediaId);
    res.json({ message: 'Media deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
