import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   Building2, User, MapPin, Phone, Mail,
   Globe, LayoutGrid, CheckCircle, ArrowRight, ArrowLeft,
   CreditCard, ShieldCheck, AlertCircle, Info, Image as ImageIcon,
   ChevronRight, Star, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import { toast } from "sonner";

const steps = [
   { id: 1, title: "Personal", subtitle: "Owner Details", icon: User },
   { id: 2, title: "Enterprise", subtitle: "Business Info", icon: Building2 },
   { id: 3, title: "Location", subtitle: "Map & Address", icon: MapPin },
   { id: 4, title: "Contact", subtitle: "Public Details", icon: Phone },
   { id: 5, title: "Preview", subtitle: "Final Review", icon: Info },
   { id: 6, title: "Verify", subtitle: "Secure Pay", icon: CreditCard },
];

export default function Register() {
   const [currentStep, setCurrentStep] = useState(1);
   const [formData, setFormData] = useState({
      your_name: "",
      your_email: "",
      your_mobile: "",
      business_name: "",
      category_id: "",
      subcategory_id: "",
      owner_name: "",
      description: "",
      address: "",
      area: "",
      city: "Salem",
      state: "Tamil Nadu",
      pincode: "",
      mobile: "",
      mobile_alt: "",
      email: "",
      website: "",
      message: "",
      logo_url: ""
   });

   const [categories, setCategories] = useState<any[]>([]);

   useEffect(() => {
      axios.get("/backend/api/v1/categories.php")
         .then(res => setCategories(res.data.data))
         .catch(err => console.error("Categories fetch failed"));
   }, []);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const next = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(s => Math.min(s + 1, steps.length));
   };
   
   const prev = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(s => Math.max(s - 1, 1));
   };

   const handleSubmit = async () => {
      try {
         const res = await axios.post("/backend/api/v1/register.php", formData);
         if (res.data.success) {
            toast.success("Registration submitted! Redirecting to payment...");
            window.location.href = `/payment-success?id=${res.data.data.id}`;
         }
      } catch (err) {
         toast.error("Registration failed. Please check your inputs.");
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
         <Navbar />
         <main className="flex-grow">
            {/* Premium Hero Section */}
            <div className="bg-[#1B4332] pt-32 pb-40 md:pt-40 md:pb-48 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9973A]/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />
               
               <div className="container mx-auto px-4 relative z-10 text-center">
                  <span className="inline-block px-5 py-2 bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-white/20 mb-8 backdrop-blur-sm">
                     The Salem Connect Network
                  </span>
                  <h1 className="text-4xl md:text-7xl font-display font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto italic">
                     List Your Business <br className="hidden md:block" /> with <span className="text-[#C9973A] not-italic">Authority.</span>
                  </h1>
                  <p className="mt-8 text-xl text-white/50 max-w-2xl mx-auto font-sans leading-relaxed">
                     Join over 2,500+ trusted businesses in Salem's most premium digital directory. 
                     Boost your visibility and reach thousands of local customers.
                  </p>
               </div>
            </div>

            <div className="container mx-auto px-4 -mt-32 mb-40 relative z-20">
               <div className="max-w-6xl mx-auto">
                  
                  {/* Pricing Banner Overlay */}
                  <div className="bg-[#C9973A] rounded-t-[3rem] p-6 flex flex-wrap items-center justify-center gap-10 md:gap-20 text-white shadow-2xl relative overflow-hidden group">
                     <div className="absolute inset-0 bg-white/5 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                     <div className="flex items-center gap-4 relative z-10 font-sans">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                           <Award size={20} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B4332]">Verification Fee</span>
                           <span className="text-xl font-display font-bold">₹150.00 <span className="text-[10px] opacity-60 font-sans italic">One Time</span></span>
                        </div>
                     </div>
                     <div className="hidden md:block w-px h-10 bg-white/20" />
                     <div className="flex items-center gap-4 relative z-10 font-sans">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                           <ShieldCheck size={20} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B4332]">Validity</span>
                           <span className="text-xl font-display font-bold">LIFETIME ACCESS</span>
                        </div>
                     </div>
                     <div className="hidden md:block w-px h-10 bg-white/20" />
                     <div className="flex items-center gap-4 relative z-10 font-sans">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                           <Star size={20} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B4332]">Positioning</span>
                           <span className="text-xl font-display font-bold">ALPHABETICAL</span>
                        </div>
                     </div>
                  </div>

                  {/* Main card */}
                  <div className="bg-white rounded-[4rem] rounded-t-none shadow-2xl border border-white flex flex-col lg:flex-row min-h-[800px] overflow-hidden group/card relative">
                     <div className="absolute top-0 right-0 h-2 bg-[#C9973A] w-1/4 group-hover/card:w-1/2 transition-all duration-1000" />
                     
                     {/* Horizontal Sidebar for Progress */}
                     <div className="lg:w-80 bg-gray-50 border-r border-gray-100 p-12 flex flex-col justify-start space-y-10 shrink-0 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#C9973A]/5 to-transparent pointer-events-none" />
                        
                        <div className="relative z-10 space-y-2 mb-10">
                           <h4 className="text-xs font-bold text-[#C9973A] uppercase tracking-widest">Progress Tracker</h4>
                           <h3 className="text-2xl font-display font-bold text-[#1B4332]">Registration Flow</h3>
                        </div>

                        {steps.map((step) => (
                           <div key={step.id} className="flex items-center gap-6 group/step transition-all relative z-10 cursor-default">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-sm border-2 ${
                                 currentStep >= step.id 
                                 ? 'bg-[#1B4332] text-white border-[#1B4332] scale-110 shadow-lg' 
                                 : 'bg-white text-gray-300 border-gray-100'
                              }`}>
                                 <step.icon size={24} />
                              </div>
                              <div className="flex flex-col">
                                 <p className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${currentStep >= step.id ? 'text-[#C9973A]' : 'text-gray-300'}`}>
                                    Step 0{step.id}
                                 </p>
                                 <p className={`font-display font-bold transition-colors ${currentStep >= step.id ? 'text-[#1B4332]' : 'text-gray-300'}`}>
                                    {step.title}
                                 </p>
                                 <p className={`text-[10px] font-sans font-medium transition-colors ${currentStep >= step.id ? 'text-gray-500' : 'text-transparent'}`}>
                                    {step.subtitle}
                                 </p>
                              </div>
                              {currentStep > step.id && (
                                 <div className="absolute -right-2 top-0 text-[#22C55E]">
                                    <CheckCircle size={16} fill="currentColor" className="text-white" />
                                 </div>
                              )}
                           </div>
                        ))}
                     </div>

                     {/* Content Form Area */}
                     <div className="grow p-10 md:p-20 flex flex-col justify-between relative bg-white overflow-hidden">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gray-50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/4 pointer-events-none" />
                        
                        <AnimatePresence mode="wait">
                           <motion.div
                              key={currentStep}
                              initial={{ x: 30, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -25, opacity: 0 }}
                              transition={{ duration: 0.5, ease: "circOut" }}
                              className="relative z-10"
                           >
                              {/* Content Routing */}
                              {currentStep === 1 && (
                                 <div className="space-y-12">
                                    <div className="space-y-4">
                                       <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1B4332]">About The <span className="text-[#C9973A]">Founder</span></h2>
                                       <p className="text-gray-400 font-sans max-w-xl">Tell us who is leading this enterprise. This helps us verify the authenticity of the listing.</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-10">
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                             <User size={14} className="text-[#C9973A]" /> Your Legal Name *
                                          </label>
                                          <Input name="your_name" value={formData.your_name} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A] transition-all" placeholder="e.g. Rahul Kumar" />
                                       </div>
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                             <Mail size={14} className="text-[#C9973A]" /> Private Email Address *
                                          </label>
                                          <Input name="your_email" value={formData.your_email} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A]" placeholder="rahul@enterprise.com" />
                                       </div>
                                       <div className="space-y-4 md:col-span-2">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                             <Phone size={14} className="text-[#C9973A]" /> Direct Mobile (Private) *
                                          </label>
                                          <Input name="your_mobile" value={formData.your_mobile} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A]" placeholder="+91 00000 00000" />
                                       </div>
                                    </div>
                                 </div>
                              )}

                              {currentStep === 2 && (
                                 <div className="space-y-12">
                                    <div className="space-y-4">
                                       <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1B4332]">Business <span className="text-[#C9973A]">Identity</span></h2>
                                       <p className="text-gray-400 font-sans max-w-xl">Establish your brand name and industry presence in the Salem Directory.</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-10">
                                       <div className="space-y-4 md:col-span-2">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                             <Building2 size={14} className="text-[#C9973A]" /> Registered Trade Name *
                                          </label>
                                          <Input name="business_name" value={formData.business_name} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A]" placeholder="e.g. Modern Textiles & Co." />
                                       </div>
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                             <LayoutGrid size={14} className="text-[#C9973A]" /> Primary Industry *
                                          </label>
                                          <div className="relative">
                                             <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full h-16 rounded-2xl bg-white border-2 border-gray-100 px-8 font-bold font-sans text-xl text-[#1B4332] outline-none focus:border-[#C9973A] transition-all appearance-none cursor-pointer">
                                                <option value="">Select Category</option>
                                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                             </select>
                                             <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-gray-300 pointer-events-none" />
                                          </div>
                                       </div>
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2">Proprietor Name (For Display) *</label>
                                          <Input name="owner_name" value={formData.owner_name} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A]" placeholder="e.g. Mr. S. Kannan" />
                                       </div>
                                       <div className="space-y-4 md:col-span-2">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2">Business Narrative</label>
                                          <Textarea name="description" value={formData.description} onChange={handleChange} className="rounded-[2.5rem] border-2 border-gray-100 bg-white p-10 text-xl min-h-[160px] font-bold text-[#1B4332] focus:border-[#C9973A] outline-none" placeholder="What makes your establishment stand out in Salem?" />
                                       </div>
                                    </div>
                                 </div>
                              )}

                              {currentStep === 3 && (
                                 <div className="space-y-12">
                                    <div className="space-y-4">
                                       <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1B4332]">Establishment <span className="text-[#C9973A]">Venue</span></h2>
                                       <p className="text-gray-400 font-sans max-w-xl">Map your physical presence in our district database.</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-10">
                                       <div className="space-y-4 md:col-span-2">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                             <MapPin size={14} className="text-[#C9973A]" /> Full Topography (Address) *
                                          </label>
                                          <Textarea name="address" value={formData.address} onChange={handleChange} className="rounded-[2.5rem] border-2 border-gray-100 bg-white p-10 text-xl font-bold text-[#1B4332] focus:border-[#C9973A] outline-none" placeholder="Door No, Street Name, Landmark..." />
                                       </div>
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2">District Area / Locality *</label>
                                          <Input name="area" value={formData.area} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A]" placeholder="e.g. Fairlands" />
                                       </div>
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2">Pincode *</label>
                                          <Input name="pincode" value={formData.pincode} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A]" placeholder="636 00X" />
                                       </div>
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em] ml-2">Jurisdiction</label>
                                          <Input value="Salem, Tamil Nadu" disabled className="rounded-2xl border-2 border-gray-50 bg-gray-50/50 p-8 text-xl h-auto font-bold text-gray-400 cursor-not-allowed" />
                                       </div>
                                    </div>
                                 </div>
                              )}

                              {currentStep === 4 && (
                                 <div className="space-y-12">
                                    <div className="space-y-4">
                                       <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1B4332]">Public <span className="text-[#C9973A]">Touchpoints</span></h2>
                                       <p className="text-gray-400 font-sans max-w-xl">Information listed here will be visible to potential customers on the directory.</p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-10">
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                             <Phone size={14} className="text-[#C9973A]" /> Primary Business Mobile *
                                          </label>
                                          <Input name="mobile" value={formData.mobile} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A]" placeholder="+91 00000 00000" />
                                       </div>
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2">Secondary Connection</label>
                                          <Input name="mobile_alt" value={formData.mobile_alt} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A]" placeholder="Landline or WhatsApp" />
                                       </div>
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                             <Mail size={14} className="text-[#C9973A]" /> Professional Email</label>
                                          <Input name="email" value={formData.email} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A]" placeholder="contact@bizname.com" />
                                       </div>
                                       <div className="space-y-4">
                                          <label className="text-[11px] font-bold text-[#1B4332] uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                                             <Globe size={14} className="text-[#C9973A]" /> Official Website</label>
                                          <Input name="website" value={formData.website} onChange={handleChange} className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-xl h-auto font-bold text-[#1B4332] focus:border-[#C9973A]" placeholder="https://..." />
                                       </div>
                                    </div>
                                 </div>
                              )}

                              {currentStep === 5 && (
                                 <div className="space-y-12">
                                    <div className="space-y-4">
                                       <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1B4332]">Listing <span className="text-[#C9973A]">Curation</span></h2>
                                       <p className="text-gray-400 font-sans max-w-xl">Upload your brand mark and review how your enterprise will appear.</p>
                                    </div>
                                    
                                    <div className="flex flex-col items-center justify-center p-20 border-4 border-dashed border-gray-50 rounded-[3rem] bg-gray-50/30 group hover:bg-[#C9973A]/5 hover:border-[#C9973A]/20 transition-all cursor-pointer relative overflow-hidden">
                                       <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                                       <div className="relative z-10 flex flex-col items-center">
                                          <ImageIcon size={64} className="text-[#C9973A] mb-6" />
                                          <p className="text-2xl font-display font-bold text-[#1B4332]">Select Brand Logo</p>
                                          <p className="text-gray-400 font-sans mt-2">Maximum resolution 1024x1024. Clear backgrounds preferred.</p>
                                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                                          <Button className="mt-8 bg-[#1B4332] rounded-2xl px-10 py-6 h-auto font-sans font-bold shadow-xl">Browse Files</Button>
                                       </div>
                                    </div>

                                    <div className="p-12 rounded-[3.5rem] bg-[#1B4332] text-white shadow-2xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
                                       <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9973A]/20 blur-3xl" />
                                       <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center text-4xl font-display font-bold text-[#C9973A] shrink-0 border border-white/10 backdrop-blur-md">
                                          {formData.business_name ? formData.business_name[0] : '#'}
                                       </div>
                                       <div>
                                          <p className="text-3xl font-display font-bold text-white leading-tight">{formData.business_name || 'Enterprise Name'}</p>
                                          <div className="flex items-center gap-3 mt-3">
                                             <span className="px-4 py-1.5 bg-[#C9973A] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                {categories.find(c => c.id == formData.category_id)?.name || 'Pending Category'}
                                             </span>
                                             <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{formData.area}, Salem</span>
                                          </div>
                                       </div>
                                       <div className="md:ml-auto">
                                          <div className="flex items-center gap-1 text-[#C9973A]">
                                             {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              )}

                              {currentStep === 6 && (
                                 <div className="space-y-12 text-center py-6">
                                    <div className="w-28 h-28 bg-[#C9973A]/10 text-[#C9973A] rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl ring-8 ring-gray-50 border border-[#C9973A]/20">
                                       <CreditCard size={48} className="animate-pulse" />
                                    </div>
                                    
                                    <div className="space-y-4">
                                       <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1B4332]">Administrative <span className="text-[#C9973A]">Verification</span></h2>
                                       <p className="text-gray-400 font-sans max-w-xl mx-auto">This one-time processing fee covers your manual background check and lifetime digital hosting.</p>
                                    </div>

                                    <div className="max-w-md mx-auto p-12 rounded-[3.5rem] bg-white shadow-2xl border-2 border-[#C9973A]/10 relative group">
                                       <div className="absolute top-0 left-0 w-full h-2 bg-[#C9973A] group-hover:h-4 transition-all" />
                                       <div className="flex justify-between items-center mb-6">
                                          <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] font-sans text-left">Listing Type</span>
                                          <span className="font-display font-bold text-[#1B4332]">PREMIUM PRO</span>
                                       </div>
                                       <div className="flex justify-between items-center mb-10">
                                          <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] font-sans text-left">Processing Fee</span>
                                          <span className="font-display font-bold text-[#1B4332] text-2xl">₹150.00</span>
                                       </div>
                                       <div className="h-px bg-gray-100 flex-grow mb-10" />
                                       <div className="flex justify-between items-end">
                                          <div>
                                             <p className="text-[10px] font-bold text-[#C9973A] uppercase tracking-[0.3em] font-sans text-left mb-2">Grand Total</p>
                                             <p className="text-5xl font-display font-bold text-[#1B4332]">₹150</p>
                                          </div>
                                          <p className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-4 py-2 rounded-full uppercase tracking-widest mb-2">Lifetime Access</p>
                                       </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 justify-center text-gray-400 text-xs font-bold uppercase tracking-widest border border-gray-100 w-fit mx-auto px-8 py-4 rounded-full">
                                       <ShieldCheck size={18} className="text-[#C9973A]" /> Encrypted via Razorpay Secure
                                    </div>
                                 </div>
                              )}
                           </motion.div>
                        </AnimatePresence>

                        {/* Control Bar */}
                        <div className="pt-20 flex justify-between items-center gap-6 relative z-10 border-t border-gray-50 mt-12 bg-white/80 backdrop-blur-md pb-4">
                           <button
                              onClick={prev}
                              className={`flex items-center gap-3 px-8 py-6 rounded-2xl font-bold font-sans transition-all active:scale-95 ${
                                 currentStep === 1 
                                 ? 'opacity-0 pointer-events-none' 
                                 : 'text-[#1B4332] hover:bg-gray-50'
                              }`}
                           >
                              <ArrowLeft size={20} /> Back
                           </button>

                           {currentStep < 6 ? (
                              <Button
                                 onClick={next}
                                 className="bg-[#1B4332] hover:bg-[#1B4332] text-white rounded-3xl px-14 py-8 h-auto font-bold font-sans shadow-2xl group relative overflow-hidden active:scale-[0.98] transition-all border-none"
                              >
                                 <div className="absolute inset-0 bg-[#C9973A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
                                 <span className="relative z-10 flex items-center gap-3 text-lg">
                                    Next Phase <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                                 </span>
                              </Button>
                           ) : (
                              <Button
                                 onClick={handleSubmit}
                                 className="bg-[#C9973A] hover:bg-[#C9973A] text-white rounded-[2.5rem] px-24 py-10 h-auto font-display font-bold shadow-2xl text-2xl active:scale-[0.97] transition-all border-none group relative overflow-hidden"
                              >
                                 <div className="absolute inset-0 bg-[#1B4332] -translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                                 <span className="relative z-10">Secure Pay ₹150 & List Now</span>
                              </Button>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
         <Footer />
      </div>
   );
}
