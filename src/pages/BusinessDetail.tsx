import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
   MapPin, Phone, Globe, ShieldCheck,
   ChevronLeft, CheckCircle2,
   Clock, CreditCard, ChevronRight, Award, AlertTriangle, ListFilter, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import { sampleBusinesses, allCategories, featuredCategories } from "@/data/categories";
import { getCategoryContent } from "@/data/categoryContent";

interface Business {
   id: number;
   slug: string;
   business_name: string;
   owner_name: string;
   category_name: string;
   category_slug: string;
   description: string;
   address: string;
   area: string;
   city: string;
   state: string;
   pincode: string;
   mobile: string;
   email?: string;
   website?: string;
   verified: boolean;
   logo_url?: string;
}

const otherCities = [
  "Trichy (Tiruchirappalli)", "Tirupur (Tiruppur)", "Tuticorin (Thoothukudi)", "Chennai", 
  "Coimbatore", "Madurai", "Erode", "Tirunelveli", "Vellore", "Dindigul", "Thanjavur", 
  "Ranipet", "Sivakasi", "Karur", "Ooty", "Hosur", "Nagercoil", "Kanchipuram", 
  "Komarapalayam", "Karaikudi", "Neyveli", "Cuddalore", "Kumbakonam", "Tiruvannamalai", 
  "Ambur", "Arcot", "Ariyalur", "Chengalpattu", "Chidambaram", "Dharmapuri", 
  "Kallakurichi", "Kanyakumari", "Kodaikanal", "Krishnagiri", "Kurichi", "Mahabalipuram", 
  "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Rajapalayam", "Ramanathapuram", 
  "Sivaganga", "Tenkasi", "Theni", "Thiruvarur", "Virudhunagar", "Mayiladuthurai", "Alangulam"
];

