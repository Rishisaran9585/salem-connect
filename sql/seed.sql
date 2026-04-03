-- Salem Business Directory - Global Data Seeding (Businesses & Admin)

USE salem_directory;

-- Clear for fresh seeding
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE businesses;
TRUNCATE TABLE subcategories;
TRUNCATE TABLE categories;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Import 316 Categories (Subset here for the demo, can be expanded to full 316)
INSERT INTO categories (name, slug, icon, image_url, description, sort_order) VALUES
('Automotive & Vehicles', 'automotive-and-vehicles', 'car', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80', 'Car dealers, repair shops, and spare parts in Salem.', 1),
('Education & Academies', 'education-and-academies', 'graduation-cap', 'https://images.unsplash.com/photo-1523050335392-93851179ae2c?auto=format&fit=crop&q=80', 'Schools, coaching centers, and specialized academies.', 2),
('Food & Beverages', 'food-and-beverages', 'utensils', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80', 'The best restaurants, cafes, and food delivery in Salem.', 3),
('Health & Medical', 'health-and-medical', 'heart-pulse', 'https://images.unsplash.com/photo-1505751172107-16d78272330a?auto=format&fit=crop&q=80', 'Hospitals, multi-specialty clinics, and pharmacies.', 4),
('Electronics & Tech', 'electronics-and-tech', 'cpu', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80', 'Mobile shops, gadget repairs, and IT software companies.', 5),
('Finance & Banking', 'finance-and-banking', 'landmark', 'https://images.unsplash.com/photo-1611974714022-38662973719b?auto=format&fit=crop&q=80', 'Nationalized banks, ATMs, and loan agencies in Salem.', 6),
('Retail & General Stores', 'retail-and-general-stores', 'shopping-bag', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80', 'Supermarkets, general stores, and daily essentials.', 7),
('Professional Services', 'professional-services', 'briefcase', 'https://images.unsplash.com/photo-1454165833767-021901968b3d?auto=format&fit=crop&q=80', 'Chartered accountants, advocates, and business consultants.', 8),
('Construction', 'construction', 'hard-hat', 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80', 'Builders, civil contractors, and construction materials.', 9),
('Clothing & Fashion', 'clothing-and-fashion', 'shirt', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80', 'Salem silk centers, boutiques, and fashion apparel stores.', 10),
('Events & Entertainment', 'events-and-entertainment', 'party-popper', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80', 'Wedding planners, party halls, and cinematic experience.', 11),
('Technology', 'technology', 'laptop', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80', 'Software development and digital marketing companies.', 12);

-- 2. Mock Businesses (Relevant to Salem)
INSERT INTO businesses (slug, business_name, owner_name, category_id, description, address, area, mobile, email, status, verified, payment_status) VALUES
('salem-silk-center', 'Salem Silk Center', 'M. Venkatesh', 10, 'Premium silk sarees direct from Salem weavers. Hand-loomed for quality and trust.', '125, Shevapet Main Road, Salem - 636002', 'Shevapet', '+91 94432 11223', 'info@salemsilkcenter.com', 'approved', 1, 'paid'),
('golden-cafe-salem', 'The Golden Cafe', 'S. Anjali', 3, 'Fine dining restaurant serving traditional and continental cuisines in the heart of Salem.', '5-Star Junction, Sarada College Road, Salem', 'Sarada College Road', '+91 427 12244', 'contact@goldencafe.in', 'approved', 1, 'paid'),
('salem-general-hospital', 'Salem Multi-Specialty Hospital', 'Dr. Arulmani', 4, 'Advanced healthcare with state-of-the-art facilities and experienced specialists.', 'Near Collector Office, Omalur Main Road, Salem', 'Omalur Main Road', '+91 427 99881', 'hospital@salemhealth.org', 'approved', 1, 'paid'),
('rishi-software-solutions', 'Rishi Software Solutions', 'R. Saran', 12, 'Custom web development and SEO services focused on local business growth.', 'Technopark Building, Meyyanur, Salem', 'Meyyanur', '+91 98765 43210', 'dev@rishisoft.in', 'approved', 1, 'paid'),
('salem-steel-automobiles', 'Salem Steel Automobiles', 'T. Ravi', 1, 'Authorized multi-brand car dealership with full service workshop.', 'Salem-Kochi Highway, Kondalampatti, Salem', 'Kondalampatti', '+91 88700 11223', 'sales@salemsteelauto.com', 'approved', 1, 'paid');

-- 3. Mock Pending Businesses for Admin Dashboard
INSERT INTO businesses (slug, business_name, owner_name, category_id, status, payment_status, created_at) VALUES
('chennai-silk-salem-branch', 'Chennai Silks - Salem Branch', 'K. Kumar', 10, 'pending', 'paid', NOW()),
('green-groceries-mart', 'Green Groceries Mart', 'R. Radha', 7, 'pending', 'paid', NOW());

-- 4. Admin User (Password: admin123)
-- Already provided in schema but ensuring it exists
REPLACE INTO admins (id, name, email, password_hash, role) 
VALUES (1, 'Super Admin', 'admin@salemdir.in', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'superadmin');
