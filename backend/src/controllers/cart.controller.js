const Cart = require('../models/Cart');

// ── GET /api/cart ───────────────────────────────────────────────
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    res.json({ items: cart ? cart.items : [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/cart/add ──────────────────────────────────────────
exports.addItem = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    // Don't add duplicates
    const exists = cart.items.find(i => i.mediaId === req.body.mediaId);
    if (!exists) cart.items.push(req.body);

    cart.updatedAt = Date.now();
    await cart.save();
    res.json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── DELETE /api/cart/remove/:mediaId ───────────────────────────
exports.removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.json({ items: [] });

    cart.items     = cart.items.filter(i => i.mediaId !== Number(req.params.mediaId));
    cart.updatedAt = Date.now();
    await cart.save();
    res.json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── DELETE /api/cart/clear ──────────────────────────────────────
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], updatedAt: Date.now() }
    );
    res.json({ items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
