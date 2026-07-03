const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');

// GET /api/products — lấy tất cả sản phẩm (có thể filter theo model)
router.get('/', async (req, res) => {
  try {
    const { model } = req.query;
    let query = 'SELECT * FROM products WHERE in_stock = 1';
    const params = [];
    if (model) {
      query += ' AND model = ?';
      params.push(model);
    }
    query += ' ORDER BY id ASC';
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/:id — lấy 1 sản phẩm
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, error: 'Không tìm thấy sản phẩm' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
