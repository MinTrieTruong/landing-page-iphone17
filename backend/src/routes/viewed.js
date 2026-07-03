const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');

// GET /api/viewed/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT vh.id, vh.viewed_at,
             p.id AS product_id, p.name, p.model, p.price, p.price_label,
             p.color, p.color_hex, p.storage, p.image_url
      FROM viewed_history vh
      JOIN products p ON vh.product_id = p.id
      WHERE vh.session_id = ?
      ORDER BY vh.viewed_at DESC
      LIMIT 10
    `, [req.params.sessionId]);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/viewed — cập nhật lịch sử xem
router.post('/', async (req, res) => {
  const { session_id, product_id } = req.body;
  if (!session_id || !product_id) {
    return res.status(400).json({ success: false, error: 'session_id và product_id là bắt buộc' });
  }
  try {
    await pool.query(`
      INSERT INTO viewed_history (session_id, product_id)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE viewed_at = NOW()
    `, [session_id, product_id]);
    res.json({ success: true, message: 'Đã cập nhật lịch sử xem' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
