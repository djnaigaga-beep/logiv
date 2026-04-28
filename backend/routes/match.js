const express = require('express');
const router = express.Router();
const MatchRequest = require('../models/MatchRequest');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Send match request
router.post('/send', auth, async (req, res) => {
  try {
    const { toUserId, exemptionCode } = req.body;
    const fromUser = await User.findById(req.userId);

    // Only males from Europe can send match requests
    if (fromUser.gender !== 'male') {
      return res.status(403).json({ message: 'Only males can send match requests' });
    }

    // Check if request already exists
    const existingRequest = await MatchRequest.findOne({
      from: req.userId,
      to: toUserId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Match request already sent' });
    }

    let paymentStatus = 'pending';
    if (exemptionCode === '23234') {
      paymentStatus = 'exempted';
    }

    const matchRequest = new MatchRequest({
      from: req.userId,
      to: toUserId,
      paymentStatus
    });

    await matchRequest.save();

    res.status(201).json({
      matchRequest,
      requiresPayment: paymentStatus === 'pending'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get pending match requests for current user
router.get('/pending', auth, async (req, res) => {
  try {
    const requests = await MatchRequest.find({ to: req.userId, status: 'pending' })
      .populate('from', 'firstName lastName profilePhoto');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept match request
router.post('/:requestId/accept', auth, async (req, res) => {
  try {
    const matchRequest = await MatchRequest.findById(req.params.requestId);
    if (!matchRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (matchRequest.to.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Only accept if payment is done or exempted
    if (matchRequest.paymentStatus === 'pending') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    matchRequest.status = 'accepted';
    matchRequest.acceptedAt = new Date();
    await matchRequest.save();

    // Block both users from seeing other profiles (but can see media)
    await User.findByIdAndUpdate(matchRequest.from, {
      $set: { hasAcceptedMatch: matchRequest.to }
    });

    await User.findByIdAndUpdate(matchRequest.to, {
      $set: { hasAcceptedMatch: matchRequest.from }
    });

    res.json({ message: 'Match request accepted', matchRequest });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject match request
router.post('/:requestId/reject', auth, async (req, res) => {
  try {
    const matchRequest = await MatchRequest.findById(req.params.requestId);
    if (!matchRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (matchRequest.to.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    matchRequest.status = 'rejected';
    await matchRequest.save();

    res.json({ message: 'Match request rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
