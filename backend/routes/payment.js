const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
const MatchRequest = require('../models/MatchRequest');
const auth = require('../middleware/auth');

// Create payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { matchRequestId } = req.body;

    const matchRequest = await MatchRequest.findById(matchRequestId);
    if (!matchRequest) {
      return res.status(404).json({ message: 'Match request not found' });
    }

    if (matchRequest.from.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: matchRequest.amount * 100, // Convert to cents
      currency: 'eur',
      metadata: {
        matchRequestId: matchRequestId.toString()
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment error' });
  }
});

// Confirm payment
router.post('/confirm-payment', auth, async (req, res) => {
  try {
    const { matchRequestId, paymentIntentId } = req.body;

    const matchRequest = await MatchRequest.findById(matchRequestId);
    if (!matchRequest) {
      return res.status(404).json({ message: 'Match request not found' });
    }

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      matchRequest.paymentStatus = 'paid';
      matchRequest.transactionId = paymentIntentId;
      await matchRequest.save();

      res.json({ message: 'Payment successful', matchRequest });
    } else {
      res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Payment confirmation error' });
  }
});

module.exports = router;
