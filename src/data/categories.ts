import {
  Car, GraduationCap, UtensilsCrossed, Heart, Cpu, Landmark,
  ShoppingBag, Briefcase, HardHat, Shirt, PartyPopper, Monitor,
  Wrench, Palette, Home, Scale, Stethoscope, Dumbbell,
  Camera, Plane, BookOpen, Scissors, Baby, Dog, Flower2,
  Music, Gem, ShieldCheck, Truck, Wifi
} from "lucide-react";

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: any;
  count: number;
  description: string;
}

export interface Business {
  id: number;
  slug: string;
  businessName: string;
  ownerName: string;
  categoryId: number;
  categoryName: string;
  description: string;
  address: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
  mobileAlt?: string;
  email?: string;
  website?: string;
  verified: boolean;
  status: "approved";
}

export const featuredCategories: Category[] = [
  { id: 1, name: "Automotive & Vehicles", slug: "automotive-vehicles", icon: Car, count: 245, description: "Car dealers, auto parts, repair shops, and vehicle services" },
  { id: 2, name: "Education & Academies", slug: "education-academies", icon: GraduationCap, count: 312, description: "Schools, coaching centers, tutors, and training institutes" },
  { id: 3, name: "Food & Beverages", slug: "food-beverages", icon: UtensilsCrossed, count: 520, description: "Restaurants, bakeries, catering, and food delivery" },
  { id: 4, name: "Health & Medical", slug: "health-medical", icon: Heart, count: 380, description: "Hospitals, clinics, pharmacies, and diagnostic centers" },
  { id: 5, name: "Electronics & Tech", slug: "electronics-tech", icon: Cpu, count: 198, description: "Computer repair, mobile dealers, and IT services" },
  { id: 6, name: "Finance & Banking", slug: "finance-banking", icon: Landmark, count: 156, description: "Banks, insurance agents, chartered accountants" },
  { id: 7, name: "Retail & General Stores", slug: "retail-general", icon: ShoppingBag, count: 430, description: "Department stores, general stores, and retail chains" },
  { id: 8, name: "Professional Services", slug: "professional-services", icon: Briefcase, count: 275, description: "Lawyers, consultants, HR firms, and business services" },
  { id: 9, name: "Construction", slug: "construction", icon: HardHat, count: 167, description: "Builders, contractors, cement dealers, and architects" },
  { id: 10, name: "Clothing & Fashion", slug: "clothing-fashion", icon: Shirt, count: 340, description: "Boutiques, tailors, fashion designers, and textile shops" },
  { id: 11, name: "Events & Entertainment", slug: "events-entertainment", icon: PartyPopper, count: 123, description: "Event planners, DJs, photographers, and banquet halls" },
  { id: 12, name: "Technology", slug: "technology", icon: Monitor, count: 189, description: "Software companies, digital agencies, and IT solutions" },
];

