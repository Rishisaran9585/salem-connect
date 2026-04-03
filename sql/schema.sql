-- Salem Business Directory Database Schema

CREATE DATABASE IF NOT EXISTS salem_directory;
USE salem_directory;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  icon VARCHAR(100),
  image_url VARCHAR(500),
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subcategories Table
CREATE TABLE IF NOT EXISTS subcategories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Businesses Table
CREATE TABLE IF NOT EXISTS businesses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255),
  category_id INT NOT NULL,
  subcategory_id INT,
  description TEXT,
  address TEXT,
  area VARCHAR(100),
  city VARCHAR(100) DEFAULT 'Salem',
  state VARCHAR(100) DEFAULT 'Tamil Nadu',
  pincode VARCHAR(10),
  mobile VARCHAR(15) NOT NULL,
  mobile_alt VARCHAR(15),
  email VARCHAR(255),
  website VARCHAR(255),
  logo_url VARCHAR(500),
  status ENUM('pending','approved','rejected','suspended') DEFAULT 'pending',
  verified BOOLEAN DEFAULT FALSE,
  your_name VARCHAR(255),
  your_email VARCHAR(255),
  message TEXT,
  payment_id VARCHAR(100),
  payment_status ENUM('pending','paid','failed') DEFAULT 'pending',
  payment_amount DECIMAL(10,2) DEFAULT 150.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category_id),
  INDEX idx_status (status),
  INDEX idx_slug (slug)
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  reason VARCHAR(100),
  your_name VARCHAR(255),
  is_owner BOOLEAN,
  business_name VARCHAR(255),
  business_category VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  mobile VARCHAR(15),
  mobile_alt VARCHAR(15),
  email VARCHAR(255),
  website VARCHAR(255),
  message TEXT,
  status ENUM('new','read','resolved') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('superadmin','admin','moderator') DEFAULT 'admin',
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  business_id INT,
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'INR',
  status ENUM('created','paid','failed') DEFAULT 'created',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (business_id) REFERENCES businesses(id)
);

-- Default Admin (Password: admin123)
INSERT INTO admins (name, email, password_hash, role) 
VALUES ('Super Admin', 'admin@salemdir.in', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'superadmin')
ON DUPLICATE KEY UPDATE email=email;