const popularCategories = [
  "AC Dealers", "AC Repair Shops", "Academies", "Academy - Architect", "Academy - Banking", "Academy - Biology", "Academy - Commerce", "Academy - Computer", "Academy - Cricket", "Academy - Dance", "Academy - Defence", "Academy - Economics", "Academy - English Speaking", "Academy - Fashion Designing", "Academy - Fine Arts", "Academy - Foreign Language", "Academy - Guitar", "Academy - Handwriting", "Academy - Harmonium", "Academy - IAS Coaching", "Academy - IELTS", "Academy - Judo Karate", "Academy - Maths", "Academy - Music", "Academy - NEET & IIT-JEE", "Academy - Physics", "Academy - Sports", "Academy - SSC Coaching", "Accountants", "Advertising Agency", "Tax Advocate", "Advocates", "Almirah Shops", "Aluminium Door Shops", "Ambulance Services", "Architects", "Artificial Jewellery Store", "Artists", "Ashram", "Astrologers", "Auto Parts Shops", "Ayurvedic Store (Pansari)", "Bags & Suitcases", "Bakeries", "Bangles Store", "Banks & ATM", "Banquet Halls", "Beauty Parlours", "Belt Shops", "Bhojnalaya", "Bicycle Shops", "Bio Products", "Biometric Device Shops", "Blood Banks", "Book Binding Shops", "Book Stores", "Borewell Contractors", "Boutiques", "Bricks Companies", "Builders", "Bungalows On Rent", "Cake Shops", "Car Bazaar", "Car Dealers", "Car Accessories & Decor", "Car Driving Schools", "Career Counsellors", "Carpenters", "Carpet Shops", "Caterers", "CCTV Camera Dealers", "Cement Dealers", "Certification Services", "Chair Shops", "Chartered Accountants", "Chemical Dealers", "Cinema Halls", "Cloth Collection Shops", "Cloth Emporium Shops", "Cloth House Shops", "Cloth Textile Shops", "Coaching Institutes", "Coal Merchants", "Colleges", "Community Centres", "Computer Printer Dealers", "Computer Shops", "Concrete Flooring Contractors", "Consultancy Firms", "Cosmetic Shops", "Cost Accountants", "Courier Services", "Crockery Shops", "CSC (Common Service Centers)", "Curtain Shops", "Cyber Cafe & Internet", "Cyber Security Services", "Deep Cleaning Services", "Departmental Stores", "Detective Agencies", "Dharam Kanta", "Dharamshalas", "Disposable Crockery Shops", "DJ Services", "Doctors - Acupressure", "Doctors - Audiologist & Speech", "Doctors - Ayurvedic", "Doctors - Cardiologist", "Doctors - Child Specialist", "Doctors - Clinics", "Doctors - Dentist", "Doctors - Endocrinologist", "Doctors - ENT", "Doctors - Eye Specialist", "Doctors - Gastroenterologist", "Doctors - General Surgeon", "Doctors - Gynaecologist", "Doctors - Hair Transplant", "Doctors - Homoeopathic", "Doctors - Hospital", "Doctors - Pathology Lab", "Doctors - Nephrologist", "Doctors - Neuro Surgeon", "Doctors - Neurologist", "Doctors - Oncologist", "Doctors - Orthopedic", "Doctors - Physician", "Doctors - Physiotherapy", "Doctors - Piles", "Doctors - Plastic Surgeon", "Doctors - Psychiatrist", "Doctors - Psychologist", "Doctors - Pulmonologist", "Doctors - Radiology (MRI, X-Ray)", "Doctors - Skin", "Doctors - Urologist", "Doctors - Veterinary", "Drainage Services", "Dry Cleaners", "Dry Fruits Shops", "Dupatta Shops", "E Rikshaw Dealers", "Electrical Shops", "Electricians", "Electronics Manufacturers", "Electronics Shops", "Elevators", "Event Planners", "Export Import Consultancy", "Fancy Dress On Rent", "Fancy Light Shops", "Finance Companies", "Fire Extinguisher Dealers", "Fish Aquarium Shops", "Flex Printing", "Flowers Shops", "Food Manufacturers", "Fruits Shops", "Furniture Shops", "Garments Shops", "Gas Agencies", "General Stores", "Generator Dealers & Repair Services", "Ghee Dealers", "Gift Shops", "Girls Wear Shops", "Glass Shops", "Gold Buyers", "Govt Schools", "Graphic Designers", "Gyms", "Hair Salons", "Handicraft Shops", "Handloom Shops", "Hardware & Tools Shops", "Home Appliance Dealers", "Home Decor Shops", "Hosiery Shops", "Hotels", "HVAC Consultants", "Ice Cream Parlours", "Ice Factories", "Immigration Consultants", "Industries", "Insurance Agents", "Insurance Companies", "Interior Designers", "Internet Connection Providers", "Inverter Battery Shops", "JCB & Crane On Rent", "Jewellers", "Juice Shops", "Kids Cloth Shops", "Kids Shoes Shops", "Kirana Stores", "Kitchen Appliance Dealers", "Kitchenware Shops", "Kurta Shops", "Laboratory And Scientific Equipments Dealers", "Ladies Footwear Shops", "Ladies Suits Shops", "Land Surveyors", "Laptop Shops", "Lehenga Shops", "Libraries", "Lithium Battery Manufacturers", "AI Cancer Detection Software Dealers", "Door & Window Manufacturers", "Corrugated Box Manufacturers", "Marble Dealers", "Marriage Bureaus", "Medical Agencies", "Medical Equipments Dealers", "Medical Halls", "Mens Wear Shops", "Milk Dairy Shops", "Mobile Repair Shops", "Mobile Stores", "Money Exchange", "Newspaper Agencies", "Nutritional Supplement Shops", "Office Furniture Shops", "Optical Shops", "Other Businesses", "Paan Shops", "Packers & Movers", "Paint Dealers", "Paper Mart Shops", "Parks", "Pest Control Services", "Pet Shops", "PG (Paying Guest)", "Pharmaceutical Companies", "Photo Frame Shops", "Photo Studios", "Photographers", "Photostat Xerox Shops", "Picture Shops", "Pizza Restaurants", "Plant Nurseries", "Play Schools", "Plumbers", "Plywood Dealers", "Pooja Samagri Stores", "Post Offices", "Poultry Farms", "Powder Coating Services", "Printing Presses", "Project Management Consultants", "Projectors On Rent", "Property Dealers", "Public Wifi Services", "Purse Shops", "Refrigeration Shops", "Rehabilitation Centres", "Resorts", "Restaurants", "RO Water Filters Dealers", "Sanitary Stores", "Sarees Retailers", "School Dress Uniforms", "Schools", "Scrap Dealers", "Jobs Placement", "Security Guard Services", "Seeds Store", "Sherwanis On Rent", "Shoe & Footwear Shops", "Shuttering & Scaffolding", "Sofa, Bed & Furniture Shops", "Software Companies", "Solar Panel Dealers", "Sound Speaker Shops", "Spa & Wellness", "Spice Manufacturers", "Sports Shops", "Sports Wear Shops", "Stabilizer Dealers", "Stamp Maker Shops", "Stamp Paper Shops", "Stationery Stores", "Steel Businesses", "Stenography Institutes", "Stock Brokers", "Stone Crusher Dealers", "Surgical Equipment Dealers", "Sweets Shops", "Swimming Classes", "Tailors", "Tank Cleaning Service", "Tattoo Artists", "Tea Shops", "Tent Houses", "Tiffin Services", "Tiles Dealers", "Timber Merchants", "TMT Bar (Sariya) Dealers", "Tools Shops", "Tour & Travels", "Toy Shops", "Trading Companies", "Transport Companies", "Two Wheeler Dealers", "Two Wheeler Repair & Services", "Tyre Shops", "Valuers & Engineers", "Vastu Consultants", "Vegetable Shops", "Car & Bike Washing Services", "Watches Shops", "Waterproofing Services", "Website Developers & Designers", "Wedding Card Shops", "Welding Workshops", "Wooden Works Shops", "Yoga Classes"
];

