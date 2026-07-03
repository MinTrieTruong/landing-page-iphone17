-- iPhone 17 Landing Page — MySQL Schema
-- ================================================

CREATE DATABASE IF NOT EXISTS iphone17db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE iphone17db;

-- ================================================
-- TABLE: products
-- ================================================
CREATE TABLE IF NOT EXISTS products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)   NOT NULL,
  model       ENUM('iphone17','iphone17_pro','iphone17_pro_max','iphone_air') NOT NULL,
  price       DECIMAL(12,0)  NOT NULL,
  price_label VARCHAR(50)    NOT NULL,
  color       VARCHAR(50)    NOT NULL,
  color_hex   VARCHAR(10)    NOT NULL,
  storage     VARCHAR(20)    NOT NULL,
  image_url   VARCHAR(255)   NOT NULL,
  description TEXT,
  in_stock    BOOLEAN        NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_model (model),
  INDEX idx_color (color)
) ENGINE=InnoDB;

-- ================================================
-- TABLE: carts
-- ================================================
CREATE TABLE IF NOT EXISTS carts (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  VARCHAR(128)   NOT NULL,
  product_id  INT            NOT NULL,
  quantity    INT            NOT NULL DEFAULT 1,
  created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_session (session_id),
  UNIQUE KEY uq_session_product (session_id, product_id)
) ENGINE=InnoDB;

-- ================================================
-- TABLE: favorites
-- ================================================
CREATE TABLE IF NOT EXISTS favorites (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  VARCHAR(128)   NOT NULL,
  product_id  INT            NOT NULL,
  created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_session (session_id),
  UNIQUE KEY uq_session_product (session_id, product_id)
) ENGINE=InnoDB;

-- ================================================
-- TABLE: viewed_history
-- ================================================
CREATE TABLE IF NOT EXISTS viewed_history (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  VARCHAR(128)   NOT NULL,
  product_id  INT            NOT NULL,
  viewed_at   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_session (session_id),
  UNIQUE KEY uq_session_product (session_id, product_id)
) ENGINE=InnoDB;

-- ================================================
-- TABLE: pre_orders
-- ================================================
CREATE TABLE IF NOT EXISTS pre_orders (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  full_name     VARCHAR(150)  NOT NULL,
  phone         VARCHAR(20)   NOT NULL,
  email         VARCHAR(150)  NOT NULL,
  address       TEXT          NOT NULL,
  product_id    INT           NOT NULL,
  color         VARCHAR(50)   NOT NULL,
  storage       VARCHAR(20)   NOT NULL DEFAULT '128GB',
  note          TEXT,
  status        ENUM('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
  INDEX idx_email (email),
  INDEX idx_status (status)
) ENGINE=InnoDB;

-- ================================================
-- TABLE: webhook_logs
-- ================================================
CREATE TABLE IF NOT EXISTS webhook_logs (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  event_type  VARCHAR(50)   NOT NULL,
  session_id  VARCHAR(128),
  payload     JSON,
  ip_address  VARCHAR(45),
  user_agent  TEXT,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event (event_type),
  INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- ================================================
-- SEED DATA: products
-- ================================================
INSERT INTO products (name, model, price, price_label, color, color_hex, storage, image_url, description) VALUES
('iPhone 17',           'iphone17',         27990000, '27.990.000đ', 'Titan Đen',    '#1C1C1E', '128GB', '/images/iphone17-black.png',   'Thiết kế mỏng nhẹ, chip A19, camera 48MP'),
('iPhone 17',           'iphone17',         27990000, '27.990.000đ', 'Cát Sa Mạc',   '#C4A882', '128GB', '/images/iphone17-sand.png',    'Thiết kế mỏng nhẹ, chip A19, camera 48MP'),
('iPhone 17',           'iphone17',         27990000, '27.990.000đ', 'Xanh Trời',    '#7FB3D3', '128GB', '/images/iphone17-blue.png',    'Thiết kế mỏng nhẹ, chip A19, camera 48MP'),
('iPhone 17',           'iphone17',         27990000, '27.990.000đ', 'Ánh Sao',      '#F5F0E8', '128GB', '/images/iphone17-white.png',   'Thiết kế mỏng nhẹ, chip A19, camera 48MP'),
('iPhone 17',           'iphone17',         27990000, '27.990.000đ', 'Tím Sâu',      '#3D1F5E', '128GB', '/images/iphone17-purple.png',  'Thiết kế mỏng nhẹ, chip A19, camera 48MP'),
('iPhone 17 Pro',       'iphone17_pro',     35990000, '35.990.000đ', 'Bạc',          '#d6d6d6', '256GB', '/images/iphone17pro-silver.jpg', 'Khung titan, camera 5x, chip A19 Pro'),
('iPhone 17 Pro',       'iphone17_pro',     35990000, '35.990.000đ', 'Xanh Đậm',     '#354556', '256GB', '/images/iphone17pro-blue.png',   'Khung titan, camera 5x, chip A19 Pro'),
('iPhone 17 Pro',       'iphone17_pro',     35990000, '35.990.000đ', 'Cam Vũ Trụ',   '#d87040', '256GB', '/images/iphone17pro-orange.jpg', 'Khung titan, camera 5x, chip A19 Pro'),
('iPhone 17 Pro Max',   'iphone17_pro_max', 42990000, '42.990.000đ', 'Bạc',          '#d6d6d6', '256GB', '/images/iphone17pro-silver.jpg', 'Màn hình 6.9", pin 29 giờ, camera 5x Pro'),
('iPhone 17 Pro Max',   'iphone17_pro_max', 42990000, '42.990.000đ', 'Xanh Đậm',     '#354556', '256GB', '/images/iphone17pro-blue.png',   'Màn hình 6.9", pin 29 giờ, camera 5x Pro'),
('iPhone 17 Pro Max',   'iphone17_pro_max', 42990000, '42.990.000đ', 'Cam Vũ Trụ',   '#d87040', '256GB', '/images/iphone17pro-orange.jpg', 'Màn hình 6.9", pin 29 giờ, camera 5x Pro'),
('iPhone Air',          'iphone_air',       23990000, '23.990.000đ', 'Ánh Sao',      '#F5F0E8', '128GB', '/images/iphoneair-white.png',  'Mỏng nhất từ trước đến nay, 5.5mm'),
('iPhone Air',          'iphone_air',       23990000, '23.990.000đ', 'Titan Đen',    '#1C1C1E', '128GB', '/images/iphoneair-black.png',  'Mỏng nhất từ trước đến nay, 5.5mm'),
('iPhone Air',          'iphone_air',       23990000, '23.990.000đ', 'Hồng',         '#F4A7B9', '128GB', '/images/iphoneair-pink.png',   'Mỏng nhất từ trước đến nay, 5.5mm');
