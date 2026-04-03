import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Phone, Mail, Globe, ShieldCheck, 
  Share2, ArrowLeft, ChevronRight, LayoutGrid, 
  Star, Clock, Heart, Award, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import { motion } from "framer-motion";

export default function BusinessDetail() {
  const { slug } = useParams();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await axios.get(`http://localhost/salem-connect/backend/api/v1/businesses.php?slug=${slug}`);
        if (res.data.success) {
          setBusiness(res.data.data);
        }
      } catch (err) {
        console.error("Fetch failed");
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="p-20 text-center animate-pulse">Gathering business details...</div>;
  if (!business) return <div className="p-20 text-center">Business not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="grow container mx-auto px-4 py-32 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm font-sans font-bold text-gray-400 uppercase tracking-widest pl-4">
           <Link to="/" className="hover:text-[#1B4332] transition-colors">Home</Link>
           <ChevronRight size={14} />
           <Link to={`/category/${business.category_slug}`} className="hover:text-[#C9973A] transition-colors">{business.category_name}</Link>
           <ChevronRight size={14} />
           <span className="text-[#1B4332]">{business.business_name}</span>
        </div>

        {/* Hero Header Section */}
        <div className="bg-white rounded-[3rem] p-10 lg:p-20 shadow-2xl border border-gray-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 h-full w-1/3 bg-[#C9973A]/5 -skew-x-12 translate-x-1/2 rounded-full pointer-events-none" />
           
           <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 relative z-10">
              {/* Logo / Initial Plate */}
              <div className="w-32 h-32 lg:w-48 lg:h-48 bg-gray-50 rounded-[2.5rem] shadow-xl border border-gray-100 flex items-center justify-center text-[#C9973A] text-5xl lg:text-7xl font-display font-bold shrink-0 relative">
                 {business.logo_url ? <img src={business.logo_url} className="w-full h-full object-contain rounded-[2.5rem]" /> : business.business_name[0]}
                 <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg border border-gray-50">
                    <ShieldCheck className="w-8 h-8 text-[#22C55E]" />
                 </div>
              </div>

              <div className="text-center lg:text-left space-y-4">
                 <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-[#1B4332]">{business.business_name}</h1>
                    <span className="px-4 py-1 bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#22C55E]/20">
                      Verified Business
                    </span>
                 </div>
                 <p className="text-xl text-[#C9973A] font-sans font-bold uppercase tracking-widest">{business.category_name}</p>
                 <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-6">
                    <div className="flex items-center gap-2 text-gray-500 font-sans font-bold text-sm">
                       <MapPin size={18} className="text-[#1B4332]/40" />
                       {business.area}, Salem
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 font-sans font-bold text-sm">
                       <Clock size={18} className="text-[#1B4332]/40" />
                       Mon - Sat (9:00 AM - 8:00 PM)
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 font-sans font-bold text-sm">
                       <Award size={18} className="text-[#1B4332]/40" />
                       Joined 2024
                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="lg:ml-auto flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                 <Button className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white rounded-full px-10 py-8 h-auto font-bold font-sans shadow-xl text-lg min-w-[200px] border-none group transform hover:scale-105 transition-all">
                    <Phone className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" /> Call Now
                 </Button>
                 <Button variant="outline" className="border-2 border-gray-100 text-[#1B4332] rounded-full px-10 py-8 h-auto font-bold font-sans hover:bg-gray-50 text-lg shadow-sm transform hover:scale-105 transition-all">
                    <Share2 className="mr-3 w-6 h-6" /> Share Listing
                 </Button>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
           {/* Detailed Description */}
           <div className="lg:col-span-2 space-y-12">
              <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-xl border border-gray-100">
                 <h2 className="text-3xl font-display font-bold text-[#1B4332] mb-8 pb-4 border-b border-gray-100">About Business</h2>
                 <p className="text-gray-500 font-body text-xl leading-relaxed whitespace-pre-line italic italic">
                    {business.description || "The business description is currently being updated. Please check back soon or contact the business directly for more information."}
                 </p>
                 
                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12 bg-gray-50/50 p-10 rounded-[2rem] border border-gray-100">
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-sans">Business Owner</p>
                       <p className="font-display font-bold text-[#1B4332]">{business.owner_name || 'Verification Pending'}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-sans">Verified ID</p>
                       <p className="font-display font-bold text-[#C9973A]">#SALEM-{business.id}002</p>
                    </div>
                 </div>
              </div>

              {/* Address Map Section Placeholder */}
              <div className="bg-white rounded-[3rem] p-4 shadow-xl border border-gray-100 h-[400px] overflow-hidden group">
                 <div className="w-full h-full bg-gray-200 rounded-[2.5rem] relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                    <MapPin size={80} className="text-[#C9973A]/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-10 text-white">
                       <p className="font-display font-bold text-2xl">{business.business_name}</p>
                       <p className="font-sans text-white/70 font-medium">{business.address}</p>
                       <p className="mt-4 font-bold font-sans uppercase tracking-widest text-xs">Interactive Maps Coming Soon</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Sidebar: All Contact details */}
           <div className="space-y-10">
              <div className="bg-[#1B4332] p-10 lg:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
                 <h3 className="text-2xl font-display font-bold mb-10 text-white">Contact Info</h3>
                 
                 <div className="space-y-8">
                    <div className="flex gap-6 items-start group/item cursor-pointer">
                       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#C9973A] group-hover/item:bg-[#C9973A] group-hover/item:text-white transition-all">
                          <Phone size={24} />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Mobile & WhatsApp</p>
                          <p className="text-xl font-display font-bold text-white">{business.mobile}</p>
                       </div>
                    </div>

                    <div className="flex gap-6 items-start group/item cursor-pointer">
                       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#C1973A] group-hover/item:bg-[#C9973A] group-hover/item:text-white transition-all">
                          <Mail size={24} />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Business Email</p>
                          <p className="text-xl font-display font-bold text-white line-clamp-1">{business.email || 'Contact via Phone'}</p>
                       </div>
                    </div>

                    <div className="flex gap-6 items-start group/item cursor-pointer">
                       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#C1973A] group-hover/item:bg-[#C9973A] group-hover/item:text-white transition-all">
                          <Globe size={24} />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Official Website</p>
                          <p className="text-xl font-display font-bold text-white">{business.website ? business.website.replace('https://', '') : 'No Website'}</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="mt-12 p-8 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-sm group-hover:bg-[#C9973A]/10 transition-all transition-all duration-500">
                    <p className="text-[10px] font-bold text-[#C9973A] uppercase tracking-widest mb-2 font-sans">Business Locality</p>
                    <p className="text-xl font-display font-bold text-white mb-2">{business.area}</p>
                    <p className="text-white/60 font-medium text-sm font-sans">{business.city}, {business.state} - {business.pincode}</p>
                 </div>
              </div>

              {/* Safety Badge */}
              <div className="p-10 rounded-[3rem] bg-indigo-50 border border-indigo-100 flex items-center gap-6 shadow-sm">
                 <CheckCircle2 size={40} className="text-indigo-600 shrink-0" />
                 <div>
                    <h4 className="font-bold font-sans text-indigo-900 uppercase tracking-widest text-xs">Verified by Directory</h4>
                    <p className="text-indigo-900/60 font-sans text-xs mt-1">Details updated 2024</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Related Businesses (Placeholder Section) */}
        <div className="py-10">
           <div className="flex justify-between items-center mb-10 pl-4 border-l-4 border-[#C9973A]">
              <h2 className="text-3xl font-display font-bold text-[#1B4332]">Related Businesses</h2>
              <Link to={`/category/${business.category_slug}`} className="text-[#C9973A] font-bold font-sans flex items-center gap-2 hover:translate-x-2 transition-transform">
                View All {business.category_name} <ChevronRight size={20} />
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform grayscale opacity-40 hover:grayscale-0 hover:opacity-100">
                   <div className="w-16 h-16 bg-gray-50 rounded-2xl mb-6 flex items-center justify-center text-gray-300">
                      <ShieldCheck size={32} />
                   </div>
                   <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-4"></div>
                   <div className="h-3 bg-gray-50 rounded-full w-1/2"></div>
                </div>
              ))}
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
