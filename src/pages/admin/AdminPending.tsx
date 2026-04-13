import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Clock, MapPin, Phone, Building2, User, Calendar } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface PendingBusiness {
  id: number;
  business_name: string;
  owner_name: string;
  category_name: string;
  mobile: string;
  created_at: string;
  area: string;
  status: string;
}

export default function AdminPending() {
  const [businesses, setBusinesses] = useState<PendingBusiness[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${API.admin.BUSINESSES}?status=pending`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        setBusinesses(res.data.data);
      }
    } catch (err) {
      toast.error("Network disruption: Pending feed offline");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const res = await axios.put(API.admin.BUSINESSES, {
        id,
        status: 'approved'
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        toast.success("Protocol authorized: Entity confirmed");
        fetchPending();
      }
    } catch (err) {
      toast.error("Authorization protocol failed");
    }
  };

  const handleReject = async (id: number) => {
    try {
      const res = await axios.put(API.admin.BUSINESSES, {
        id,
        status: 'rejected'
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        toast.success("Protocol declined: Entity rejected");
        fetchPending();
      }
    } catch (err) {
      toast.error("Declined protocol failed");
    }
  };

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scanning validation queue...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 p-6 lg:p-14 bg-slate-50/40 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
             <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Verification Protocol</p>
          </div>
          <h1 className="text-5xl font-display font-black text-slate-950 tracking-tighter italic">Approval <span className="text-indigo-600">Queue</span></h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">
            {businesses.length} ENTITIES AWAITING VALIDATION
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {businesses.length === 0 ? (
           <div className="col-span-full py-32 text-center bg-white rounded-[3rem] shadow-xl border border-slate-50">
              <Clock className="w-20 h-20 text-slate-100 mx-auto mb-6" />
              <h3 className="text-xl font-display font-black text-slate-900">Queue Clear</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Zero pending entities in the current cycle.</p>
           </div>
        ) : (
          businesses.map((b) => (
            <div key={b.id} className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-50 overflow-hidden group hover:shadow-indigo-600/5 transition-all duration-500 flex flex-col">
              <div className="p-10 space-y-8 flex-grow">
                 <div className="flex justify-between items-start">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner">
                       <Clock size={28} />
                    </div>
                    <span className="px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm">Pending</span>
                 </div>

                 <div className="space-y-2">
                    <h3 className="text-2xl font-display font-black text-slate-950 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-1">{b.business_name}</h3>
                    <div className="flex items-center gap-2">
                       <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest line-clamp-1">/ {b.category_name || 'Unclassified'}</p>
                    </div>
                 </div>

                 <div className="space-y-6 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                       <User className="w-4 h-4 text-indigo-600/20" />
                       <span className="line-clamp-1">{b.owner_name || 'Anonymous Principal'}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                       <MapPin className="w-4 h-4 text-indigo-600/20" />
                       <span className="line-clamp-1">{b.area}, Salem</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                       <Calendar className="w-4 h-4 text-indigo-600/20" />
                       <span className="line-clamp-1">Submitted: {new Date(b.created_at).toLocaleDateString()}</span>
                    </div>
                 </div>
              </div>

              <div className="p-4 bg-slate-50/50 flex gap-2">
                <button 
                  onClick={() => handleApprove(b.id)}
                  className="grow bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-slate-950 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} /> Authorize
                </button>
                <button 
                  onClick={() => handleReject(b.id)}
                  className="p-5 text-slate-300 hover:text-red-500 rounded-[1.5rem] hover:bg-red-50 transition-all bg-white shadow-sm border border-slate-100"
                >
                  <XCircle size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
