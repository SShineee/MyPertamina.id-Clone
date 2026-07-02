-- MyPertamina Clone - Database Schema
-- Run this against the database named in DB_NAME (see .env.example)

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(100) NOT NULL UNIQUE, -- e.g. "price.update", "content.manage"
  description VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS fuel_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fuel_type VARCHAR(50) NOT NULL UNIQUE, -- e.g. "Pertalite", "Pertamax", "Solar"
  price DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20) NOT NULL DEFAULT 'liter',
  updated_by INT DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS bright_gas_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  province VARCHAR(100) NOT NULL UNIQUE,
  price_5_5kg DECIMAL(10, 2) DEFAULT NULL, -- NULL = tidak tersedia SPBE di wilayah tersebut
  price_12kg DECIMAL(10, 2) DEFAULT NULL,
  updated_by INT DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS fuel_price_matrix (
  id INT AUTO_INCREMENT PRIMARY KEY,
  province VARCHAR(100) NOT NULL UNIQUE,
  is_ftz BOOLEAN NOT NULL DEFAULT FALSE, -- Free Trade Zone (mis. Batam, Bintan, Karimun)
  pertalite DECIMAL(10, 2) DEFAULT NULL,
  pertamax DECIMAL(10, 2) DEFAULT NULL,
  pertamax_turbo DECIMAL(10, 2) DEFAULT NULL,
  biosolar_subsidi DECIMAL(10, 2) DEFAULT NULL,
  biosolar_nonsubsidi DECIMAL(10, 2) DEFAULT NULL,
  pertamax_pertashop DECIMAL(10, 2) DEFAULT NULL, -- NULL = produk tidak dijual di provinsi tersebut
  updated_by INT DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS benefit_page_content (
  id INT PRIMARY KEY DEFAULT 1, -- singleton row, selalu id = 1
  hero_video_id VARCHAR(50) DEFAULT NULL,
  mascot_video_id VARCHAR(50) DEFAULT NULL,
  mascot_jiffy_image VARCHAR(500) DEFAULT NULL,
  mascot_campaign_image VARCHAR(500) DEFAULT NULL,
  loyalty_image VARCHAR(500) DEFAULT NULL,
  guide_image VARCHAR(500) DEFAULT NULL,
  guide_pdf_url VARCHAR(500) DEFAULT NULL,
  final_illustration VARCHAR(500) DEFAULT NULL,
  google_play_url VARCHAR(500) DEFAULT NULL,
  app_store_url VARCHAR(500) DEFAULT NULL,
  solution_cards JSON DEFAULT NULL,
  feature_slides JSON DEFAULT NULL,
  payment_methods JSON DEFAULT NULL,
  social_links JSON DEFAULT NULL,
  checklist_features JSON DEFAULT NULL,
  updated_by INT DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS contents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('promo', 'banner', 'berita') NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT DEFAULT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  start_date DATE DEFAULT NULL,
  end_date DATE DEFAULT NULL,
  created_by INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
