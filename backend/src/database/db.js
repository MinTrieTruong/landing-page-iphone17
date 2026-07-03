const mysql2 = require('mysql2/promise');

let pool = null;
let isConnected = false;

// Cơ sở dữ liệu giả lập trong bộ nhớ (In-Memory) dự phòng
const memoryDb = {
  products: [
    { id: 1, name: 'iPhone 17', model: 'iphone17', price: 27990000, price_label: '27.990.000đ', color: 'Tím Oải Hương', color_hex: '#D1C4E9', storage: '128GB', image_url: '/images/iphone17-lavender.jpg', description: 'Thiết kế mỏng nhẹ, chip A19, camera 48MP', in_stock: 1 },
    { id: 2, name: 'iPhone 17', model: 'iphone17', price: 27990000, price_label: '27.990.000đ', color: 'Xanh Lá Xô Thơm', color_hex: '#C8E6C9', storage: '128GB', image_url: '/images/iphone17-all.jpg', description: 'Thiết kế mỏng nhẹ, chip A19, camera 48MP', in_stock: 1 },
    { id: 3, name: 'iPhone 17', model: 'iphone17', price: 27990000, price_label: '27.990.000đ', color: 'Xanh Lam Khói', color_hex: '#B3E5FC', storage: '128GB', image_url: '/images/iphone17-all.jpg', description: 'Thiết kế mỏng nhẹ, chip A19, camera 48MP', in_stock: 1 },
    { id: 4, name: 'iPhone 17', model: 'iphone17', price: 27990000, price_label: '27.990.000đ', color: 'Đen', color_hex: '#212121', storage: '128GB', image_url: '/images/iphone17-black.png', description: 'Thiết kế mỏng nhẹ, chip A19, camera 48MP', in_stock: 1 },
    { id: 5, name: 'iPhone 17', model: 'iphone17', price: 27990000, price_label: '27.990.000đ', color: 'Trắng', color_hex: '#F5F5F5', storage: '128GB', image_url: '/images/iphone17-white.png', description: 'Thiết kế mỏng nhẹ, chip A19, camera 48MP', in_stock: 1 },
    { id: 6, name: 'iPhone 17 Pro', model: 'iphone17_pro', price: 35990000, price_label: '35.990.000đ', color: 'Bạc', color_hex: '#d6d6d6', storage: '256GB', image_url: '/images/iphone17pro-silver.jpg', description: 'Khung titan, camera 5x, chip A19 Pro', in_stock: 1 },
    { id: 7, name: 'iPhone 17 Pro', model: 'iphone17_pro', price: 35990000, price_label: '35.990.000đ', color: 'Xanh Đậm', color_hex: '#354556', storage: '256GB', image_url: '/images/iphone17pro-blue.jpg', description: 'Khung titan, camera 5x, chip A19 Pro', in_stock: 1 },
    { id: 8, name: 'iPhone 17 Pro', model: 'iphone17_pro', price: 35990000, price_label: '35.990.000đ', color: 'Cam Vũ Trụ', color_hex: '#d87040', storage: '256GB', image_url: '/images/iphone17pro-orange.jpg', description: 'Khung titan, camera 5x, chip A19 Pro', in_stock: 1 },
    { id: 9, name: 'iPhone 17 Pro Max', model: 'iphone17_pro_max', price: 42990000, price_label: '42.990.000đ', color: 'Bạc', color_hex: '#d6d6d6', storage: '256GB', image_url: '/images/iphone17pro-silver.jpg', description: 'Màn hình 6.9", pin 29 giờ, camera 5x Pro', in_stock: 1 },
    { id: 10, name: 'iPhone 17 Pro Max', model: 'iphone17_pro_max', price: 42990000, price_label: '42.990.000đ', color: 'Xanh Đậm', color_hex: '#354556', storage: '256GB', image_url: '/images/iphone17pro-blue.jpg', description: 'Màn hình 6.9", pin 29 giờ, camera 5x Pro', in_stock: 1 },
    { id: 11, name: 'iPhone 17 Pro Max', model: 'iphone17_pro_max', price: 42990000, price_label: '42.990.000đ', color: 'Cam Vũ Trụ', color_hex: '#d87040', storage: '256GB', image_url: '/images/iphone17pro-orange.jpg', description: 'Màn hình 6.9", pin 29 giờ, camera 5x Pro', in_stock: 1 },
    { id: 12, name: 'iPhone Air', model: 'iphone_air', price: 23990000, price_label: '23.990.000đ', color: 'Tím Oải Hương', color_hex: '#D1C4E9', storage: '128GB', image_url: '/images/iphone17-lavender.jpg', description: 'Mỏng nhất từ trước đến nay, 5.5mm', in_stock: 1 },
    { id: 13, name: 'iPhone Air', model: 'iphone_air', price: 23990000, price_label: '23.990.000đ', color: 'Xanh Lá Xô Thơm', color_hex: '#C8E6C9', storage: '128GB', image_url: '/images/iphone17-all.jpg', description: 'Mỏng nhất từ trước đến nay, 5.5mm', in_stock: 1 },
    { id: 14, name: 'iPhone Air', model: 'iphone_air', price: 23990000, price_label: '23.990.000đ', color: 'Xanh Lam Khói', color_hex: '#B3E5FC', storage: '128GB', image_url: '/images/iphone17-all.jpg', description: 'Mỏng nhất từ trước đến nay, 5.5mm', in_stock: 1 },
    { id: 15, name: 'iPhone Air', model: 'iphone_air', price: 23990000, price_label: '23.990.000đ', color: 'Đen', color_hex: '#212121', storage: '128GB', image_url: '/images/iphone17-black.png', description: 'Mỏng nhất từ trước đến nay, 5.5mm', in_stock: 1 },
    { id: 16, name: 'iPhone Air', model: 'iphone_air', price: 23990000, price_label: '23.990.000đ', color: 'Trắng', color_hex: '#F5F5F5', storage: '128GB', image_url: '/images/iphone17-white.png', description: 'Mỏng nhất từ trước đến nay, 5.5mm', in_stock: 1 }
  ],
  carts: [],
  favorites: [],
  pre_orders: [],
  webhook_logs: [],
  cartAutoId: 1,
  favoriteAutoId: 1,
  preOrderAutoId: 1,
  webhookAutoId: 1
};

