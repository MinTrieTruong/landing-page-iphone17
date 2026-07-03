const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');

// POST /api/webhook/order — log hành vi đặt hàng
router.post('/order', async (req, res) => {
  const { event_type = 'order_click', session_id, payload } = req.body;
  const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
  const user_agent = req.headers['user-agent'] || null;
  try {
    await pool.query(`
      INSERT INTO webhook_logs (event_type, session_id, payload, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?)
    `, [event_type, session_id || null, JSON.stringify(payload || {}), ip_address, user_agent]);
    console.log(`[WEBHOOK] ${event_type} | session: ${session_id} | ip: ${ip_address}`);
    res.json({ success: true, message: 'Webhook đã được ghi nhận' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/webhook/logs — xem log (admin)
router.get('/logs', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM webhook_logs ORDER BY created_at DESC LIMIT 100'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
