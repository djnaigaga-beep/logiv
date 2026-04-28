const mongoose = require('mongoose');

const matchRequestSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'exempted'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    default: null
  },
  amount: {
    type: Number,
    default: 50 // 50 euros
  },
  message: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  acceptedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('MatchRequest', matchRequestSchema);
