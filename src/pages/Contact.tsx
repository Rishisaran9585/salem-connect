import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, Phone, MapPin, Globe, MessageSquare, 
  Send, ShieldCheck, HelpCircle, User, Building, AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "react-hot-toast";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.your_name || !formData.mobile) return toast.error("Please fill required fields.");
    
    try {
      const res = await axios.post("http://localhost/salem-connect/backend/api/v1/contact.php", {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-32 container mx-auto px-4">
        {/* Contact Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
           <motion.span 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-[#C9973A] font-sans font-bold uppercase tracking-widest text-xs mb-4 block"
           >
             Support Center
           </motion.span>
           <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="text-5xl md:text-6xl font-display font-bold text-[#1B4332] mb-8"
           >
             Get in <span className="text-[#C9973A]">Touch</span>
           </motion.h1>
           <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="text-gray-500 font-sans text-xl"
           >
             Have questions about your listing? Want to partner with us? 
             Our Salem-based team is here to help you grow.
           </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
           {/* Reach info (Col 5) */}
           <div className="lg:col-span-5 space-y-12">
              <div className="space-y-10">
                 <div className="flex gap-8 group">
                    <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#C9973A] shrink-0 border border-gray-100 group-hover:bg-[#C9973A] group-hover:text-white transition-all transform group-hover:rotate-6">
                       <Phone size={32} />
                    </div>
                    <div>
                       <h3 className="text-xl font-display font-bold text-[#1B4332]">Call Our Helpline</h3>
                       <p className="text-gray-400 mt-1 font-sans">+91 427 XXXXXXX</p>
                       <p className="text-[#C9973A] text-sm font-bold uppercase mt-2 tracking-widest">Available 10AM - 6PM</p>
                    </div>
                 </div>

                 <div className="flex gap-8 group">
                    <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#C9973A] shrink-0 border border-gray-100 group-hover:bg-[#C1973A] group-hover:text-white transition-all transform group-hover:-rotate-6">
                       <Mail size={32} />
                    </div>
                    <div>
                       <h3 className="text-xl font-display font-bold text-[#1B4332]">Email Support</h3>
                       <p className="text-gray-400 mt-1 font-sans">support@salemdir.in</p>
                       <p className="text-[#C9973A] text-sm font-bold uppercase mt-2 tracking-widest">Reply within 24hrs</p>
                    </div>
                 </div>

                 <div className="flex gap-8 group">
                    <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#C1973A] shrink-0 border border-gray-100 group-hover:bg-[#C9973A] group-hover:text-white transition-all transform group-hover:rotate-6">
                       <MapPin size={32} />
                    </div>
                    <div>
                       <h3 className="text-xl font-display font-bold text-[#1B4332]">Local Office</h3>
                       <p className="text-gray-400 mt-1 font-sans">Near Bus Stand, Meyyanur Road, Salem.</p>
                       <p className="text-[#C9973A] text-sm font-bold uppercase mt-2 tracking-widest">Visit Locally</p>
                    </div>
                 </div>
              </div>

              {/* Verified Information Box */}
              <div className="bg-[#1B4332] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9973A]/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
                 <div className="flex items-center gap-4 mb-6">
                   <ShieldCheck size={32} className="text-[#C9973A]" />
                   <h4 className="font-display font-bold text-xl uppercase tracking-widest">Member Center</h4>
                 </div>
                 <p className="text-white/60 font-sans leading-relaxed text-sm mb-10 italic italic">
                    Already an approved member? Log in to your business dashboard to update your listing directly.
                 </p>
                 <Button className="w-full bg-[#C9973A] text-white rounded-2xl py-6 font-bold font-sans shadow-xl transform active:scale-95 transition-all text-sm border-none">
                   Go to Member Portal
                 </Button>
              </div>
           </div>

           {/* Contact Form (Col 7) */}
           <div className="lg:col-span-7 bg-white p-10 lg:p-16 rounded-[4rem] shadow-2xl border border-gray-100 relative group">
              <div className="absolute top-0 right-0 h-2 bg-[#C9973A] w-1/3 rounded-full translate-y-1 group-hover:w-full transition-all duration-700" />
              
              <form onSubmit={handleSubmit} className="space-y-10">
                 <div className="space-y-4">
                    <label className="text-xs font-bold text-[#1B4332]/40 uppercase tracking-widest pl-4">Reason for inquiry</label>
                    <select 
                      value={reason} 
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full h-16 rounded-2xl bg-gray-50 border-gray-100 px-6 font-bold font-sans text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C9973A] shadow-sm appearance-none cursor-pointer"
                    >
                       <option value="">Select a reason...</option>
                       <option value="Listing Update">Business Listing Wrong</option>
                       <option value="Listing Removal">Remove My Listing</option>
                       <option value="Pricing">Billing / Pricing Inquiry</option>
                       <option value="Technical">Technical Issue</option>
                       <option value="Partnership">Partnership Inquiry</option>
                    </select>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest pl-4"><User size={12} /> Your Name *</label>
                       <Input name="your_name" value={formData.your_name} onChange={handleChange} className="rounded-2xl border-gray-100 bg-gray-50 p-6 text-lg h-auto" />
                    </div>
                    <div className="space-y-3">
                       <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest pl-4"><MessageSquare size={12} /> Owner Status</label>
                       <select name="is_owner" value={formData.is_owner} onChange={handleChange} className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-3 h-auto font-sans focus:outline-none focus:ring-2 focus:ring-[#C9973A]">
                          <option value="No">No, I'm a visitor</option>
                          <option value="Yes">Yes, I'm an Owner</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest pl-4"><Building size={12} /> Business Name (If applicable)</label>
                    <Input name="business_name" value={formData.business_name} onChange={handleChange} className="rounded-2xl border-gray-100 bg-gray-50 p-6 text-lg h-auto" />
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest pl-4"><Phone size={12} /> Mobile Number *</label>
                       <Input name="mobile" value={formData.mobile} onChange={handleChange} className="rounded-2xl border-gray-100 bg-gray-50 p-6 text-lg h-auto" />
                    </div>
                    <div className="space-y-3">
                       <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest pl-4"><Mail size={12} /> Email Address</label>
                       <Input name="email" value={formData.email} onChange={handleChange} className="rounded-2xl border-gray-100 bg-gray-50 p-6 text-lg h-auto" />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest pl-4"><Send size={12} /> Your Message</label>
                    <Textarea name="message" value={formData.message} onChange={handleChange} className="rounded-2xl border-gray-100 bg-gray-50 p-6 text-lg min-h-[150px]" placeholder="Tell us how we can help you..." />
                 </div>

                 <Button type="submit" className="w-full bg-[#1B4332] hover:bg-[#1B4332]/90 text-white rounded-2xl py-10 h-auto font-bold font-sans shadow-2xl text-xl border-none transform active:scale-95 transition-all">
                    Submit Inquiry <ArrowRight className="ml-3 group-hover:translate-x-1" />
                 </Button>
              </form>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { ArrowRight, Building } from "lucide-react";
