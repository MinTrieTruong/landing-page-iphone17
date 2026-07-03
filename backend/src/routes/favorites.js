const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');

// GET /api/favorites/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT f.id, f.session_id, f.created_at,
             p.id AS product_id, p.name, p.model, p.price, p.price_label,
             p.color, p.color_hex, p.storage, p.image_url
      FROM favorites f
      JOIN products p ON f.product_id = p.id
      WHERE f.session_id = ?
      ORDER BY f.created_at DESC
    `, [req.params.sessionId]);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/favorites — toggle yêu thích
router.post('/', async (req, res) => {
  const { session_id, product_id } = req.body;
  if (!session_id || !product_id) {
    return res.status(400).json({ success: false, error: 'session_id và product_id là bắt buộc' });
  }
  try {
    const [existing] = await pool.query(
      'SELECT id FROM favorites WHERE session_id = ? AND product_id = ?',
      [session_id, product_id]
    );
    if (existing.length > 0) {
      await pool.query('DELETE FROM favorites WHERE session_id = ? AND product_id = ?', [session_id, product_id]);
      return res.json({ success: true, action: 'removed', message: 'Đã xóa khỏi yêu thích' });
    }
    await pool.query('INSERT INTO favorites (session_id, product_id) VALUES (?, ?)', [session_id, product_id]);
    res.json({ success: true, action: 'added', message: 'Đã thêm vào yêu thích' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