export const allCategories: Category[] = [
  ...featuredCategories,
  { id: 13, name: "Home Services", slug: "home-services", icon: Wrench, count: 210, description: "Plumbers, electricians, pest control, and home repair" },
  { id: 14, name: "Arts & Crafts", slug: "arts-crafts", icon: Palette, count: 87, description: "Artists, craft shops, and handmade goods" },
  { id: 15, name: "Real Estate", slug: "real-estate", icon: Home, count: 156, description: "Property dealers, builders, and rental services" },
  { id: 16, name: "Legal Services", slug: "legal-services", icon: Scale, count: 98, description: "Advocates, notaries, and legal consultants" },
  { id: 17, name: "Wellness & Spa", slug: "wellness-spa", icon: Stethoscope, count: 134, description: "Ayurvedic centers, spas, and wellness clinics" },
  { id: 18, name: "Fitness & Sports", slug: "fitness-sports", icon: Dumbbell, count: 112, description: "Gyms, sports academies, and fitness centers" },
  { id: 19, name: "Photography", slug: "photography", icon: Camera, count: 76, description: "Photographers, studios, and photo printing" },
  { id: 20, name: "Travel & Tourism", slug: "travel-tourism", icon: Plane, count: 95, description: "Travel agencies, tour operators, and cab services" },
  { id: 21, name: "Books & Stationery", slug: "books-stationery", icon: BookOpen, count: 64, description: "Bookstores, stationery shops, and printing presses" },
  { id: 22, name: "Beauty & Salon", slug: "beauty-salon", icon: Scissors, count: 189, description: "Beauty parlors, salons, and grooming services" },
  { id: 23, name: "Kids & Baby", slug: "kids-baby", icon: Baby, count: 78, description: "Kindergartens, toy shops, and children's wear" },
  { id: 24, name: "Pet Services", slug: "pet-services", icon: Dog, count: 43, description: "Veterinary clinics, pet shops, and grooming" },
  { id: 25, name: "Florists & Gifts", slug: "florists-gifts", icon: Flower2, count: 67, description: "Flower shops, gift stores, and event decorators" },
  { id: 26, name: "Music & Instruments", slug: "music-instruments", icon: Music, count: 45, description: "Music shops, instrument dealers, and classes" },
  { id: 27, name: "Jewellery", slug: "jewellery", icon: Gem, count: 134, description: "Gold shops, artificial jewellery, and watch dealers" },
  { id: 28, name: "Security Services", slug: "security-services", icon: ShieldCheck, count: 56, description: "Security agencies, CCTV dealers, and fire safety" },
  { id: 29, name: "Transport & Logistics", slug: "transport-logistics", icon: Truck, count: 89, description: "Packers & movers, courier services, and cargo" },
  { id: 30, name: "Internet & Telecom", slug: "internet-telecom", icon: Wifi, count: 72, description: "ISP providers, DTH services, and mobile recharge" },
];

export const alphabetCategories: Record<string, string[]> = {
  A: ["Academies", "AC Dealers", "AC Repair Shops", "Accountants", "Advertising Agency", "Advocates", "Almira Shops", "Aluminum Door Shops", "Ambulance Services", "Architects", "Artificial Jewellery", "Artists", "Ashram", "Astrologers", "Auto Parts Shops", "Ayurvedic Stores"],
  B: ["Bags & Hardware", "Bakeries", "Bangles Store", "Banks & ATM", "Banquet Halls", "Beauty Parlours", "Belt Shops", "Blood Banks", "Book Binding", "Book Stores", "Boutiques", "Brick Companies", "Builders", "Bungalows On Rent"],
  C: ["Car Dealers", "Car Accessories", "Car Washing", "Caterers", "Cement Dealers", "Chartered Accountants", "Chemists", "Civil Contractors", "Clothing Stores", "Coaching Centers", "Coffee Shops", "Computer Repair", "Courier Services", "Cyber Cafes"],
  D: ["Dance Studios", "Dental Clinics", "Department Stores", "Diagnostic Centers", "Digital Marketing", "Driving Schools", "Dry Cleaning", "DTH Services"],
  E: ["E-Rickshaw Dealers", "Educational Institutes", "Electrical Shops", "Electronics Dealers", "Event Management", "Eye Hospitals"],
  F: ["Fabricators", "Fashion Designers", "Finance Companies", "Fire Safety", "Fitness Centers", "Florists", "Food Delivery", "Furniture Shops"],
  G: ["Gas Agencies", "General Physicians", "General Stores", "Gifting Shops", "Gold Jewelry", "Gyms"],
  H: ["Hardware Stores", "Hospitals", "Hotels", "Home Appliances", "Home Decor", "HR Consultants"],
  I: ["Ice Cream Parlors", "Import/Export", "Insurance Agents", "Interior Designers", "IT Companies"],
  J: ["Jewellery Shops", "Juice Bars", "Jute Products"],
  K: ["Kindergartens", "Kitchen Appliances", "Knitting Classes"],
  L: ["Language Classes", "Laundries", "Law Firms", "Leather Goods", "LED Lighting", "Libraries"],
  M: ["Medical Equipment", "Mobile Dealers", "Motor Repair", "Music Shops", "Mutton Shops"],
  N: ["Nursing Homes", "Nurseries", "Newspaper Agencies", "Neon Signs"],
  O: ["Opticals", "Organic Stores", "Office Supplies"],
  P: ["Packers & Movers", "Paint Shops", "Pest Control", "Petrol Pumps", "Photographers", "Physiotherapy", "Plumbers", "Printing Press", "Property Dealers"],
  Q: ["Quality Testing Labs"],
  R: ["Real Estate Agents", "Restaurants", "Retail Chains", "Roofing Services"],
  S: ["Salons", "Schools", "Security Agencies", "Software Companies", "Sports Shops", "Steel Dealers", "Supermarkets"],
  T: ["Tailors", "Temples", "Travel Agencies", "Tutors", "Tyre Shops", "Textile Shops"],
  U: ["Uniform Shops", "UPS Dealers", "Used Car Dealers"],
  V: ["Veterinary Clinics", "Video Production", "Visa Services"],
  W: ["Wedding Planners", "Water Purifiers", "Welding Shops"],
  X: ["Xerox Shops"],
  Y: ["Yoga Centers", "Youth Hostels"],
  Z: ["Zari Work", "Zinc Dealers"],
};

