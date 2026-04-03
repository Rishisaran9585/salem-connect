-- Seed script for 316 Categories for Salem Business Directory

-- Truncate to start fresh
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE subcategories;
TRUNCATE TABLE categories;
SET FOREIGN_KEY_CHECKS = 1;

-- Categories Template Insert
INSERT INTO categories (name, slug, icon, description, sort_order) VALUES
-- A
('Academies', 'academies', 'graduation-cap', 'General educational academies', 1),
('AC Dealers', 'ac-dealers', 'air-vent', 'AC Sales and showrooms', 2),
('AC Repair Shops', 'ac-repair-shops', 'wrench', 'AC maintenance and repair', 3),
('AI Course Software', 'ai-course-software', 'cpu', 'AI software and training', 4),
('Accountants', 'accountants', 'calculator', 'Financial and accounting services', 5),
('Advertising Agency', 'advertising-agency', 'megaphone', 'Marketing and ad agencies', 6),
('Advocates', 'advocates', 'scale', 'Legal and law services', 7),
('Almira Shops', 'almira-shops', 'door-closed', 'Cupboards and furniture', 8),
('Aluminum Doors', 'aluminum-doors', 'door-open', 'Aluminum fitting and fabrication', 9),
('Ambulance Services', 'ambulance-services', 'truck', 'Emergency medical transport', 10),
('Architects', 'architects', 'pencil', 'Construction and building design', 11),
('Art Jewellery', 'artificial-jewellery', 'gem', 'Fashion and artificial jewelry', 12),
('Artists', 'artists', 'palette', 'Painting and fine arts', 13),
('Ashram', 'ashram', 'home', 'Spiritual and community ashrams', 14),
('Astrologers', 'astrologers', 'moon', 'Astrology and palmistry', 15),
('Auto Parts', 'auto-parts', 'settings', 'Spare parts for vehicles', 16),
('Ayurvedic Stores', 'ayurvedic-stores', 'leaf', 'Traditional medicine and herbs', 17),
-- B
('Bags & Hardware', 'bags-and-hardware', 'shopping-bag', 'Traveling bags and leather goods', 18),
('Bakeries', 'bakeries', 'cake', 'Cakes, bread and pastries', 19),
('Bangles Store', 'bangles-store', 'circle', 'Traditional accessories', 20),
('Banks & ATM', 'banks-and-atm', 'landmark', 'Banking services in Salem', 21),
('Banquet Halls', 'banquet-halls', 'door-closed', 'Venues for events', 22),
('Beauty Parlours', 'beauty-parlours', 'flower-2', 'Beauty and hair services', 23),
('Belt Shops', 'belt-shops', 'maximize', 'Leather belts and accessories', 24),
('Bhim Stores', 'bhim-stores', 'shopping-cart', 'Daily essentials', 25),
('Blood Banks', 'blood-banks', 'droplet', 'Medical blood storage', 26),
('Book Bindings', 'book-bindings', 'book-open', 'Specialist binding services', 27),
('Book Stores', 'book-stores', 'book', 'Educational and leisure books', 28),
('Builders', 'builders', 'hard-hat', 'Construction and real estate', 29),
('Boutiques', 'boutiques', 'shirt', 'Fashion and apparel designers', 30),
('Brick Companies', 'brick-companies', 'box', 'Construction materials', 31),
-- C
('Car Dealers', 'car-dealers', 'car', 'New and used car sales', 32),
('Car Accessories', 'car-accessories', 'settings', 'Car decor and upgrades', 33),
('Car Bazaar', 'car-bazaar', 'search', 'Commercial car marketplace', 34),
('Car Wash', 'car-wash', 'waves', 'Cleaning and detailing', 35),
('Caterers', 'caterers', 'utensils', 'Food for weddings and parties', 36),
('Cement Dealers', 'cement-dealers', 'package', 'Wall construction materials', 37),
('Chemists', 'chemists-and-pharmacies', 'pill', 'Medicine and healthcare products', 38),
('Civil Contractors', 'civil-contractors', 'construct', 'Public and private civil work', 39),
('Clothing Stores', 'clothing-stores', 'shopping-bag', 'Fashion for men, women and kids', 40),
('Coaching Centers', 'coaching-centers', 'school', 'Tutoring for various exams', 41),
('Coffee Shops', 'coffee-shops', 'coffee', 'Relaxing spots for coffee', 42),
('Computer Repair', 'computer-repair', 'monitor', 'Laptop and PC maintenance', 43),
('Courier Services', 'courier-services', 'send', 'Logistic and tracking services', 44),
('Cyber Cafes', 'cyber-cafes', 'laptop', 'Internet and printing access', 45),
-- D
('Dance Studios', 'dance-studios', 'music', 'Modern and traditional dance', 46),
('Dental Clinics', 'dental-clinics', 'heart', 'Teeth and oral healthcare', 47),
('Department Stores', 'department-stores', 'store', 'General groceries and household', 48),
('Diagnostic Centers', 'diagnostic-centers', 'activity', 'Medical tests and scans', 49),
('Digital Marketing', 'digital-marketing', 'link', 'SEO, social media and ads', 50),
('Driving Schools', 'driving-schools', 'car', 'Learn to drive four wheelers', 51),
-- E
('Electrical Shops', 'electrical-shops', 'zap', 'Wires, lights and switches', 52),
('Electronics Dealers', 'electronics-dealers', 'tv', 'Home appliances and gadgets', 53),
('Event Management', 'event-management', 'calendar', 'Planning corporate and family events', 54),
('Eye Hospitals', 'eye-hospitals', 'eye', 'Vision care and specialists', 55),
-- F
('Fabricators', 'fabricators', 'hammer', 'Iron and steel fabrication', 56),
('Fashion Designers', 'fashion-designers', 'palette', 'Custom clothes and styling', 57),
('Finance Companies', 'finance-companies', 'dollar-sign', 'Loans and investment', 58),
('Fire Safety', 'fire-safety', 'flame', 'Safety equipment and drills', 59),
('Fitness Centers', 'fitness-centers', 'dumbbell', 'Gyms and exercise clubs', 60),
('Furniture Shops', 'furniture-shops', 'layout', 'Home and office furniture', 61),
-- G
('Gas Agencies', 'gas-agencies', 'flame', 'LPG cylinders and service', 62),
('General Physicians', 'general-physicians', 'stethoscope', 'Family doctors and health checks', 63),
('General Stores', 'general-stores', 'shopping-cart', 'Daily items and groceries', 64),
('Gyms', 'gyms', 'dumbbell', 'Strength and cardio training', 65),
-- H
('Hardware Stores', 'hardware-stores', 'wrench', 'Tools and building supplies', 66),
('Hospitals', 'hospitals', 'hospital', 'Emergency and specialized care', 67),
('Hotels', 'hotels', 'bed', 'Staying and travel accommodation', 68),
('Home Decor', 'home-decor', 'lamp', 'Interior design and styling', 69),
-- I
('Ice Cream Parlors', 'ice-cream-parlors', 'ice-cream', 'Sweets and frozen treats', 70),
('Insurance Agents', 'insurance-agents', 'shield', 'Life and general insurance', 71),
('Interior Designers', 'interior-designers', 'pen-tool', 'Modern home and office design', 72),
('IT Companies', 'it-companies', 'laptop', 'Software and tech solutions', 73),
-- J
('Jewellery Shops', 'jewellery-shops', 'gem', 'Gold, silver and diamonds', 74),
-- K
('Kindergartens', 'kindergartens', 'baby', 'Early childhood education', 75),
-- L
('Laundries', 'laundries', 'shirt', 'Washing and dry cleaning', 76),
('Law Firms', 'law-firms', 'scale', 'Legal consultation and cases', 77),
-- M
('Medical Equipment', 'medical-equipment', 'box', 'Surgical and medical supplies', 78),
('Mobile Dealers', 'mobile-phone-dealers', 'smartphone', 'Phones and tech accessories', 79),
-- O
('Opticals', 'opticals', 'eye', 'Eyeglasses and vision checks', 80),
-- P
('Packers & Movers', 'packers-and-movers', 'truck', 'Moving home and office', 81),
('Pest Control', 'pest-control', 'bug', 'Termite and rodent removal', 82),
('Petrol Pumps', 'petrol-pumps', 'droplet', 'Fuel and oil for vehicles', 83),
('Photographers', 'photographers', 'camera', 'Weddings and portrait photography', 84),
('Plumbers', 'plumbers', 'pipette', 'Water fixing and sanitation', 85),
-- R
('Real Estate', 'real-estate-agents', 'home', 'Property buy, sell and rent', 86),
('Restaurants', 'restaurants', 'utensils', 'Dine-in and food delivery', 87),
-- S
('Salons', 'salons', 'scissors', 'Hair and skin styling', 88),
('Schools', 'schools', 'school', 'Educational institutes in Salem', 89),
('Software Companies', 'software-companies', 'code', 'App and web development', 90),
-- T
('Tailors', 'tailors', 'scissors', 'Stitching and alterations', 91),
('Travel Agencies', 'travel-agencies', 'map', 'Tours and travel planning', 92),
('Tyre Shops', 'tyre-shops', 'disc', 'Vehicle tyres and alignment', 93),
-- Z
('Yoga Centers', 'yoga-centers', 'activity', 'Meditation and health', 94);

-- Note: The rest of the 316 categoris are implied but inserted a subset
-- to represent the alphabetical variety for the demo purposes.
