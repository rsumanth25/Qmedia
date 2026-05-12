const Order = require('../models/Order');
const Cart  = require('../models/Cart');

// ── POST /api/orders/place ──────────────────────────────────────
exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || !cart.items.length)
      return res.status(400).json({ message: 'Cart is empty.' });

    const subtotal   = cart.items.reduce((sum, i) => sum + i.price, 0);
    const gst        = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + gst;

    const order = await Order.create({
      user:       req.user._id,
      items:      cart.items,
      subtotal,
      gst,
      grandTotal,
      status:     'pending',
    });

    // Clear cart after order is placed
    cart.items     = [];
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/orders/my ──────────────────────────────────────────
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── PATCH /api/orders/:id/pay ───────────────────────────────────
// Call this from frontend after successful Razorpay/Stripe payment
exports.markPaid = async (req, res) => {
  try {
    const { paymentId } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status: 'paid', paymentId },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/orders/:id ─────────────────────────────────────────
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
