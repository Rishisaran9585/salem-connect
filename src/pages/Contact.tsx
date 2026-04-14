import { useState } from "react";
import {
   Mail, Phone, MapPin, MessageSquare,
   Send, ShieldCheck, User, Building, ArrowRight,
   Headset, HelpCircle, Globe, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import axios from "axios";

export default function Contact() {
   const [reason, setReason] = useState("");
   const [formData, setFormData] = useState({
      your_name: "",
      is_owner: "No",
      business_name: "",
      mobile: "",
      email: "",
      message: ""
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.your_name || !formData.mobile) return toast.error("Please fill required fields (Name & Mobile).");

      try {
         const res = await axios.post("/backend/api/v1/contact.php", {
            ...formData, reason
         });
         if (res.data.success) {
            toast.success("Message sent! We'll reply within 24 hours.");
            setFormData({ your_name: "", is_owner: "No", business_name: "", mobile: "", email: "", message: "" });
            setReason("");
         }
      } catch (err) {
         toast.error("Process failed. Please try again later.");
      }
   };

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
         <Navbar />
         <main className="flex-grow">
            {/* Immersive Hero Section */}
            <div className="bg-slate-900 pt-10 pb-24 md:pb-32 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
               <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
               
               <div className="container mx-auto px-4 relative z-10 text-center">
                  <span className="inline-block px-4 py-1.5 bg-indigo-600/20 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-indigo-500/30 mb-6">
                     Get in Touch
                  </span>
                  <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight">
                     How Can We Help <br className="hidden md:block" /> Your Business <span className="text-indigo-400">Grow?</span>
                  </h1>
                  <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto font-sans leading-relaxed">
                     Have questions about your listing, our pricing, or need technical help? 
                    Our Salem Business Support is ready to assist you.
                  </p>
               </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 mb-32 relative z-20">
               <div className="grid lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Sidebar: Contact Info */}
                  <div className="lg:col-span-4 space-y-8">
                     <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 space-y-10 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-2 h-24 bg-indigo-600 translate-x-1 group-hover:translate-x-0 transition-transform duration-500" />
                        
                        <div className="space-y-12">
                           <div className="flex gap-6 group/item">
                               <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all shrink-0 shadow-sm">
                                  <Phone size={24} />
                               </div>
                               <div>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-sans">WhatsApp Support</p>
                                  <p className="text-xl font-display font-bold text-indigo-600">+91 96550 20304</p>
                                  <p className="text-xs font-bold text-indigo-400 uppercase mt-1">Chat 10AM - 10PM</p>
                               </div>
                           </div>

                           <div className="flex gap-6 group/item">
                              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all shrink-0 shadow-sm">
                                 <Mail size={24} />
                              </div>
                              <div>
                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-sans">Email Support</p>
                                 <p className="text-xl font-display font-bold text-indigo-600">Salembusiness37@gmail.com</p>
                                 <p className="text-xs font-bold text-indigo-400 uppercase mt-1">Reply within 24hrs</p>
                              </div>
                           </div>

                           <div className="flex gap-6 group/item">
                              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all shrink-0 shadow-sm">
                                 <MapPin size={24} />
                              </div>
                              <div>
                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-sans">Local Office</p>
                                 <p className="text-xl font-display font-bold text-indigo-600">2/1D shivayanagar, opp. kv.thangabalum.p house, Alagapuram Periyaputhur, Salem, Tamil Nadu 636004</p>
                                 <p className="text-xs font-bold text-indigo-400 uppercase mt-1">Visit Locally</p>
                              </div>
                           </div>
                        </div>

                        <div className="pt-10 border-t border-gray-100 grid grid-cols-3 gap-4">
                           {[Globe, ShieldCheck, HelpCircle].map((Icon, idx) => (
                              <div key={idx} className="w-full flex items-center justify-center p-4 bg-gray-50 rounded-2xl text-indigo-600/20 hover:text-indigo-400 transition-colors cursor-pointer">
                                 <Icon size={20} />
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Member Center Promo Card */}
                     <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                              <ShieldCheck size={24} className="text-indigo-400" />
                           </div>
                           <h4 className="font-display font-bold text-xl uppercase tracking-widest tracking-tight">Member Portal</h4>
                        </div>
                        <p className="text-white/50 font-sans leading-relaxed text-sm mb-10 italic">
                           Already a registered business owner? Manage your listing, leads, and analytics through your secure dashboard.
                        </p>
                        <Button className="w-full bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white rounded-[1.5rem] py-8 h-auto font-bold font-sans shadow-xl transform active:scale-95 transition-all text-base border-none">
                           Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                     </div>
                  </div>

                  {/* Right Column: Contact Form */}
                  <div className="lg:col-span-8 bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-white relative group">
                     <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent pointer-events-none rounded-[4rem]" />
                     
                     <div className="relative z-10">
                        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-gray-100">
                           <div>
                              <h2 className="text-3xl font-display font-bold text-indigo-600">Send a Message</h2>
                              <p className="text-gray-400 font-sans mt-1">Please fill the form below and we'll respond shortly.</p>
                           </div>
                           <div className="h-10 w-1 bg-indigo-600 hidden md:block" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">
                           <div className="space-y-4">
                              <label className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest ml-4 font-sans flex items-center gap-2">
                                 <MessageSquare size={13} className="text-indigo-400" /> 1. What is the reason for inquiry?
                              </label>
                              <div className="relative group/sel">
                                 <select
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full h-16 rounded-2xl bg-white border-2 border-gray-100 px-8 font-bold font-sans text-indigo-600 outline-none focus:ring-4 focus:ring-[#C9973A]/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                 >
                                    <option value="">Select a reason...</option>
                                    <option value="Listing Update">Business Listing Correction</option>
                                    <option value="Listing Removal">Permanent Listing Removal</option>
                                    <option value="Pricing">Premium Advertising / Pricing</option>
                                    <option value="Technical">Website Technical Issue</option>
                                    <option value="Partnership">Business Partnership Inquiry</option>
                                 </select>
                                 <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover/sel:text-indigo-400 transition-colors">
                                    <ChevronRight className="rotate-90" size={18} />
                                 </div>
                              </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                 <label className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest ml-4 font-sans flex items-center gap-2">
                                    <User size={13} className="text-indigo-400" /> 2. Full Name *
                                 </label>
                                 <Input 
                                    name="your_name" 
                                    value={formData.your_name} 
                                    onChange={handleChange} 
                                    placeholder="e.g. John Doe" 
                                    className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-lg h-auto font-bold text-indigo-600 focus:ring-4 focus:ring-[#C9973A]/10 focus:border-indigo-500 transition-all shadow-none placeholder:text-gray-300" 
                                 />
                              </div>
                              <div className="space-y-4">
                                 <label className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest ml-4 font-sans flex items-center gap-2">
                                    <ShieldCheck size={13} className="text-indigo-400" /> 3. Are you a Business Owner?
                                 </label>
                                 <div className="relative">
                                    <select name="is_owner" value={formData.is_owner} onChange={handleChange} className="w-full h-16 rounded-2xl bg-white border-2 border-gray-100 px-8 font-bold font-sans text-indigo-600 outline-none focus:ring-4 focus:ring-[#C9973A]/10 focus:border-indigo-500 transition-all appearance-none">
                                       <option value="No">No, I'm a visitor</option>
                                       <option value="Yes">Yes, I'm an Owner</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                       <ChevronRight className="rotate-90" size={18} />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-4">
                              <label className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest ml-4 font-sans flex items-center gap-2">
                                 <Building size={13} className="text-indigo-400" /> 4. Business Name (Optional)
                              </label>
                              <Input 
                                 name="business_name" 
                                 value={formData.business_name} 
                                 onChange={handleChange} 
                                 placeholder="Name of your enterprise" 
                                 className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-lg h-auto font-bold text-indigo-600 focus:ring-4 focus:ring-[#C9973A]/10 focus:border-indigo-500 transition-all shadow-none placeholder:text-gray-300" 
                              />
                           </div>

                           <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                 <label className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest ml-4 font-sans flex items-center gap-2">
                                    <Phone size={13} className="text-indigo-400" /> 5. Mobile Number *
                                 </label>
                                 <Input 
                                    name="mobile" 
                                    value={formData.mobile} 
                                    onChange={handleChange} 
                                    placeholder="+91 00000 00000" 
                                    className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-lg h-auto font-bold text-indigo-600 focus:ring-4 focus:ring-[#C9973A]/10 focus:border-indigo-500 transition-all shadow-none placeholder:text-gray-300" 
                                 />
                              </div>
                              <div className="space-y-4">
                                 <label className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest ml-4 font-sans flex items-center gap-2">
                                    <Mail size={13} className="text-indigo-400" /> 6. Email Address
                                 </label>
                                 <Input 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    placeholder="example@gmail.com" 
                                    className="rounded-2xl border-2 border-gray-100 bg-white p-8 text-lg h-auto font-bold text-indigo-600 focus:ring-4 focus:ring-[#C9973A]/10 focus:border-indigo-500 transition-all shadow-none placeholder:text-gray-300" 
                                 />
                              </div>
                           </div>

                           <div className="space-y-4">
                              <label className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest ml-4 font-sans flex items-center gap-2">
                                 <Send size={13} className="text-indigo-400" /> 7. Detailed Message
                              </label>
                              <Textarea 
                                 name="message" 
                                 value={formData.message} 
                                 onChange={handleChange} 
                                 className="rounded-[2.5rem] border-2 border-gray-100 bg-white p-10 text-lg min-h-[200px] font-bold text-indigo-600 focus:ring-4 focus:ring-[#C9973A]/10 focus:border-indigo-500 transition-all outline-none placeholder:text-gray-300" 
                                 placeholder="How can we assist you today? Please be as descriptive as possible." 
                              />
                           </div>

                           <div className="pt-8">
                              <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-900 text-white rounded-[2rem] py-10 h-auto font-bold font-sans shadow-2xl text-xl border-none transform active:scale-[0.98] transition-all group overflow-hidden relative">
                                 <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
                                 <span className="relative z-10 flex items-center justify-center gap-3">
                                    Send Message <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                 </span>
                              </Button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </main>

         <Footer />
      </div>
   );
}
