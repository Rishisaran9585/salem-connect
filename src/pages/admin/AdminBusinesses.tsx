import { useState, useEffect, useCallback } from "react";
import { 
  Search, Filter, CheckCircle, XCircle, Trash2, 
  MapPin, Phone, Mail, Globe, Clock, ShieldCheck, 
  ChevronRight, ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "@/lib/api";

interface Business {
  id: number;
  business_name: string;
  owner_name: string;
  category_name: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  verified: boolean;
  mobile: string;
  email: string;
  address: string;
  area: string;
  city: string;
  created_at: string;
}

export default function AdminBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedBiz, setSelectedBiz] = useState<Business | null>(null);

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API.admin.BUSINESSES}?status=${filter}&search=${search}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) setBusinesses(res.data.data);
    } catch (err) {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const updateStatus = async (id: number, status: string, verified: boolean = false) => {
    try {
      const res = await axios.put(API.admin.BUSINESSES, {
        id, status, verified
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        toast.success(`Business marked as ${status}`);
        fetchBusinesses();
        setSelectedBiz(null);
      }
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const deleteBiz = async (id: number) => {
    if (!window.confirm("Delete this listing permanently?")) return;
    try {
      await axios.delete(`${API.admin.BUSINESSES}?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      toast.success("Listing removed");
      fetchBusinesses();
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header section */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#1B4332]">Business Listings</h1>
          <p className="text-gray-500 font-sans mt-1">Manage and approve local businesses in Salem Directory.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
             <Input 
               placeholder="Search name, mobile, email..."
               className="pl-12 w-64 md:w-80 rounded-full border-gray-100 bg-gray-50 p-6 text-lg focus:ring-[#C9973A] font-sans"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
          </div>
          <select 
            className="rounded-full bg-gray-50 border-gray-100 px-8 py-3 text-sm font-bold font-sans text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C9973A] shadow-sm appearance-none cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
             <option value="all">ALL LISTINGS</option>
             <option value="pending">PENDING ONLY</option>
             <option value="approved">APPROVED ONLY</option>
             <option value="rejected">REJECTED ONLY</option>
          </select>
        </div>
      </div>

      {/* Grid view of listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {businesses.map((biz) => (
            <motion.div 
              key={biz.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="p-8 grow">
                <div className="flex justify-between items-start mb-6">
                  <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    biz.status === 'approved' ? 'bg-success/10 text-success' : 
                    biz.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-red-50 text-red-500'
                  }`}>
                    {biz.status}
                  </div>
                  {biz.verified && <ShieldCheck className="w-5 h-5 text-success" />}
                </div>

                <h3 className="text-xl font-display font-bold text-[#1B4332] mb-2 leading-tight">
                  {biz.business_name}
                </h3>
                <p className="text-xs font-sans font-bold text-[#C9973A] uppercase tracking-widest mb-6">
                  {biz.category_name}
                </p>

                <div className="space-y-3">
                   <div className="flex items-start gap-3 text-sm font-sans text-gray-500">
                      <MapPin className="w-4 h-4 text-[#1B4332]/40 shrink-0" />
                      <span className="line-clamp-1">{biz.area}, {biz.city}</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm font-sans text-gray-500">
                      <Phone className="w-4 h-4 text-[#1B4332]/40 shrink-0" />
                      <span>{biz.mobile}</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm font-sans text-gray-500">
                      <Mail className="w-4 h-4 text-[#1B4332]/40 shrink-0" />
                      <span className="line-clamp-1">{biz.email}</span>
                   </div>
                </div>
              </div>

              <div className="p-2 border-t border-gray-50 flex gap-2">
                 <button 
                   onClick={() => setSelectedBiz(biz)}
                   className="grow bg-[#1B4332]/5 text-[#1B4332] py-4 rounded-xl font-bold font-sans text-sm hover:bg-[#1B4332] hover:text-white transition-all flex items-center justify-center gap-2"
                 >
                    View Details <ChevronRight size={16} />
                 </button>
                 <button 
                   onClick={() => deleteBiz(biz.id)}
                   className="p-4 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all"
                 >
                    <Trash2 size={20} />
                 </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Business Detail Modal / Flyout */}
      {selectedBiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedBiz(null)}
          />
          <motion.div 
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden p-10 lg:p-14"
          >
            <button 
              onClick={() => setSelectedBiz(null)}
              className="absolute top-8 right-8 p-3 text-gray-400 hover:text-[#1B4332] hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={24} />
            </button>

            <h2 className="text-3xl font-display font-bold text-[#1B4332] mb-2">{selectedBiz.business_name}</h2>
            <p className="text-[#C9973A] font-sans font-bold uppercase tracking-widest mb-10">{selectedBiz.category_name}</p>

            <div className="grid md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Owner Name</p>
                    <p className="font-heading font-bold text-[#1B4332]">{selectedBiz.owner_name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Address</p>
                    <p className="font-heading text-gray-500 text-sm leading-relaxed">{selectedBiz.address}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Registered On</p>
                    <p className="font-heading text-gray-500 text-sm">{new Date(selectedBiz.created_at).toLocaleString()}</p>
                  </div>
               </div>
               
               <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] font-bold text-[#1B4332]/50 uppercase tracking-widest mb-4">Contact Info</p>
                    <div className="space-y-3">
                       <p className="flex items-center gap-3 text-sm font-bold text-[#1B4332]"><Phone size={14} className="text-[#C9973A]" /> {selectedBiz.mobile}</p>
                       <p className="flex items-center gap-3 text-sm text-[#1B4332]"><Mail size={14} className="text-[#C9973A]" /> {selectedBiz.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {selectedBiz.status !== 'approved' && (
                      <Button 
                        onClick={() => updateStatus(selectedBiz.id, 'approved', true)}
                        className="grow bg-[#22C55E] hover:bg-[#16a34a] text-white rounded-2xl py-6 font-bold shadow-lg"
                      >
                         <CheckCircle className="mr-2" /> Approve Listing
                      </Button>
                    )}
                    {selectedBiz.status !== 'rejected' && (
                      <Button 
                        onClick={() => updateStatus(selectedBiz.id, 'rejected')}
                        variant="outline"
                        className="grow border-red-100 text-red-500 hover:bg-red-50 rounded-2xl py-6 font-bold"
                      >
                         <XCircle className="mr-2" /> Reject
                      </Button>
                    )}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
