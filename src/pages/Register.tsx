import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import { toast } from "sonner";
import { alphabetCategories } from "@/data/categories";
export default function Register() {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [currentStep, setCurrentStep] = useState(1);
   const [formData, setFormData] = useState({
      your_name: "",
      business_name: "",
      category_name: "",
      owner_name: "",
      address: "",
      state: "Tamil Nadu",
      city: "Salem",
      pincode: "",
      mobile: "",
      mobile_alt: "",
      email: "",
      website: "",
      message: ""
   });

   const allCategoryNames = useMemo(() => {
      const names = Object.values(alphabetCategories).flat();
      return Array.from(new Set(names)).sort();
   }, []);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleNext = (e: React.FormEvent) => {
      e.preventDefault();
      setCurrentStep(2);
      window.scrollTo(0, 0);
   };

   const handleSubmit = async () => {
      setIsSubmitting(true);
      try {
         const res = await axios.post("/backend/api/v1/register.php", formData);
         if (res.data.success) {
            toast.success("Business details submitted! We will verify after screenshot confirmation.");
            window.location.href = "/";
         }
      } catch (err) {
         toast.error("Failed to submit details.");
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="min-h-screen bg-white flex flex-col">
         <Navbar />
         <main className="flex-grow pt-32 pb-20 font-sans">
            <div className="container mx-auto px-4 max-w-7xl">
               <div className="mb-8">
                  <h1 className="text-3xl font-serif font-bold text-[#1B4332] mb-6">Register Your Business</h1>
                  <div className="h-px bg-gray-200 w-full mb-8" />
                  
                  {currentStep === 1 && (
                     <div className="space-y-4 mb-10">
                        <div className="flex items-start gap-2 text-sm">
                           <span className="text-red-500 mt-1">📌</span>
                           <span className="font-bold text-gray-800">Note:</span>
                        </div>
                        <ul className="space-y-3 ml-6">
                           <li className="flex items-center gap-3 text-[13px] text-gray-700 font-medium">
                              <span className="text-[#3B82F6]">♦</span> Business listings will be displayed in alphabetical order on the business category page.
                           </li>
                           <li className="flex items-center gap-3 text-[13px] text-gray-700 font-medium">
                              <span className="text-[#3B82F6]">♦</span> Verification and Processing Fee: <span className="font-bold text-gray-900">₹150 (One-time Fee).</span>
                           </li>
                           <li className="flex items-center gap-3 text-[13px] text-gray-700 font-medium">
                              <span className="text-[#3B82F6]">♦</span> Payment is non-refundable.
                           </li>
                        </ul>
                     </div>
                  )}
               </div>

               {currentStep === 1 ? (
                  <div className="bg-[#fcfdfd] border border-gray-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10">
                     <form onSubmit={handleNext} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">Your Name *</label>
                              <Input name="your_name" value={formData.your_name} onChange={handleChange} required placeholder="Enter Your Name" className="h-12 bg-white border-gray-300 rounded-md" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">Business Name *</label>
                              <Input name="business_name" value={formData.business_name} onChange={handleChange} required placeholder="Enter Business Name" className="h-12 bg-white border-gray-300 rounded-md" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">Business Category *</label>
                              <select name="category_name" value={formData.category_name} onChange={handleChange} required className="w-full h-12 px-4 bg-white border border-gray-300 rounded-md text-sm outline-none">
                                 <option value="">Select Business Category</option>
                                 {allCategoryNames.map(name => <option key={name} value={name}>{name}</option>)}
                              </select>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">Business Owner Name *</label>
                              <Input name="owner_name" value={formData.owner_name} onChange={handleChange} required placeholder="Enter Business Owner Name" className="h-12 bg-white border-gray-300 rounded-md" />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[13px] font-bold text-[#1B4332]">Address *</label>
                           <Textarea name="address" value={formData.address} onChange={handleChange} required placeholder="Enter Address" className="min-h-[120px] bg-white border-gray-300 rounded-md" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">State *</label>
                              <Input name="state" value={formData.state} onChange={handleChange} required placeholder="Enter State" className="h-12 bg-white border-gray-300 rounded-md" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">City *</label>
                              <Input name="city" value={formData.city} onChange={handleChange} required placeholder="Enter City" className="h-12 bg-white border-gray-300 rounded-md" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">Pincode *</label>
                              <Input name="pincode" value={formData.pincode} onChange={handleChange} required placeholder="Enter Pincode" className="h-12 bg-white border-gray-300 rounded-md" />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">Mobile Number *</label>
                              <Input name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="Enter Mobile Number" className="h-12 bg-white border-gray-300 rounded-md" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">Mobile Number (Alternate)</label>
                              <Input name="mobile_alt" value={formData.mobile_alt} onChange={handleChange} placeholder="Enter Alternate Mobile Number" className="h-12 bg-white border-gray-300 rounded-md" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">Email</label>
                              <Input name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" className="h-12 bg-white border-gray-300 rounded-md" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[13px] font-bold text-[#1B4332]">Website</label>
                              <Input name="website" value={formData.website} onChange={handleChange} placeholder="Enter Website" className="h-12 bg-white border-gray-300 rounded-md" />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[13px] font-bold text-[#1B4332]">Message</label>
                           <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Enter Your Message" className="min-h-[100px] bg-white border-gray-300 rounded-md" />
                        </div>

                        <Button type="submit" className="bg-[#004d40] hover:bg-[#003d33] text-white px-12 h-12 rounded-lg font-bold text-base transition-colors">
                           Proceed
                        </Button>
                     </form>
                  </div>
               ) : (
                  <div className="bg-white border border-dashed border-gray-300 rounded-[2rem] p-10 md:p-20 text-center space-y-10">
                     <div className="max-w-md mx-auto space-y-8">
                        <div className="space-y-2 text-[#1B4332]">
                           <h2 className="text-3xl font-serif font-bold italic">Verification Fee: ₹150</h2>
                           <p className="text-sm font-medium text-gray-500">Scan this QR to pay your one-time verification fee</p>
                        </div>

                        <div className="w-64 h-64 mx-auto border-4 border-[#C9973A] rounded-[2rem] p-4 bg-[#FDFCF9] shadow-inner relative group">
                           <div className="absolute inset-0 bg-[#C9973A]/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                           <img 
                              src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=salemconnect@upi&pn=Salem%20Business&am=150.00&cu=INR" 
                              alt="Sample Payment QR Code" 
                              className="w-full h-full object-contain filter grayscale opacity-50" // Placeholder appearance
                           />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full border border-gray-200 text-[10px] font-black uppercase text-[#1B4332]">Sample QR Code</span>
                           </div>
                        </div>

                        <div className="bg-[#1B4332]/5 rounded-2xl p-6 border border-[#1B4332]/10">
                           <p className="text-[#1B4332] font-bold text-sm leading-relaxed italic">
                              "After completing payment, send the payment screenshot to WhatsApp this number: <span className="text-[#C9973A] font-black underline">9655030405</span>"
                           </p>
                        </div>

                        <div className="flex flex-col gap-4">
                           <Button 
                              onClick={handleSubmit} 
                              disabled={isSubmitting}
                              className="bg-[#004d40] hover:bg-[#003d33] text-white h-14 rounded-full font-bold text-lg shadow-xl"
                           >
                              {isSubmitting ? "Submitting..." : "Submit Registration"}
                           </Button>
                           <button onClick={() => setCurrentStep(1)} className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-[#1B4332]">Go Back</button>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </main>
         <Footer />
      </div>
   );
}