export default function BusinessDetail() {
   const { slug } = useParams();
   const [business, setBusiness] = useState<Business | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchBusiness = async () => {
         try {
            const res = await axios.get(`/backend/api/v1/businesses.php?slug=${slug}`);
            if (res.data.success && res.data.data) {
               setBusiness(res.data.data);
               setLoading(false);
               return;
            }
         } catch (err) {}

         const localBiz = sampleBusinesses.find(b => b.slug === slug);
         if (localBiz) {
            const category = allCategories.find(c => c.id === localBiz.categoryId);
            setBusiness({
               id: localBiz.id,
               slug: localBiz.slug,
               business_name: localBiz.businessName,
               owner_name: localBiz.ownerName,
               category_name: localBiz.categoryName,
               category_slug: category?.slug || localBiz.categoryName.toLowerCase().replace(/ /g, '-'),
               description: localBiz.description,
               address: localBiz.address,
               area: localBiz.area,
               city: localBiz.city,
               state: localBiz.state,
               pincode: localBiz.pincode,
               mobile: localBiz.mobile,
               verified: localBiz.verified
            });
         }
         setLoading(false);
      };
      setLoading(true);
      fetchBusiness();
      window.scrollTo(0, 0);
   }, [slug]);

   if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#003131] border-t-transparent rounded-full animate-spin" /></div>;
   if (!business) return <div className="text-center py-40">Not found</div>;

   return (
      <div className="min-h-screen bg-[#FDFCF8] flex flex-col font-sans overflow-x-hidden">
         <Navbar />
         <main className="flex-grow">
            {/* Header */}
            <div className="bg-[#003131] pt-10 pb-24 relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center' }} />
               <div className="container mx-auto px-6 md:px-12 lg:px-40 relative z-10">
                  <div className="mb-8">
                    <Link to="/categories" className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest text-[#B8860B] bg-[#003131]/80 backdrop-blur-sm hover:border-[#B8860B] transition-all">
                      <ChevronLeft size={16} /> , {business.category_name.toUpperCase()} ,
                    </Link>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-6 leading-tight capitalize">{business.business_name}</h1>
                  <div className="flex items-center gap-3 text-white/80 text-base font-medium">
                    <MapPin size={20} className="text-[#B8860B]" />
                    <span>{business.address}, {business.area}, {business.city} – {business.pincode} ({business.state || 'Tamil Nadu'}) India</span>
                  </div>
               </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-40 -mt-10 mb-20 relative z-20 space-y-12">
               {/* Contact Card */}
               <div className="bg-white rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden">
                  <div className="bg-[#003131] w-full py-5 px-8 flex items-center gap-4">
                     <span className="text-[#B8860B] text-xl">✉</span>
                     <h3 className="text-white font-bold text-lg tracking-tight">Contact & Location Details</h3>
                  </div>
                  <div className="p-8 lg:p-10 space-y-10">
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#F8FBFC] rounded-[20px] p-6 border border-slate-50 flex gap-5 items-start">
                           <div className="w-12 h-12 bg-[#EEE3CC] rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-[#B8860B]/10"><MapPin className="text-[#967D33]" size={20} /></div>
                           <div className="space-y-1"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Address</p><p className="font-bold text-[#003131] text-sm leading-relaxed">{business.address}</p></div>
                        </div>
                        <div className="bg-[#F8FBFC] rounded-[20px] p-6 border border-slate-50 flex gap-5 items-start">
                           <div className="w-12 h-12 bg-[#EEE3CC] rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-[#B8860B]/10"><Globe className="text-[#967D33]" size={20} /></div>
                           <div className="space-y-1"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City / State</p><p className="font-bold text-[#003131] text-sm leading-relaxed">{business.city} – {business.pincode} <br/> ({business.state || 'Tamil Nadu'}) India</p></div>
                        </div>
                     </div>
                     <div className="w-full md:w-[360px]">
                        <div className="bg-[#003131] rounded-[20px] p-6 flex gap-6 items-center shadow-lg">
                           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5"><Phone className="text-[#B8860B]" size={20} /></div>
                           <div className="space-y-1"><p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Mobile Number</p><p className="text-xl font-black text-[#B8860B] tracking-tight">{business.mobile}</p></div>
                        </div>
                     </div>
                     <a href={`tel:${business.mobile}`} className="block"><Button className="w-full bg-[#967D33] hover:bg-[#856C2D] text-[#003131] text-lg font-serif font-black py-7 rounded-[15px] shadow-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.005] border-none group"><span>📞</span> Call {business.business_name}</Button></a>
                  </div>
               </div>

               {/* Business Info */}
               <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 md:p-12">
                  <h2 className="text-base font-serif font-black text-[#003131] mb-8 flex items-center gap-3"><Clock size={20} className="text-[#967D33]" />Business Info</h2>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="bg-[#F1F9F9] text-[#003131]/80 border border-[#003131]/10 px-6 py-3 rounded-full flex items-center gap-3 text-sm font-bold shadow-sm"><Clock size={16} className="text-[#967D33]" />Opens 10 AM (working days)</div>
                    <div className="bg-[#F1F9F9] text-[#003131]/80 border border-[#003131]/10 px-6 py-3 rounded-full flex items-center gap-3 text-sm font-bold shadow-sm"><CreditCard size={16} className="text-[#967D33]" />Cash accepted · confirm other payment methods directly</div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium pl-2">Hours and payment options are indicative. Please confirm directly with {business.business_name}.</p>
               </div>

               {/* Why Choose Section - UPDATED */}
               <section className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 md:p-12">
                  <h2 className="text-xl font-serif font-black text-[#003131] mb-10 flex items-center gap-3 border-l-4 border-[#967D33] pl-4">Why Choose {business.business_name}?</h2>
                  <div className="space-y-6">
                    {[
                      { t: "Prime Location", d: `Conveniently located in ${business.city} for easy access from all parts of the city.` },
                      { t: "Expert Staff", d: "Dedicated and knowledgeable team committed to giving you the best guidance." },
                      { t: "Additional Services", d: `${business.business_name} may provide value-added services. Contact them directly to know more about what they offer.` },
                      { t: "Parking Available", d: `Parking space available for customers visiting ${business.business_name}.` }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-[#003131] text-[#967D33] flex items-center justify-center shrink-0 mt-1 shadow-md group-hover:scale-110 transition-transform"><CheckCircle2 size={14} /></div>
                        <div className="space-y-1">
                          <p className="font-black text-[#003131] text-lg">{item.t}</p>
                          <p className="text-slate-500 leading-relaxed font-medium">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </section>

               {/* More Business Section - NEW */}
               <section className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 md:p-12">
                  <h2 className="text-xl font-serif font-black text-[#003131] mb-10 flex items-center gap-3 border-l-4 border-[#967D33] pl-4">More , {business.category_name} , in {business.city}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sampleBusinesses
                      .filter(b => b.categoryName === business.category_name && b.slug !== business.slug)
                      .slice(0, 6)
                      .map((item, i) => (
                        <Link key={i} to={`/business/${item.slug}`} className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/50 group">
                           <h4 className="font-black text-[#003131] group-hover:text-[#967D33] transition-colors mb-2">{item.businessName}</h4>
                           <p className="text-xs text-slate-500 flex gap-2"><MapPin size={12} className="shrink-0 text-[#967D33]" /> {item.address}</p>
                        </Link>
                      ))}
                    {sampleBusinesses.filter(b => b.categoryName === business.category_name && b.slug !== business.slug).length === 0 && (
                      <p className="text-slate-400 italic text-sm">No other businesses found in this category.</p>
                    )}
                  </div>
               </section>

               {/* Frequently Asked Questions - NEW */}
               <section className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 md:p-12">
                  <h2 className="text-xl font-serif font-black text-[#003131] mb-12 flex items-center gap-3 border-l-4 border-[#967D33] pl-4"><HelpCircle size={22} className="text-[#967D33]" /> Frequently Asked Questions — {business.business_name}</h2>
                  <div className="space-y-10">
                    {[
                      { q: `Where is ${business.business_name} located?`, a: `${business.business_name} is located at ${business.address}, ${business.area}, ${business.city} – ${business.pincode}, ${business.state || 'Tamil Nadu'}, India.` },
                      { q: `What is the full address of ${business.business_name}?`, a: `The full address of ${business.business_name} is — ${business.address}, ${business.area}, ${business.city} - ${business.pincode}, ${business.state || 'Tamil Nadu'}, India.` },
                      { q: `What is the pincode of ${business.business_name} in ${business.city}?`, a: `${business.business_name} is located in the ${business.pincode} pincode area of ${business.city}, ${business.state || 'Tamil Nadu'}.` },
                      { q: `What is the contact number of ${business.business_name}?`, a: `You can contact ${business.business_name} at ${business.mobile}. Click here to call directly.` },
                      { q: `What are the working hours of ${business.business_name}?`, a: `${business.business_name} opens at 10 AM on working days. For exact closing time and holiday schedule, please confirm directly with the business.` },
                      { q: `Is ${business.business_name} open on Sunday?`, a: `${business.business_name} is listed as open on working days from 10 AM. Whether they operate on Sundays or public holidays should be confirmed directly by calling ${business.mobile}.` },
                      { q: `What payment methods does ${business.business_name} accept?`, a: `${business.business_name} accepts cash payments. For UPI, card, or other payment modes, please confirm directly with the business before visiting.` },
                      { q: `Does ${business.business_name} have staff available to assist?`, a: `Yes, ${business.business_name} has staff available to help customers with queries and services. For specific assistance, contact them directly.` },
                      { q: `What services does ${business.business_name} offer?`, a: `${business.business_name} offers services related to , ${business.category_name} , in ${business.city}. For a detailed list of services or current offers, please contact them directly.` },
                      { q: `What type of business is ${business.business_name}?`, a: `${business.business_name} falls under the , ${business.category_name} , category and serves customers in ${business.city} and surrounding areas of ${business.state || 'Tamil Nadu'}.` },
                      { q: `Is ${business.business_name} located in ${business.city}?`, a: `Yes, ${business.business_name} is located in ${business.city}, ${business.state || 'Tamil Nadu'}, India.` }
                    ].map((faq, i) => (
                      <div key={i} className="space-y-4">
                        <h4 className="text-lg font-black text-[#003131] border-l-2 border-[#967D33] pl-4">{faq.q}</h4>
                        <p className="text-slate-500 italic text-sm pl-4 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
               </section>

               {/* About Section - NEW */}
               <section className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 md:p-12">
                  <h2 className="text-xl font-serif font-black text-[#003131] mb-6 flex items-center gap-3 border-l-4 border-[#967D33] pl-4">About {business.business_name}</h2>
                  <p className="text-slate-600 leading-relaxed font-medium mb-10">
                    {business.business_name} is a , {business.category_name} , business located in {business.city}, {business.state || 'Tamil Nadu'}, India. The office is situated at {business.address}. You can call them at {business.mobile} for inquiries or appointments. The office opens at 10 AM on working days. If you are looking for , {business.category_name} , in {business.city}, you can get in touch with {business.business_name} using the contact details mentioned on this page.
                  </p>
                  
                  <div className="bg-amber-50 border border-amber-200 p-8 rounded-3xl flex gap-6 items-start">
                    <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg"><AlertTriangle size={24} /></div>
                    <p className="text-xs text-amber-900 font-bold leading-relaxed">
                      We do not endorse any specific business listed in this directory. Be cautious when making direct advance payments via UPI, Western Union, or similar services — transactions are at your own risk. For the most accurate and up-to-date information, please confirm directly with {business.business_name}.
                    </p>
                  </div>
               </section>

               {/* Discovery Sections */}
               <div className="space-y-16 py-10 bg-[#003131]/[0.02] rounded-[40px] p-8 md:p-12 border border-slate-100 max-w-[1400px] mx-auto">
                  <div className="space-y-10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#967D33] text-center"><span className="text-xl mr-2">📍</span> {business.category_name} in Other Cities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                      {otherCities.map(city => (
                        <Link key={city} to={`/search?q=${business.category_name} in ${city}`} className="px-4 py-3 bg-white border border-slate-100 rounded-[15px] text-[10px] font-black text-slate-500 hover:bg-[#003131] hover:text-[#967D33] transition-all shadow-sm text-center leading-tight min-h-[50px] flex items-center justify-center">{city}</Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-10 pt-10 border-t border-slate-100/50">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#967D33] text-center"><span className="text-xl mr-2">🗂️</span> Popular Business Categories</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                      {popularCategories.map(cat => (
                        <Link key={cat} to={`/category/${cat.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`} className="px-4 py-3 bg-white border border-slate-100 rounded-[15px] text-[10px] font-black text-slate-400 hover:text-[#003131] hover:border-[#003131] transition-all shadow-sm text-center leading-tight min-h-[50px] flex items-center justify-center">{cat}</Link>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
         </main>
         <Footer />
      </div>
   );
}