if (process.env.DB_HOST) {
  try {
    pool = mysql2.createPool({
      host:     process.env.DB_HOST,
      port:     parseInt(process.env.DB_PORT) || 3306,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit:    10,
      queueLimit:         0,
      charset:            'utf8mb4',
    });
  } catch (e) {
    console.error('⚠️ Lỗi khởi tạo MySQL pool:', e.message);
  }
}

async function mockQuery(sql, params = []) {
  const normalizedSql = sql.trim().replace(/\s+/g, ' ');

  // 1. SELECT products
  if (normalizedSql.includes('SELECT * FROM products')) {
    let rows = [...memoryDb.products];
    if (normalizedSql.includes('id = ?')) {
      rows = rows.filter(p => p.id === parseInt(params[0]) || p.id === params[0]);
    } else if (normalizedSql.includes('model = ?')) {
      rows = rows.filter(p => p.model === params[0]);
    }
    return [rows];
  }

  // 2. carts
  if (normalizedSql.includes('FROM carts') || normalizedSql.includes('SELECT c.id')) {
    const sessionId = params[0];
    const sessionCarts = memoryDb.carts.filter(c => c.session_id === sessionId);
    const rows = sessionCarts.map(c => {
      const p = memoryDb.products.find(prod => prod.id === c.product_id) || {};
      return {
        id: c.id,
        session_id: c.session_id,
        quantity: c.quantity,
        updated_at: c.updated_at,
        product_id: p.id || c.product_id,
        name: p.name || 'iPhone',
        model: p.model || 'iphone17',
        price: p.price || 0,
        price_label: p.price_label || '',
        color: p.color || '',
        color_hex: p.color_hex || '',
        storage: p.storage || '',
        image_url: p.image_url || ''
      };
    });
    return [rows];
  }

  if (normalizedSql.includes('INSERT INTO carts')) {
    const [sessionId, productId, quantity] = params;
    const existing = memoryDb.carts.find(c => c.session_id === sessionId && c.product_id === parseInt(productId));
    if (existing) {
      existing.quantity += quantity || 1;
      existing.updated_at = new Date();
    } else {
      memoryDb.carts.push({
        id: memoryDb.cartAutoId++,
        session_id: sessionId,
        product_id: parseInt(productId),
        quantity: quantity || 1,
        updated_at: new Date()
      });
    }
    return [{ affectedRows: 1 }];
  }

  if (normalizedSql.includes('UPDATE carts SET quantity = ?')) {
    const [quantity, id] = params;
    const item = memoryDb.carts.find(c => c.id === parseInt(id));
    if (item) item.quantity = parseInt(quantity);
    return [{ affectedRows: 1 }];
  }

  if (normalizedSql.includes('DELETE FROM carts WHERE id = ?')) {
    const id = params[0];
    const idx = memoryDb.carts.findIndex(c => c.id === parseInt(id));
    if (idx !== -1) memoryDb.carts.splice(idx, 1);
    return [{ affectedRows: 1 }];
  }

  if (normalizedSql.includes('DELETE FROM carts WHERE session_id = ?')) {
    const sessionId = params[0];
    memoryDb.carts = memoryDb.carts.filter(c => c.session_id !== sessionId);
    return [{ affectedRows: 1 }];
  }

  // 3. favorites
  if (normalizedSql.includes('FROM favorites') || normalizedSql.includes('SELECT f.id')) {
    if (normalizedSql.includes('session_id = ? AND product_id = ?')) {
      const [sessionId, productId] = params;
      const rows = memoryDb.favorites.filter(f => f.session_id === sessionId && f.product_id === parseInt(productId));
      return [rows];
    }
    const sessionId = params[0];
    const sessionFavs = memoryDb.favorites.filter(f => f.session_id === sessionId);
    const rows = sessionFavs.map(f => {
      const p = memoryDb.products.find(prod => prod.id === f.product_id) || {};
      return {
        id: f.id,
        session_id: f.session_id,
        created_at: f.created_at,
        product_id: p.id || f.product_id,
        name: p.name || '',
        model: p.model || '',
        price: p.price || 0,
        price_label: p.price_label || '',
        color: p.color || '',
        color_hex: p.color_hex || '',
        storage: p.storage || '',
        image_url: p.image_url || ''
      };
    });
    return [rows];
  }

  if (normalizedSql.includes('INSERT INTO favorites')) {
    const [sessionId, productId] = params;
    memoryDb.favorites.push({
      id: memoryDb.favoriteAutoId++,
      session_id: sessionId,
      product_id: parseInt(productId),
      created_at: new Date()
    });
    return [{ affectedRows: 1 }];
  }

  if (normalizedSql.includes('DELETE FROM favorites WHERE session_id = ? AND product_id = ?')) {
    const [sessionId, productId] = params;
    memoryDb.favorites = memoryDb.favorites.filter(f => !(f.session_id === sessionId && f.product_id === parseInt(productId)));
    return [{ affectedRows: 1 }];
  }

  // 4. pre_orders
  if (normalizedSql.includes('INSERT INTO pre_orders')) {
    const [fullName, phone, email, address, productId, color, storage, note] = params;
    const newId = memoryDb.preOrderAutoId++;
    memoryDb.pre_orders.push({
      id: newId,
      full_name: fullName,
      phone,
      email,
      address,
      product_id: parseInt(productId),
      color,
      storage,
      note,
      status: 'pending',
      created_at: new Date()
    });
    return [{ insertId: newId }];
  }

  if (normalizedSql.includes('FROM pre_orders')) {
    const rows = memoryDb.pre_orders.map(po => {
      const p = memoryDb.products.find(prod => prod.id === po.product_id) || {};
      return {
        ...po,
        product_name: p.name || '',
        model: p.model || '',
        price_label: p.price_label || ''
      };
    });
    return [rows];
  }

  // 5. webhook_logs
  if (normalizedSql.includes('INSERT INTO webhook_logs')) {
    const [eventType, sessionId, payload, ipAddress, userAgent] = params;
    memoryDb.webhook_logs.push({
      id: memoryDb.webhookAutoId++,
      event_type: eventType,
      session_id: sessionId,
      payload: typeof payload === 'string' ? JSON.parse(payload) : payload,
      ip_address: ipAddress,
      user_agent: userAgent,
      created_at: new Date()
    });
    return [{ affectedRows: 1 }];
  }

  if (normalizedSql.includes('FROM webhook_logs')) {
    return [memoryDb.webhook_logs];
  }

  return [[]];
}

const poolWrapper = {
  async query(sql, params) {
    if (isConnected && pool) {
      try {
        return await pool.query(sql, params);
      } catch (err) {
        console.error('MySQL query error, using in-memory mock:', err.message);
        return await mockQuery(sql, params);
      }
    } else {
      return await mockQuery(sql, params);
    }
  },
  async getConnection() {
    if (isConnected && pool) {
      try {
        return await pool.getConnection();
      } catch (err) {
        return {
          query: mockQuery,
          release: () => {}
        };
      }
    } else {
      return {
        query: mockQuery,
        release: () => {}
      };
    }
  }
};

async function testConnection() {
  if (!pool) {
    console.log('⚠️ DB_HOST not provided, using In-Memory Storage mode.');
    isConnected = false;
    return;
  }
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL Connected successfully.');
    conn.release();
    isConnected = true;
  } catch (err) {
    console.error('❌ Connect MySQL failed, falling back to In-Memory mode:', err.message);
    isConnected = false;
  }
}

module.exports = { pool: poolWrapper, testConnection };
