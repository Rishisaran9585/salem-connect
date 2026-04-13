import { useState, useEffect } from "react";
import { Mail, MailOpen, CheckCircle, Trash2, ChevronRight, MessageSquare, ShieldCheck, User, Phone } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface Contact {
  id: number;
  name: string;
  email?: string;
  mobile: string;
  business_name?: string;
  reason?: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const url = filter === "all" ? API.admin.CONTACTS : `${API.admin.CONTACTS}?status=${filter}`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        setContacts(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load inbound communications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await axios.put(API.admin.CONTACTS, {
        id,
        status
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        toast.success("Protocol updated: Message marked " + status.toUpperCase());
        fetchContacts();
      }
    } catch (err) {
      toast.error("Failed to update communication status");
    }
  };

  const deleteContact = async (id: number) => {
    if (!window.confirm("Execute removal? Message will be purged from the ledger.")) return;
    try {
      const res = await axios.delete(`${API.admin.CONTACTS}?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        toast.success("Entity removed from feed");
        fetchContacts();
      }
    } catch (err) {
      toast.error("Purge operation failed");
    }
  };

  return (
    <div className="space-y-12 p-6 lg:p-14 bg-slate-50/40 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-3 h-3 bg-indigo-500 rounded-full" />
             <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Inbound Intelligence</p>
          </div>
          <h1 className="text-5xl font-display font-black text-slate-950 tracking-tighter italic">Message <span className="text-indigo-600">Protocol</span></h1>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-50">
          {["all", "new", "read", "resolved"].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-400 hover:text-slate-900"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {loading ? (
             <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting feed synchronization...</p>
             </div>
        ) : contacts.length === 0 ? (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] shadow-xl border border-slate-50">
             <MessageSquare className="w-20 h-20 text-slate-100 mx-auto mb-6" />
             <h3 className="text-xl font-display font-black text-slate-900">Zero active transmissions</h3>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">No messages found in the current filter protocol.</p>
          </div>
        ) : (
          contacts.map((c) => (
            <div key={c.id} className={`group bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-50 transition-all duration-500 relative overflow-hidden ${c.status === "new" ? "ring-2 ring-indigo-600/5 ring-offset-0" : ""}`}>
              {c.status === "new" && (
                 <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              )}
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      c.status === "new" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : 
                      c.status === "resolved" ? "bg-emerald-50 text-emerald-500" : "bg-slate-50 text-slate-300"
                    }`}>
                      {c.status === "new" ? <Mail className="w-6 h-6" /> : c.status === "resolved" ? <CheckCircle className="w-6 h-6" /> : <MailOpen className="w-6 h-6" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-display font-black text-slate-950 tracking-tight">{c.name}</span>
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] ${
                          c.status === "new" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-[9px] font-black text-indigo-600/50 uppercase tracking-widest leading-none drop-shadow-sm">{c.reason || "General transmission"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-200 uppercase tracking-tighter">{new Date(c.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                     <p className="text-[8px] font-bold text-slate-100 uppercase">{new Date(c.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group-hover:bg-slate-950/5 transition-colors">
                      <p className="text-base font-bold text-slate-800 leading-relaxed font-sans italic">"{c.message}"</p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                         <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-200 shadow-inner group-hover:bg-white transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                         </div>
                         <span className="line-clamp-1 truncate">{c.email || "No email"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                         <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-200 shadow-inner group-hover:bg-white transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                         </div>
                         <span>{c.mobile}</span>
                      </div>
                   </div>
                   
                   {c.business_name && (
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50 text-indigo-600">
                         <ShieldCheck className="w-4 h-4" />
                         <span className="text-[10px] font-black uppercase tracking-widest line-clamp-1">Referencing: {c.business_name}</span>
                      </div>
                   )}
                </div>

                <div className="flex gap-3 pt-6 border-t border-slate-50">
                  {c.status !== "resolved" && (
                    <button
                      onClick={() => updateStatus(c.id, c.status === "new" ? "read" : "resolved")}
                      className="grow h-14 rounded-2xl bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-slate-950 transition-all flex items-center justify-center gap-2"
                    >
                      {c.status === "new" ? "Acknowledge" : "Finalize Protocol"} <ChevronRight size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteContact(c.id)}
                    className="p-4 rounded-2xl bg-white text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm border border-slate-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