export const sampleBusinesses: Business[] = [
  { id: 1, slug: "sri-lakshmi-textiles", businessName: "Sri Lakshmi Textiles", ownerName: "R. Senthil Kumar", categoryId: 10, categoryName: "Clothing & Fashion", description: "Premium textile showroom offering sarees, dress materials, and ready-made garments for men, women, and children. Serving Salem since 1985.", address: "45, Omalur Main Road, Near Bus Stand", area: "Omalur Road", city: "Salem", state: "Tamil Nadu", pincode: "636001", mobile: "+91 94422 12345", mobileAlt: "+91 427 2312345", email: "info@srilakshmitextiles.com", website: "www.srilakshmitextiles.com", verified: true, status: "approved" },
  { id: 2, slug: "global-it-solutions", businessName: "Global IT Solutions", ownerName: "M. Pradeep", categoryId: 12, categoryName: "Technology", description: "Full-service IT company offering web development, mobile app development, digital marketing, and cloud solutions.", address: "12, Cherry Road, 2nd Floor", area: "Cherry Road", city: "Salem", state: "Tamil Nadu", pincode: "636007", mobile: "+91 98765 43210", email: "contact@globalit.in", website: "www.globalit.in", verified: true, status: "approved" },
  { id: 3, slug: "annapoorna-restaurant", businessName: "Annapoorna Restaurant", ownerName: "K. Murugan", categoryId: 3, categoryName: "Food & Beverages", description: "Famous South Indian vegetarian restaurant known for authentic Tamil cuisine. Special dosa varieties and traditional meals.", address: "78, Junction Main Road", area: "Five Roads", city: "Salem", state: "Tamil Nadu", pincode: "636004", mobile: "+91 94433 55678", verified: true, status: "approved" },
  { id: 4, slug: "salem-dental-care", businessName: "Salem Dental Care", ownerName: "Dr. P. Ramesh", categoryId: 4, categoryName: "Health & Medical", description: "Advanced dental clinic with modern equipment. Specializing in orthodontics, implants, root canal, and cosmetic dentistry.", address: "23, Saradha College Road", area: "Fairlands", city: "Salem", state: "Tamil Nadu", pincode: "636016", mobile: "+91 98432 11234", email: "info@salemdentalcare.in", website: "www.salemdentalcare.in", verified: true, status: "approved" },
  { id: 5, slug: "raja-motors", businessName: "Raja Motors", ownerName: "S. Rajeshwaran", categoryId: 1, categoryName: "Automotive & Vehicles", description: "Authorized dealer for two-wheelers and spare parts. Expert mechanics for all bike brands with genuine parts.", address: "156, Attur Main Road", area: "Ammapet", city: "Salem", state: "Tamil Nadu", pincode: "636003", mobile: "+91 94421 67890", verified: false, status: "approved" },
  { id: 6, slug: "bright-future-academy", businessName: "Bright Future Academy", ownerName: "V. Lakshmi", categoryId: 2, categoryName: "Education & Academies", description: "Leading coaching center for NEET, JEE, and competitive exam preparation. Experienced faculty with proven results.", address: "34, Brinda Nagar, Near Railway Station", area: "Junction", city: "Salem", state: "Tamil Nadu", pincode: "636001", mobile: "+91 97889 45612", email: "brightfuture@gmail.com", verified: true, status: "approved" },
  { id: 7, slug: "kovai-electricals", businessName: "Kovai Electricals", ownerName: "T. Shanmugam", categoryId: 5, categoryName: "Electronics & Tech", description: "Complete electrical solutions - wiring, panel boards, motor rewinding, and electrical appliance sales & service.", address: "89, Gugai Main Road", area: "Gugai", city: "Salem", state: "Tamil Nadu", pincode: "636006", mobile: "+91 94423 78901", verified: true, status: "approved" },
  { id: 8, slug: "meenakshi-finance", businessName: "Meenakshi Finance", ownerName: "N. Subramanian", categoryId: 6, categoryName: "Finance & Banking", description: "Trusted financial services company providing personal loans, business loans, and investment advisory since 1992.", address: "67, Fort Main Road", area: "Fort", city: "Salem", state: "Tamil Nadu", pincode: "636001", mobile: "+91 98765 12340", mobileAlt: "+91 427 2267890", verified: true, status: "approved" },
  { id: 9, slug: "new-india-builders", businessName: "New India Builders", ownerName: "A. Karthik", categoryId: 9, categoryName: "Construction", description: "Premier construction company specializing in residential apartments, commercial complexes, and individual houses.", address: "102, Hasthampatti Main Road", area: "Hasthampatti", city: "Salem", state: "Tamil Nadu", pincode: "636007", mobile: "+91 94422 90123", email: "info@newindiabuilders.com", website: "www.newindiabuilders.com", verified: true, status: "approved" },
  { id: 10, slug: "grand-events", businessName: "Grand Events", ownerName: "L. Deepika", categoryId: 11, categoryName: "Events & Entertainment", description: "Complete event management solutions for weddings, corporate events, birthday parties, and cultural programs.", address: "45, Alagapuram Main Road", area: "Alagapuram", city: "Salem", state: "Tamil Nadu", pincode: "636004", mobile: "+91 87654 32100", email: "hello@grandevents.in", verified: true, status: "approved" },
  { id: 11, slug: "salem-supermarket", businessName: "Salem Supermarket", ownerName: "G. Vignesh", categoryId: 7, categoryName: "Retail & General Stores", description: "One-stop supermarket for groceries, household essentials, fresh vegetables, and imported products.", address: "200, Fairlands Main Road", area: "Fairlands", city: "Salem", state: "Tamil Nadu", pincode: "636016", mobile: "+91 94433 11223", verified: true, status: "approved" },
  { id: 12, slug: "advocate-kumar-associates", businessName: "Advocate Kumar & Associates", ownerName: "Adv. R. Kumar", categoryId: 8, categoryName: "Professional Services", description: "Experienced law firm handling civil, criminal, family, and property disputes. Free legal consultation available.", address: "Court Complex, 1st Floor", area: "Court Road", city: "Salem", state: "Tamil Nadu", pincode: "636001", mobile: "+91 98432 55667", email: "advocatekumar@gmail.com", verified: true, status: "approved" },
];

export const partnerCities = [
  "Tiruchirappalli", "Tirupur", "Thoothukudi", "Vellore", "Erode", "Namakkal",
  "Dharmapuri", "Krishnagiri", "Coimbatore", "Madurai", "Thanjavur", "Dindigul",
  "Karur", "Perambalur", "Ariyalur", "Villupuram", "Cuddalore", "Nagapattinam"
];
