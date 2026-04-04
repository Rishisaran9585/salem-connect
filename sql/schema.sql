CREATE DATABASE IF NOT EXISTS salem_directory;
USE salem_directory;

-- 1. Admin Users
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    icon VARCHAR(100) DEFAULT 'folder',
    image_url TEXT,
    description TEXT,
    sort_order INT DEFAULT 0,
    is_active TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2.1 Subcategories
CREATE TABLE IF NOT EXISTS subcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    is_active TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 3. Businesses
CREATE TABLE IF NOT EXISTS businesses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    subcategory_id INT,
    business_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    owner_name VARCHAR(255),
    description TEXT,
    address TEXT,
    area VARCHAR(255),
    city VARCHAR(100) DEFAULT 'Salem',
    state VARCHAR(100) DEFAULT 'Tamil Nadu',
    pincode VARCHAR(20),
    mobile VARCHAR(20) NOT NULL,
    mobile_alt VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    logo_url TEXT,
    banner_url TEXT,
    is_verified TINYINT DEFAULT 0,
    status ENUM('pending', 'active', 'rejected') DEFAULT 'pending',
    your_name VARCHAR(255),
    your_email VARCHAR(255),
    message TEXT,
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    payment_amount DECIMAL(10, 2) DEFAULT 150.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL
);

-- 4. Hero Slides
CREATE TABLE IF NOT EXISTS hero_slides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url TEXT NOT NULL,
    title VARCHAR(255),
    subtitle TEXT,
    sort_order INT DEFAULT 0,
    is_active TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Contacts / Inquiries
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    business_name VARCHAR(255),
    is_owner TINYINT DEFAULT 0,
    reason VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Settings
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(255) UNIQUE NOT NULL,
    `value` LONGTEXT,
    data_type VARCHAR(50) DEFAULT 'string',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Default Admin (Password: admin123 - hashed using typical password_hash in PHP)
-- Note: Replace with actual hash later
INSERT IGNORE INTO admins (username, email, password) VALUES ('admin', 'admin@salemdir.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert Initial Categories (Matches Frontend Examples)
INSERT IGNORE INTO categories (name, slug, icon) VALUES 
('Hospitals', 'hospitals', 'hospital'),
('Textiles', 'textiles', 'shirt'),
('Agriculture', 'agriculture', 'leaf'),
('Steel', 'steel', 'factory'),
('Real Estate', 'real-estate', 'home'),
('Education', 'education', 'graduation-cap');
