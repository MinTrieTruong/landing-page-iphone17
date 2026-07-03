const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');

// GET /api/cart/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.id, c.session_id, c.quantity, c.updated_at,
             p.id AS product_id, p.name, p.model, p.price, p.price_label,
             p.color, p.color_hex, p.storage, p.image_url
      FROM carts c
      JOIN products p ON c.product_id = p.id
      WHERE c.session_id = ?
      ORDER BY c.updated_at DESC
    `, [req.params.sessionId]);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/cart — thêm hoặc tăng số lượng
router.post('/', async (req, res) => {
  const { session_id, product_id, quantity = 1 } = req.body;
  if (!session_id || !product_id) {
    return res.status(400).json({ success: false, error: 'session_id và product_id là bắt buộc' });
  }
  try {
    await pool.query(`
      INSERT INTO carts (session_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity), updated_at = NOW()
    `, [session_id, product_id, quantity]);
    res.json({ success: true, message: 'Đã thêm vào giỏ hàng' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/cart/:id — cập nhật số lượng
router.put('/:id', async (req, res) => {
  const { quantity } = req.body;
  if (!quantity || quantity < 1) {
    return res.status(400).json({ success: false, error: 'Số lượng không hợp lệ' });
  }
  try {
    await pool.query('UPDATE carts SET quantity = ? WHERE id = ?', [quantity, req.params.id]);
    res.json({ success: true, message: 'Đã cập nhật giỏ hàng' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/cart/:id — xóa item
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM carts WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Đã xóa khỏi giỏ hàng' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/cart/session/:sessionId — xóa toàn bộ giỏ hàng
router.delete('/session/:sessionId', async (req, res) => {
  try {
    await pool.query('DELETE FROM carts WHERE session_id = ?', [req.params.sessionId]);
    res.json({ success: true, message: 'Đã xóa toàn bộ giỏ hàng' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
