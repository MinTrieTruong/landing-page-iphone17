require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./database/db');

// Routes
const productsRouter   = require('./routes/products');
const cartRouter       = require('./routes/cart');
const favoritesRouter  = require('./routes/favorites');
const viewedRouter     = require('./routes/viewed');
const preOrdersRouter  = require('./routes/preOrders');
const webhookRouter    = require('./routes/webhook');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/products',   productsRouter);
app.use('/api/cart',       cartRouter);
app.use('/api/favorites',  favoritesRouter);
app.use('/api/viewed',     viewedRouter);
app.use('/api/pre-orders', preOrdersRouter);
app.use('/api/webhook',    webhookRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint không tồn tại' });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Lỗi server nội bộ', detail: err.message });
});

// ── Start ────────────────────────────────────────────────────────────────────
async function start() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 iPhone 17 API đang chạy tại http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = app;
