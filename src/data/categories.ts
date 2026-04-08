import {
  Car, GraduationCap, UtensilsCrossed, Heart, Cpu, Landmark,
  ShoppingBag, Briefcase, HardHat, Shirt, PartyPopper, Monitor,
  Wrench, Palette, Home, Scale, Stethoscope, Dumbbell,
  Camera, Plane, BookOpen, Scissors, Baby, Dog, Flower2,
  Music, Gem, ShieldCheck, Truck, Wifi
} from "lucide-react";
import { type LucideIcon } from "lucide-react";


export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: LucideIcon;
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

const initialAlphabetCategories: Record<string, string[]> = {
  A: ["❄️ AC Dealers", "🔧 AC Repair Shops", "🫁 AI Cancer Detection Software Dealers", "🎓 Academies", "📐 Academy - Architect", "🏦 Academy - Banking", "🧬 Academy - Biology", "📊 Academy - Commerce", "💻 Academy - Computer", "🏏 Academy - Cricket", "💃 Academy - Dance", "🪖 Academy - Defence", "📈 Academy - Economics", "🗣️ Academy - English Speaking", "👗 Academy - Fashion Designing", "🎨 Academy - Fine Arts", "🌐 Academy - Foreign Language", "🎸 Academy - Guitar", "✍️ Academy - Handwriting", "🎹 Academy - Harmonium", "📋 Academy - IAS Coaching", "📝 Academy - IELTS", "🥋 Academy - Judo Karate", "➗ Academy - Maths", "🎵 Academy - Music", "🔬 Academy - NEET & IIT-JEE", "⚛️ Academy - Physics", "📜 Academy - SSC Coaching", "🏆 Academy - Sports", "🧾 Accountants", "📣 Advertising Agency", "⚖️ Advocates", "🗄️ Almirah Shops", "🚪 Aluminium Door Shops", "🚑 Ambulance Services", "📐 Architects", "💎 Artificial Jewellery Store", "🎨 Artists", "🙏 Ashram", "🔮 Astrologers", "🔩 Auto Parts Shops", "🌿 Ayurvedic Store (Pansari)"],
  B: ["👜 Bags & Suitcases", "🥐 Bakeries", "💍 Bangles Store", "🏦 Banks & ATM", "🏛️ Banquet Halls", "💅 Beauty Parlours", "👔 Belt Shops", "🍛 Bhojnalaya", "🚲 Bicycle Shops", "🌿 Bio Products", "👆 Biometric Device Shops", "🩸 Blood Banks", "📗 Book Binding Shops", "📚 Book Stores", "⛏️ Borewell Contractors", "👒 Boutiques", "🧱 Bricks Companies", "🏚️ Builders", "🏡 Bungalows On Rent"],
  C: ["📹 CCTV Camera Dealers", "🖥️ CSC (Common Service Centers)", "🎂 Cake Shops", "🚿 Car & Bike Washing Services", "✨ Car Accessories & Decor", "🚘 Car Bazaar", "🚗 Car Dealers", "🚗 Car Driving Schools", "🧭 Career Counsellors", "🪚 Carpenters", "🟫 Carpet Shops", "🍽️ Caterers", "🪨 Cement Dealers", "📜 Certification Services", "🪑 Chair Shops", "📊 Chartered Accountants", "⚗️ Chemical Dealers", "🎬 Cinema Halls", "🧵 Cloth Collection Shops", "🏪 Cloth Emporium Shops", "🏠 Cloth House Shops", "🧶 Cloth Textile Shops", "🏫 Coaching Institutes", "⬛ Coal Merchants", "🎓 Colleges", "🏘️ Community Centres", "🖨️ Computer Printer Dealers", "🖥️ Computer Shops", "🏢 Concrete Flooring Contractors", "💼 Consultancy Firms", "📦 Corrugated Box Manufacturers", "💄 Cosmetic Shops", "🧮 Cost Accountants", "📦 Courier Services", "🍽️ Crockery Shops", "🪟 Curtain Shops", "🌐 Cyber Cafe & Internet", "🔐 Cyber Security Services"],
  D: ["🎧 DJ Services", "🧹 Deep Cleaning Services", "🏬 Departmental Stores", "🕵️ Detective Agencies", "⚖️ Dharam Kanta", "🙏 Dharamshalas", "🥤 Disposable Crockery Shops", "🖐️ Doctors - Acupressure", "👂 Doctors - Audiologist & Speech", "🌿 Doctors - Ayurvedic", "❤️ Doctors - Cardiologist", "👶 Doctors - Child Specialist", "🏥 Doctors - Clinics", "🦷 Doctors - Dentist", "👃 Doctors - ENT", "🧪 Doctors - Endocrinologist", "👁️ Doctors - Eye Specialist", "🫃 Doctors - Gastroenterologist", "🩺 Doctors - General Surgeon", "🤰 Doctors - Gynaecologist", "💈 Doctors - Hair Transplant", "💊 Doctors - Homoeopathic", "🏥 Doctors - Hospital", "🫘 Doctors - Nephrologist", "🧠 Doctors - Neuro Surgeon", "🧠 Doctors - Neurologist", "🎗️ Doctors - Oncologist", "🦴 Doctors - Orthopedic", "🧫 Doctors - Pathology Lab", "🩺 Doctors - Physician", "🏃 Doctors - Physiotherapy", "🩺 Doctors - Piles", "💉 Doctors - Plastic Surgeon", "🧠 Doctors - Psychiatrist", "🧘 Doctors - Psychologist", "🫁 Doctors - Pulmonologist", "🩻 Doctors - Radiology (MRI, X-Ray)", "🧴 Doctors - Skin", "🫀 Doctors - Urologist", "🐾 Doctors - Veterinary", "🚪 Door & Window Manufacturers", "🚰 Drainage Services", "👔 Dry Cleaners", "🥜 Dry Fruits Shops", "🧣 Dupatta Shops"],
  E: ["🛺 E Rikshaw Dealers", "💡 Electrical Shops", "⚡ Electricians", "🏭 Electronics Manufacturers", "📱 Electronics Shops", "🛗 Elevators", "📅 Event Planners", "🚢 Export Import Consultancy"],
  F: ["🎭 Fancy Dress On Rent", "💡 Fancy Light Shops", "💰 Finance Companies", "🧯 Fire Extinguisher Dealers", "🐠 Fish Aquarium Shops", "🖼️ Flex Printing", "💐 Flowers Shops", "🏭 Food Manufacturers", "🍎 Fruits Shops", "🛋️ Furniture Shops"],
  G: ["👕 Garments Shops", "🔥 Gas Agencies", "🏪 General Stores", "⚙️ Generator Dealers & Repair Services", "🫙 Ghee Dealers", "🎁 Gift Shops", "👚 Girls Wear Shops", "🪟 Glass Shops", "🥇 Gold Buyers", "🏛️ Govt Schools", "🎨 Graphic Designers", "💪 Gyms"],
  H: ["❄️ HVAC Consultants", "💈 Hair Salons", "🧩 Handicraft Shops", "🪡 Handloom Shops", "🔨 Hardware & Tools Shops", "🏠 Home Appliance Dealers", "🏡 Home Decor Shops", "🧦 Hosiery Shops", "🏨 Hotels"],
  I: ["🍦 Ice Cream Parlours", "🧊 Ice Factories", "✈️ Immigration Consultants", "🏭 Industries", "📋 Insurance Agents", "🛡️ Insurance Companies", "🏠 Interior Designers", "📡 Internet Connection Providers", "🔋 Inverter Battery Shops"],
  J: ["🏗️ JCB & Crane On Rent", "💍 Jewellers", "👔 Jobs Placement", "🥤 Juice Shops"],
  K: ["👶 Kids Cloth Shops", "👟 Kids Shoes Shops", "🛒 Kirana Stores", "🍳 Kitchen Appliance Dealers", "🍳 Kitchenware Shops", "👘 Kurta Shops"],
  L: ["🔬 Laboratory And Scientific Equipments Dealers", "👠 Ladies Footwear Shops", "👩 Ladies Suits Shops", "🗺️ Land Surveyors", "💻 Laptop Shops", "💃 Lehenga Shops", "📖 Libraries", "⚡ Lithium Battery Manufacturers"],
  M: ["🪟 Marble Dealers", "💍 Marriage Bureaus", "💊 Medical Agencies", "🩺 Medical Equipments Dealers", "⚕️ Medical Halls", "🧥 Mens Wear Shops", "🥛 Milk Dairy Shops", "📲 Mobile Repair Shops", "📱 Mobile Stores", "💱 Money Exchange"],
  N: ["📰 Newspaper Agencies", "💊 Nutritional Supplement Shops"],
  O: ["🗃️ Office Furniture Shops", "👓 Optical Shops", "🏢 Other Businesses"],
  P: ["🛏️ PG (Paying Guest)", "🌿 Paan Shops", "📦 Packers & Movers", "🎨 Paint Dealers", "📄 Paper Mart Shops", "🌳 Parks", "🐛 Pest Control Services", "🐾 Pet Shops", "💊 Pharmaceutical Companies", "🖼️ Photo Frame Shops", "📸 Photo Studios", "📷 Photographers", "📄 Photostat Xerox Shops", "🖼️ Picture Shops", "🍕 Pizza Restaurants", "🌱 Plant Nurseries", "🧸 Play Schools", "🪠 Plumbers", "🪵 Plywood Dealers", "🪔 Pooja Samagri Stores", "📮 Post Offices", "🐔 Poultry Farms", "🎨 Powder Coating Services", "🖨️ Printing Presses", "📊 Project Management Consultants", "📽️ Projectors On Rent", "🏘️ Property Dealers", "📶 Public Wifi Services", "👛 Purse Shops"],
  Q: ["Quality Control", "Quality Testing Labs", "Quarry Owners", "Quilting Services", "Quiz Clubs"],
  R: ["💧 RO Water Filters Dealers", "🧊 Refrigeration Shops", "🏃 Rehabilitation Centres", "🌴 Resorts", "🍽️ Restaurants"],
  S: ["🚰 Sanitary Stores", "🥻 Sarees Retailers", "🎒 School Dress Uniforms", "🏫 Schools", "♻️ Scrap Dealers", "💂 Security Guard Services", "🌱 Seeds Store", "🤵 Sherwanis On Rent", "👟 Shoe & Footwear Shops", "🏗️ Shuttering & Scaffolding", "🛏️ Sofa, Bed & Furniture Shops", "💾 Software Companies", "☀️ Solar Panel Dealers", "🔊 Sound Speaker Shops", "💆 Spa & Wellness", "🌶️ Spice Manufacturers", "⚽ Sports Shops", "🏅 Sports Wear Shops", "🔌 Stabilizer Dealers", "🔖 Stamp Maker Shops", "📜 Stamp Paper Shops", "✏️ Stationery Stores", "🔩 Steel Businesses", "📟 Stenography Institutes", "📈 Stock Brokers", "⛏️ Stone Crusher Dealers", "🔪 Surgical Equipment Dealers", "🍬 Sweets Shops", "🏊 Swimming Classes"],
  T: ["🔗 TMT Bar (Sariya) Dealers", "✂️ Tailors", "🚰 Tank Cleaning Service", "🖊️ Tattoo Artists", "⚖️ Tax Advocate", "☕ Tea Shops", "⛺ Tent Houses", "🥡 Tiffin Services", "🟦 Tiles Dealers", "🌲 Timber Merchants", "🔧 Tools Shops", "✈️ Tour & Travels", "🧸 Toy Shops", "🤝 Trading Companies", "🚚 Transport Companies", "🏍️ Two Wheeler Dealers", "🔧 Two Wheeler Repair & Services", "🛞 Tyre Shops"],
  U: ["Uniform Shops", "UPS Dealers", "Urgent Care", "Used Car Dealers", "Urologists", "Utensil Stores"],
  V: ["📐 Valuers & Engineers", "🧭 Vastu Consultants", "🥦 Vegetable Shops"],
  W: ["⌚ Watches Shops", "💧 Waterproofing Services", "🌐 Website Developers & Designers", "💌 Wedding Card Shops", "🔥 Welding Workshops", "🪵 Wooden Works Shops"],
  X: ["X-Ray Centers", "Xerox Shops"],
  Y: ["🧘 Yoga Classes", "Yarn Merchants", "Yearbook Printers", "Yoga Centers", "Youth Clubs", "Youth Hostels"],
  Z: ["Zari Work", "Zinc Dealers", "Zipper Manufacturers", "Zoo Authorities"]
};

// Auto-merge allCategories into alphabetCategories
export const alphabetCategories: Record<string, string[]> = { ...initialAlphabetCategories };

allCategories.forEach(cat => {
  const firstLetter = cat.name.charAt(0).toUpperCase();
  if (alphabetCategories[firstLetter]) {
    if (!alphabetCategories[firstLetter].includes(cat.name)) {
      alphabetCategories[firstLetter].push(cat.name);
      alphabetCategories[firstLetter].sort();
    }
  }
});

export const sampleBusinesses: Business[] = [];

export const partnerCities = [
  "Tiruchirappalli", "Tirupur", "Thoothukudi", "Vellore", "Erode", "Namakkal",
  "Dharmapuri", "Krishnagiri", "Coimbatore", "Madurai", "Thanjavur", "Dindigul",
  "Karur", "Perambalur", "Ariyalur", "Villupuram", "Cuddalore", "Nagapattinam"
];
