const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const authRoutes  = require('./routes/auth.routes');
const cartRoutes  = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const mediaRoutes = require('./routes/media.routes');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────
app.use('/api/auth',   authRoutes);
app.use('/api/cart',   cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/media',  mediaRoutes);

// ── Health check ────────────────────────────────────────────────
app.get('/api/health', (req, res) =>
  res.json({ status: 'QMedia API is running ✅' })
);

// ── Connect MongoDB then start server ───────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch(err => console.error('❌ MongoDB error:', err));
