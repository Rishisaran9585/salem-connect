import { useState, useEffect, useCallback } from "react";
import { 
  Search, CheckCircle, XCircle, Trash2, 
  MapPin, Phone, Mail, ChevronRight, ArrowLeft,
  ShieldCheck, AlertCircle, Calendar, CornerDownRight
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
      toast.error("Could not load businesses.");
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
        toast.success(`Business ${status} successfully.`);
        fetchBusinesses();
        setSelectedBiz(null);
      }
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  const deleteBiz = async (id: number) => {
    if (!window.confirm("Are you sure? This delete is permanent.")) return;
    try {
      await axios.delete(`${API.admin.BUSINESSES}?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      toast.success("Business deleted.");
      fetchBusinesses();
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="space-y-12 p-6 lg:p-14 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 bg-indigo-500 rounded-full" />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Manage Businesses</p>
          </div>
          <h1 className="text-5xl font-display font-black text-slate-950 tracking-tighter uppercase italic">Businesses</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
              <Input 
                placeholder="Search businesses..."
                className="pl-12 w-64 md:w-80 h-12 rounded-xl border-slate-100 bg-white shadow-sm font-bold"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <select 
             className="h-12 rounded-xl bg-white border-slate-100 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm transition-all"
             value={filter}
             onChange={(e) => setFilter(e.target.value)}
           >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
           </select>
        </div>
      </div>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center space-y-4">
           <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading businesses...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {businesses.map((biz) => (
              <motion.div 
                key={biz.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-[2.5rem] shadow-lg border border-slate-50 overflow-hidden group hover:shadow-indigo-600/5 transition-all"
              >
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className={`px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm ${
                      biz.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                      biz.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {biz.status}
                    </div>
                    {biz.verified && <ShieldCheck className="w-4 h-4 text-indigo-600" />}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-950 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {biz.business_name}
                    </h3>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                       {biz.category_name}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-50">
                     <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600/30" />
                        <span className="line-clamp-1">{biz.area}, {biz.city}</span>
                     </div>
                     <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                        <Phone className="w-3.5 h-3.5 text-indigo-600/30" />
                        <span>{biz.mobile}</span>
                     </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 flex gap-2">
                   <button onClick={() => setSelectedBiz(biz)} className="grow bg-white text-slate-900 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-sm hover:bg-slate-950 hover:text-white transition-all flex items-center justify-center gap-2">
                      Details <ChevronRight size={14} />
                   </button>
                   <button onClick={() => deleteBiz(biz.id)} className="p-3 text-slate-300 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all bg-white shadow-sm border border-slate-100">
                      <Trash2 size={18} />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Business Details Modal */}
      <AnimatePresence>
      {selectedBiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden p-10 md:p-14"
          >
            <button onClick={() => setSelectedBiz(null)} className="absolute top-8 right-8 p-3 text-slate-300 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-all">
              <ArrowLeft size={20} />
            </button>

            <div className="space-y-10">
               <div>
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest mb-4 w-fit ${
                    selectedBiz.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                    selectedBiz.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {selectedBiz.status}
                  </div>
                  <h2 className="text-3xl font-display font-black text-slate-950 tracking-tight">{selectedBiz.business_name}</h2>
                  <p className="text-indigo-600 font-bold uppercase tracking-widest text-[9px] mt-2">{selectedBiz.category_name} Directory</p>
               </div>

               <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <div className="flex items-start gap-4">
                        <UserIcon className="w-5 h-5 text-indigo-400 mt-1" />
                        <div className="space-y-1">
                           <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Owner</p>
                           <p className="font-bold text-slate-900">{selectedBiz.owner_name}</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-indigo-400 mt-1" />
                        <div className="space-y-1">
                           <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Location</p>
                           <p className="font-bold text-slate-900 line-clamp-2">{selectedBiz.address}, {selectedBiz.area}</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <Calendar className="w-5 h-5 text-indigo-400 mt-1" />
                        <div className="space-y-1">
                           <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Registered Date</p>
                           <p className="font-bold text-slate-900">{new Date(selectedBiz.created_at).toLocaleDateString()}</p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="p-8 rounded-[2rem] bg-slate-950 text-white space-y-4">
                        <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Contact Information</p>
                        <p className="flex items-center gap-3 font-bold text-lg"><Phone size={18} className="text-indigo-400" /> {selectedBiz.mobile}</p>
                        <p className="flex items-center gap-3 text-sm text-white/60 truncate"><Mail size={16} className="text-indigo-400" /> {selectedBiz.email}</p>
                     </div>

                     <div className="flex gap-3">
                        {selectedBiz.status !== 'approved' && (
                          <Button onClick={() => updateStatus(selectedBiz.id, 'approved', true)} className="grow bg-emerald-500 hover:bg-slate-900 text-white rounded-xl h-14 font-bold uppercase tracking-widest transition-all">
                             Approve
                          </Button>
                        )}
                        {selectedBiz.status !== 'rejected' && (
                          <Button onClick={() => updateStatus(selectedBiz.id, 'rejected')} variant="outline" className="grow border-slate-100 text-red-500 hover:bg-red-50 rounded-xl h-14 font-bold uppercase tracking-widest transition-all">
                             Reject
                          </Button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
  );
}

function UserIcon({ className }: { className?: string }) {
   return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
   );
}
