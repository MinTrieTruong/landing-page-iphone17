const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');

// Validation helper
function validateOrder(body) {
  const errors = [];
  const { full_name, phone, email, address, product_id, color } = body;
  if (!full_name || full_name.trim().length < 2) errors.push('Họ tên phải có ít nhất 2 ký tự');
  if (!phone || !/^(0|\+84)[0-9]{9}$/.test(phone.trim())) errors.push('Số điện thoại không hợp lệ');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Email không hợp lệ');
  if (!address || address.trim().length < 5) errors.push('Địa chỉ phải có ít nhất 5 ký tự');
  if (!product_id) errors.push('Vui lòng chọn sản phẩm');
  if (!color) errors.push('Vui lòng chọn màu sắc');
  return errors;
}

// POST /api/pre-orders — tạo đơn đặt trước
router.post('/', async (req, res) => {
  const errors = validateOrder(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  const { full_name, phone, email, address, product_id, color, storage = '128GB', note = '' } = req.body;
  try {
    const [result] = await pool.query(`
      INSERT INTO pre_orders (full_name, phone, email, address, product_id, color, storage, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [full_name.trim(), phone.trim(), email.trim(), address.trim(), product_id, color, storage, note]);
    res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.',
      data: { id: result.insertId }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/pre-orders — lấy danh sách đơn (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT po.*, p.name AS product_name, p.model, p.price_label
      FROM pre_orders po
      JOIN products p ON po.product_id = p.id
      ORDER BY po.created_at DESC
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
