const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function migrate() {
  console.log('⏳ Bắt đầu di chuyển và nạp lại cơ sở dữ liệu...');
  try {
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const sqlContent = fs.readFileSync(schemaPath, 'utf8');

    const statements = sqlContent
      .split(/;\r?\n/)
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    const conn = await pool.getConnection();

    await conn.query('SET FOREIGN_KEY_CHECKS = 0');

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      if (stmt.startsWith('--') || stmt.startsWith('/*')) continue;
      
      try {
        await conn.query(stmt);
      } catch (err) {
        console.error(`❌ Lỗi tại statement #${i + 1}: ${stmt.substring(0, 100)}...`);
        console.error(err.message);
      }
    }

    await conn.query('SET FOREIGN_KEY_CHECKS = 1');
    conn.release();

    console.log('✅ Di chuyển cơ sở dữ liệu và nạp dữ liệu mẫu thành công!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi di chuyển dữ liệu:', err.message);
    process.exit(1);
  }
}

migrate();
