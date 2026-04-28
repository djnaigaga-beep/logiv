const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password -email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { bio, interests } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { bio, interests },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search users (profiles)
router.get('/search', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    
    // Determine which gender to search for
    let searchGender = currentUser.gender === 'male' ? 'female' : 'male';
    let searchCountry = currentUser.gender === 'male' ? 'Uganda' : 'not Uganda';
    
    let query = { 
      gender: searchGender,
      _id: { $ne: req.userId }
    };

    if (searchCountry === 'Uganda') {
      query.country = 'Uganda';
    } else {
      query.country = { $ne: 'Uganda' };
    }

    // Exclude blocked users
    if (currentUser.blockedUsers.length > 0) {
      query._id = { ...query._id, $nin: currentUser.blockedUsers };
    }

    const users = await User.find(query).select('-password -email').limit(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
