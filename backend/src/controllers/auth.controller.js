const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const userPayload = (user) => ({
  id:      user._id,
  name:    user.name,
  email:   user.email,
  phone:   user.phone,
  company: user.company,
});

// ── POST /api/auth/register ─────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, company } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email and password are required.' });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already registered. Please login.' });

    const user  = await User.create({ name, email, password, phone, company });
    const token = signToken(user._id);

    res.status(201).json({ token, user: userPayload(user) });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// ── POST /api/auth/login ────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password.' });

    const token = signToken(user._id);
    res.json({ token, user: userPayload(user) });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// ── GET /api/auth/me ────────────────────────────────────────────
exports.getMe = async (req, res) => {
  res.json({ user: userPayload(req.user) });
};
