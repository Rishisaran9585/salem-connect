import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, User, MapPin, Phone, Mail, 
  Globe, LayoutGrid, CheckCircle, ArrowRight, ArrowLeft, 
  CreditCard, ShieldCheck, AlertCircle, Info, Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";

const steps = [
  { id: 1, title: "Personal", icon: User },
  { id: 2, title: "Business", icon: Building2 },
  { id: 3, title: "Location", icon: MapPin },
  { id: 4, title: "Contact", icon: Phone },
  { id: 5, title: "Preview", icon: Info },
  { id: 6, title: "Payment", icon: CreditCard },
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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories for the dropdown
    axios.get("http://localhost/salem-connect/backend/api/v1/categories.php")
      .then(res => setCategories(res.data.data))
      .catch(err => console.error("Categories fetch failed"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const next = () => setCurrentStep(s => Math.min(s + 1, steps.length));
  const prev = () => setCurrentStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost/salem-connect/backend/api/v1/register.php", formData);
      if (res.data.success) {
        toast.success("Registration submitted! Redirecting to payment...");
        // In a real scenario, trigger Razorpay here
        window.location.href = `/payment-success?id=${res.data.data.id}`;
      }
    } catch (err) {
      toast.error("Registration failed. Please check your inputs.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-32 flex flex-col items-center">
        {/* Page Header */}
        <div className="text-center mb-16 max-w-2xl">
           <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="text-4xl md:text-5xl font-display font-bold text-[#1B4332] mb-6"
           >
             Grow Your Business with <span className="text-[#C9973A]">Salem Directory</span>
           </motion.h1>
           <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="text-gray-500 font-sans text-lg"
           >
             Join thousands of businesses already reaching customers in Salem city. 
             Simple 6-step registration process.
           </motion.p>
        </div>

        {/* Pricing Notice */}
        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="w-full max-w-4xl bg-[#1B4332] rounded-[2rem] p-4 mb-12 flex items-center gap-4 text-white shadow-xl shadow-[#1B4332]/20"
        >
           <div className="bg-[#C9973A] p-3 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
           </div>
           <div className="flex flex-col md:flex-row md:items-center gap-x-8 gap-y-2 text-sm font-sans font-bold uppercase tracking-wider">
              <span>Verification fee: <span className="text-[#C9973A]">₹150</span></span>
              <span className="hidden md:block w-px h-5 bg-white/20"></span>
              <span>Validity: <span className="text-[#C9973A]">Lifetime</span></span>
              <span className="hidden md:block w-px h-5 bg-white/20"></span>
              <span>Order: <span className="text-[#C9973A]">Alphabetical</span></span>
           </div>
        </motion.div>

        {/* Multi-step Form */}
        <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
           
           {/* Sidebar Progress */}
           <div className="bg-[#1B4332] lg:w-72 p-10 flex flex-row lg:flex-col justify-between overflow-x-auto lg:overflow-visible">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-4 group mb-0 lg:mb-8 shrink-0 lg:shrink-1">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                     currentStep >= step.id ? 'bg-[#C9973A] text-white' : 'bg-white/10 text-white/50'
                   }`}>
                      <step.icon size={20} />
                   </div>
                   <div className="hidden lg:block">
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${currentStep >= step.id ? 'text-[#C9973A]' : 'text-white/40'}`}>Step 0{step.id}</p>
                      <p className={`font-sans font-bold text-sm ${currentStep >= step.id ? 'text-white' : 'text-white/40'}`}>{step.title}</p>
                   </div>
                </div>
              ))}
           </div>

           {/* Form Area */}
           <div className="grow p-10 lg:p-16 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Step 1: Personal Info */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-display font-bold text-[#1B4332]">About You</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Your Full Name *</label>
                            <Input name="your_name" value={formData.your_name} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-6 text-lg" placeholder="e.g. John Doe" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Email Address *</label>
                            <Input name="your_email" value={formData.your_email} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-6 text-lg" placeholder="john@example.com" />
                         </div>
                         <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Mobile Number *</label>
                            <Input name="your_mobile" value={formData.your_mobile} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-6 text-lg" placeholder="+91 XXXXX XXXXX" />
                         </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Business details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-display font-bold text-[#1B4332]">Business Essence</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Business Name *</label>
                            <Input name="business_name" value={formData.business_name} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-6 text-lg" placeholder="e.g. Salem Silk Center" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Main Category *</label>
                            <select 
                               name="category_id" 
                               value={formData.category_id}
                               onChange={handleChange}
                               className="w-full rounded-xl border border-gray-100 bg-gray-50 p-3 h-14 font-sans text-lg focus:outline-none focus:ring-2 focus:ring-[#C9973A]"
                            >
                               <option value="">Select Category</option>
                               {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Owner Full Name *</label>
                            <Input name="owner_name" value={formData.owner_name} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-6 text-lg" placeholder="e.g. S. Saravanan" />
                         </div>
                         <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Business Story / Description</label>
                            <Textarea name="description" value={formData.description} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-4 min-h-[120px]" placeholder="Tell customers what makes your business unique..." />
                         </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Location */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-display font-bold text-[#1B4332]">Where in Salem?</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Full Street Address *</label>
                            <Textarea name="address" value={formData.address} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-4" placeholder="Plot No, Street, Road..." />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Area / Locality *</label>
                            <Input name="area" value={formData.area} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-4 text-lg" placeholder="e.g. Shevapet" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Pincode *</label>
                            <Input name="pincode" value={formData.pincode} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-4 text-lg" placeholder="636 XXX" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">City</label>
                            <Input value="Salem" disabled className="rounded-xl border-gray-100 bg-gray-200 p-4 text-lg font-bold" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">State</label>
                            <Input value="Tamil Nadu" disabled className="rounded-xl border-gray-100 bg-gray-200 p-4 text-lg font-bold" />
                         </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Public Contact */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-display font-bold text-[#1B4332]">Contact Information</h2>
                      <p className="text-gray-400 text-sm italic">This info will be visible to your customers.</p>
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Public Mobile *</label>
                            <Input name="mobile" value={formData.mobile} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-4 text-lg" placeholder="+91 XXXXX XXXXX" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Alternate Mobile</label>
                            <Input name="mobile_alt" value={formData.mobile_alt} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-4 text-lg" placeholder="+91 XXXXX XXXXX" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Public Email</label>
                            <Input name="email" value={formData.email} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-4 text-lg" placeholder="business@example.com" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-2">Website URL</label>
                            <Input name="website" value={formData.website} onChange={handleChange} className="rounded-xl border-gray-100 bg-gray-50 p-4 text-lg" placeholder="https://example.com" />
                         </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Logo & Final Preview */}
                  {currentStep === 5 && (
                    <div className="space-y-10">
                      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#1B4332]/20 rounded-[2rem] bg-[#1B4332]/5 group hover:bg-[#1B4332]/10 transition-all">
                         <ImageIcon size={48} className="text-[#C9973A] mb-4" />
                         <p className="text-[#1B4332] font-sans font-bold">Upload Your Business Logo</p>
                         <p className="text-gray-400 text-xs mt-1">Accepts PNG, JPG, WebP. Max 2MB.</p>
                         <Input type="file" className="mt-6 font-sans text-sm" />
                      </div>
                      
                      <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                         <h3 className="font-display font-bold text-[#1B4332] mb-4">You're listing:</h3>
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-[#C9973A] rounded-2xl flex items-center justify-center text-white font-display text-2xl font-bold">
                               {formData.business_name ? formData.business_name[0] : 'S'}
                            </div>
                            <div>
                               <p className="text-xl font-display font-bold text-[#1B4332]">{formData.business_name || 'Business Name'}</p>
                               <p className="text-[#C9973A] text-sm font-bold uppercase tracking-widest">
                                 {categories.find(c => c.id == formData.category_id)?.name || 'Needs Category'}
                               </p>
                            </div>
                         </div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Final Step & Payment */}
                  {currentStep === 6 && (
                    <div className="text-center space-y-10 py-10">
                       <div className="w-24 h-24 bg-[#22C55E]/10 text-[#22C55E] rounded-full flex items-center justify-center mx-auto shadow-xl">
                          <AlertCircle size={48} className="animate-pulse" />
                       </div>
                       <h2 className="text-3xl font-display font-bold text-[#1B4332]">Complete Verification</h2>
                       <div className="p-10 rounded-[2.5rem] bg-gray-50 border-2 border-[#C9973A]/20 shadow-inner">
                          <div className="flex justify-between items-center mb-6">
                             <span className="text-gray-400 font-bold font-sans uppercase tracking-widest">Verification Fee</span>
                             <span className="text-3xl font-display font-bold text-[#1B4332]">₹150.00</span>
                          </div>
                          <div className="flex justify-between items-center text-[#22C55E] font-bold font-sans">
                             <span>Processing</span>
                             <span>FREE</span>
                          </div>
                          <div className="h-px bg-gray-200 my-8"></div>
                          <div className="flex justify-between items-center">
                             <span className="text-xl font-display font-bold text-[#1B4332]">Grand Total</span>
                             <span className="text-4xl font-display font-bold text-[#C9973A]">₹150</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 justify-center text-gray-400 text-sm font-medium">
                          <CheckCircle size={16} className="text-[#22C55E]" />
                          Secure payment integration via Razorpay
                       </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Bar */}
              <div className="pt-16 flex justify-between gap-4">
                 <button 
                   onClick={prev} 
                   className={`p-5 rounded-full flex items-center gap-2 font-bold font-sans transition-all ${
                     currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-[#1B4332] hover:bg-gray-100'
                   }`}
                 >
                    <ArrowLeft size={20} /> Previous
                 </button>
                 
                 {currentStep < 6 ? (
                    <Button 
                      onClick={next} 
                      className="bg-[#1B4332] hover:bg-[#1B4332]/90 text-white rounded-full px-12 py-7 h-auto font-bold font-sans shadow-xl group transition-all transform hover:scale-105 active:scale-95 border-none"
                    >
                       Continue Step 0{currentStep + 1}
                       <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                 ) : (
                    <Button 
                      onClick={handleSubmit}
                      className="bg-[#C9973A] hover:bg-[#C9973A]/90 text-white rounded-full px-16 py-8 h-auto font-bold font-sans shadow-2xl text-xl animate-bounce-slow border-none"
                    >
                       Secure Pay ₹150 & Submit
                    </Button>
                 )}
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
