const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || 'iphone17secret',
  database: process.env.DB_NAME     || 'iphone17db',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  charset:            'utf8mb4',
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Kết nối MySQL thành công');
    conn.release();
  } catch (err) {
    console.error('❌ Không thể kết nối MySQL:', err.message);
    console.warn('⚠️  Tiếp tục khởi động server (một số API sẽ không hoạt động nếu DB chưa sẵn sàng)');
  }
}

module.exports = { pool, testConnection };
