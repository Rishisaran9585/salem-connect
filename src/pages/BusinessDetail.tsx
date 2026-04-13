import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
   MapPin, Phone, Mail, Globe, ShieldCheck,
   Share2, ChevronRight, Award, CheckCircle2,
   Clock, AlertTriangle, ArrowLeft, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import { sampleBusinesses, allCategories } from "@/data/categories";

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

export default function BusinessDetail() {
   const { slug } = useParams();
   const [business, setBusiness] = useState<Business | null>(null);
   const [relatedBusinesses, setRelatedBusinesses] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchBusiness = async () => {
         try {
            const res = await axios.get(`/backend/api/v1/businesses.php?slug=${slug}`);
            if (res.data.success && res.data.data) {
               const bizData = res.data.data;
               setBusiness(bizData);
               
               // Fetch related businesses in the same category
               try {
                  const relatedRes = await axios.get(`/backend/api/v1/businesses.php?category=${bizData.category_slug}`);
                  if (relatedRes.data.success) {
                     // Filter out the current business
                     const filtered = relatedRes.data.data.filter((b: any) => b.id !== bizData.id).slice(0, 4);
                     setRelatedBusinesses(filtered);
                  }
               } catch (relatedErr) {
                  console.error("Failed to fetch related businesses");
               }

               setLoading(false);
               return;
            }
         } catch (err) {
            console.error("Fetch failed, looking for local sample data...");
         }

         // Search in local sample data if API fails or returns no success
         const localBiz = sampleBusinesses.find(b => b.slug === slug);
         if (localBiz) {
            const category = allCategories.find(c => c.id === localBiz.categoryId);
            const mappedBiz = {
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
               email: localBiz.email,
               website: localBiz.website,
               verified: localBiz.verified
            };
            setBusiness(mappedBiz);
            
            // Map local related
            const localRelated = sampleBusinesses
               .filter(b => b.categoryId === localBiz.categoryId && b.id !== localBiz.id)
               .slice(0, 4)
               .map(b => ({
                  id: b.id,
                  slug: b.slug,
                  business_name: b.businessName,
                  category_name: b.categoryName,
                  area: b.area
               }));
            setRelatedBusinesses(localRelated);
         }
         
         setLoading(false);
      };
      
      setLoading(true);
      fetchBusiness();
      window.scrollTo(0, 0);
   }, [slug]);

   if (loading) {
      return (
         <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="font-display font-bold text-indigo-600 text-xl animate-pulse uppercase tracking-widest">Gathering details...</p>
         </div>
      );
   }

   if (!business) {
      return (
         <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="container mx-auto px-4 py-40 text-center">
               <div className="max-w-md mx-auto space-y-10">
                  <div className="w-24 h-24 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                     <AlertTriangle size={48} />
                  </div>
                  <div>
                     <h2 className="text-3xl font-display font-bold text-indigo-600">Business Listing Missing</h2>
                     <p className="text-gray-400 mt-4 font-sans leading-relaxed">
                        We couldn't find the business you're looking for. It might have been relocated or the link is incorrect.
                     </p>
                  </div>
                  <div className="flex flex-col gap-4">
                     <Link to="/categories">
                        <Button className="w-full bg-slate-900 rounded-2xl py-8 h-auto font-bold text-lg border-none shadow-xl">
                           Browse All Categories
                        </Button>
                     </Link>
                     <Link to="/">
                        <Button variant="ghost" className="w-full text-indigo-600 font-bold py-4 h-auto flex items-center justify-center gap-2">
                           <ArrowLeft size={18} /> Back to Home
                        </Button>
                     </Link>
                  </div>
               </div>
            </main>
            <Footer />
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
         <Navbar />
         <main className="flex-grow">
            <div className="bg-slate-900 pt-32 pb-12 md:pt-40 md:pb-24 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
               <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
               
               <div className="container mx-auto px-4 relative z-10">
                  <div className="flex items-center gap-2 text-[10px] font-sans text-white/80 mb-10 uppercase tracking-[0.2em] font-black">
                     <Link to="/" className="hover:text-indigo-400 transition-colors">Salem Business</Link>
                     <ChevronRight className="h-3 w-3 text-indigo-400" />
                     <Link to={`/category/${business.category_slug}`} className="hover:text-indigo-400 transition-colors">
                        {business.category_name}
                     </Link>
                     <ChevronRight className="h-3 w-3 text-indigo-400" />
                     <span className="text-white drop-shadow-sm">{business.business_name}</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                     <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                           <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
                              {business.business_name}
                           </h1>
                           {business.verified && (
                              <div className="flex items-center gap-2 rounded-full bg-[#22C55E]/20 px-4 py-1.5 text-[10px] font-bold text-[#22C55E] uppercase tracking-widest border border-[#22C55E]/30">
                                 <CheckCircle2 className="h-4 w-4" /> Verified Business
                              </div>
                           )}
                        </div>
                        <div className="flex items-center gap-6">
                           <span className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                              {business.category_name}
                           </span>
                            <div className="flex items-center gap-1 text-indigo-400">
                               {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={14} />)}
                               <span className="text-white/90 text-xs font-black ml-3 uppercase tracking-widest drop-shadow-sm">4.8 <span className="text-white/60 font-sans ml-1 text-[10px]">(85 Verified Reviews)</span></span>
                            </div>
                        </div>
                     </div>
                     
                     <div className="flex flex-wrap gap-4">
                        <a href={`tel:${business.mobile}`} className="w-full sm:w-auto">
                           <Button className="w-full bg-white hover:bg-white/90 text-indigo-600 rounded-2xl px-10 py-8 h-auto font-bold font-sans shadow-2xl text-lg border-none transform active:scale-95 transition-all">
                              <Phone className="mr-3 w-6 h-6" /> {business.mobile}
                           </Button>
                        </a>
                     </div>
                  </div>
               </div>
            </div>

            <div className="container mx-auto px-4 -mt-12 mb-20 space-y-12 relative z-20">
               {/* Main Profile Card */}
               <div className="bg-white rounded-[3.5rem] p-10 lg:p-16 shadow-2xl border border-gray-100 flex flex-col lg:flex-row gap-16 relative group">
                  <div className="absolute top-0 right-0 h-4 bg-indigo-600 w-1/4 rounded-full -translate-y-2 group-hover:w-1/2 transition-all duration-700" />
                  
                  {/* Photo / Logo Area */}
                  <div className="lg:w-1/3 space-y-8">
                     <div className="aspect-square bg-slate-50 rounded-[3rem] shadow-xl border border-gray-100 flex items-center justify-center text-indigo-400 text-8xl md:text-9xl font-display font-bold relative overflow-hidden group/img">
                        {business.logo_url ? <img src={business.logo_url} className="w-full h-full object-cover" /> : (business.business_name ? business.business_name[0] : "?")}
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                           <Button variant="ghost" className="text-white border border-white/20 rounded-full font-bold">View Gallery</Button>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                           <div key={i} className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300">
                              <Star size={24} />
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="lg:w-2/3 space-y-12">
                     <div className="space-y-8">
                        <h2 className="text-3xl font-display font-bold text-indigo-600 flex items-center gap-4">
                           About Our Establishment
                           <div className="h-1 flex-grow bg-slate-50 rounded-full" />
                        </h2>
                         <p className="text-[#1F2937] font-sans text-xl leading-relaxed font-medium">
                            {business.description || "Leading the way in premium services. We are dedicated to providing the highest quality experience for our customers in the heart of Salem. Visit us today to discover our standard of excellence."}
                         </p>
                     </div>

                     <div className="grid md:grid-cols-2 gap-10">
                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-gray-100 space-y-4">
                           <h4 className="font-display font-bold text-indigo-600 text-lg uppercase tracking-wide">Business Information</h4>
                            <div className="space-y-4">
                               <div className="flex justify-between items-center py-4 border-b border-gray-200">
                                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-sans">Proprietor Name</span>
                                  <span className="font-sans font-bold text-indigo-600 text-lg">{business.owner_name}</span>
                               </div>
                               <div className="flex justify-between items-center py-4 border-b border-gray-200">
                                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-sans">Verified ID</span>
                                  <span className="font-sans font-bold text-indigo-400 text-lg">#SC-24{business.id}X</span>
                               </div>
                               <div className="flex justify-between items-center py-4">
                                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-sans">Market Tenure</span>
                                  <span className="font-sans font-bold text-indigo-600 text-lg">8+ Years of Excellence</span>
                               </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 shadow-xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/20 blur-2xl rounded-full" />
                           <h4 className="font-display font-bold text-lg uppercase tracking-wide relative z-10">Operating Hours</h4>
                           <div className="space-y-3 relative z-10">
                              <div className="flex justify-between text-sm">
                                 <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Monday - Saturday</span>
                                 <span className="font-sans font-bold">9:00 AM - 9:00 PM</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                 <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Sunday</span>
                                 <span className="font-sans font-bold text-indigo-400">Closed</span>
                              </div>
                           </div>
                           <Button className="w-full bg-indigo-600 border-none font-bold rounded-2xl py-6 hover:bg-white hover:text-indigo-600 transition-all">Schedule Visit</Button>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid lg:grid-cols-12 gap-12">
                  {/* Address Map Section Placeholder */}
                  <div className="lg:col-span-12 bg-white rounded-[3.5rem] p-4 shadow-2xl border border-gray-100 min-h-[500px] overflow-hidden group relative">
                     <div className="w-full h-full min-h-[500px] bg-slate-100 rounded-[2.5rem] relative overflow-hidden">
                        <iframe
                           width="100%"
                           height="500"
                           frameBorder="0"
                           style={{ border: 0 }}
                           src={`https://www.google.com/maps?q=${encodeURIComponent(business.business_name + " " + business.address + " " + business.area + " " + business.city)}&output=embed`}
                           allowFullScreen
                           loading="lazy"
                           className="grayscale-[20%] contrast-[110%] brightness-[95%]"
                        ></iframe>
                        
                        <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-slate-950/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl border border-white/5">
                           <div className="space-y-3 text-center md:text-left">
                              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                 <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Permanent Establishment</p>
                              </div>
                              <h4 className="text-xl md:text-2xl font-display font-bold leading-tight max-w-sm">{business.address}</h4>
                              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest font-sans">{business.area}, {business.city}, {business.state} - {business.pincode}</p>
                           </div>
                           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                              <a 
                                 href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address + " " + business.city)}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 <Button className="w-full bg-indigo-600 hover:bg-white hover:text-indigo-600 border-none font-sans font-black rounded-2xl px-10 py-6 h-auto shadow-xl transition-all uppercase tracking-widest text-xs">
                                    <MapPin className="mr-3 w-4 h-4" /> Get Directions
                                 </Button>
                              </a>
                              <a href={`tel:${business.mobile}`}>
                                 <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/20 rounded-2xl px-10 py-6 h-auto transition-all font-black uppercase tracking-widest text-xs">
                                    <Phone className="mr-3 w-4 h-4" /> Call Now
                                 </Button>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Related Businesses */}
               <div className="py-20">
                  <div className="flex justify-between items-end mb-16 px-4">
                     <div>
                        <h2 className="text-4xl font-display font-bold text-indigo-600 mb-3">Similar Professionals</h2>
                        <p className="text-indigo-400 font-bold font-sans uppercase tracking-[0.3em] text-xs">Based on {business.category_name}</p>
                     </div>
                     <Link to={`/category/${business.category_slug}`} className="group bg-white p-4 rounded-full shadow-lg border border-gray-100 flex items-center gap-3 pr-8 hover:bg-slate-900 hover:text-white transition-all">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform">
                           <ChevronRight size={24} />
                        </div>
                        <span className="font-sans font-bold">View Category</span>
                     </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                     {relatedBusinesses.length > 0 ? (
                        relatedBusinesses.map((item, i) => (
                           <Link key={i} to={`/business/${item.slug}`} className="group bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
                              <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] mb-8 flex items-center justify-center text-indigo-400 text-3xl font-display font-bold shadow-inner group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                 {item.business_name ? item.business_name[0] : (item.businessName ? item.businessName[0] : "?")}
                              </div>
                              <h4 className="text-xl font-display font-bold text-indigo-600 mb-2 line-clamp-1">{item.business_name || item.businessName}</h4>
                              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6">{item.category_name || item.categoryName}</p>
                              <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                 <MapPin size={12} className="text-indigo-600/30" /> {item.area}
                              </div>
                           </Link>
                        ))
                     ) : (
                        <div className="col-span-full py-16 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                           <p className="text-slate-400 font-sans font-bold uppercase tracking-widest text-xs">No similar professionals found in this category yet.</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </main>

         <Footer />
      </div>
   );
}
