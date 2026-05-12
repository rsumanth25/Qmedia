const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  mediaId:   { type: Number, required: true },
  name:      String,
  type:      String,
  vendor:    String,
  city:      String,
  price:     Number,
  planPrice: Number,
});

const cartSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  items:     [cartItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);
