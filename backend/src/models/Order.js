const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  mediaId: Number,
  name:    String,
  type:    String,
  vendor:  String,
  city:    String,
  price:   Number,
});

const orderSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:      [orderItemSchema],
  subtotal:   { type: Number, required: true },
  gst:        { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  // pending → order placed, paid → payment done, failed → payment failed
  status:     { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentId:  { type: String, default: '' },   // Razorpay payment ID goes here
  createdAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
