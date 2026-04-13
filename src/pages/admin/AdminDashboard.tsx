import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area
} from "recharts";
import { 
  Building2, CreditCard, Clock, TrendingUp, ArrowUpRight, Plus, FolderPlus
} from "lucide-react";
import axios from "axios";
import { API } from "@/lib/api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  stats: {
    total_businesses: number;
    pending_approvals: number;
    new_today: number;
    total_revenue: number;
    total_categories: number;
    new_contacts: number;
  };
  monthly_registrations: Array<{ month: string; count: number }>;
  recent_businesses: Array<{ 
    id: number; 
    business_name: string; 
    category_name: string; 
    status: string; 
    created_at: string 
  }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const token = localStorage.getItem("admin_token");
        if (!token) {
          setError("Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get(API.admin.STATS, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
        
        if (res.data.success) {
          setData(res.data.data);
        } else {
          setError(res.data.message || "Could not load data.");
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("Your session expired. Please login again.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
     <div className="p-20 flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Dashboard...</p>
     </div>
  );

  if (error) return (
    <div className="p-12 text-center bg-white rounded-[2rem] shadow-xl border border-red-50 max-w-2xl mx-auto my-20">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Clock size={40} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">{error}</h3>
      <p className="text-slate-400 mb-10">Try refreshing the page or logging in again.</p>
      <Link to="/admin/login">
        <Button className="bg-indigo-600 hover:bg-slate-900 text-white rounded-xl px-10 py-6 font-bold">
           Go to Login
        </Button>
      </Link>
    </div>
  );

  if (!data) return null;

  const statCards = [
    { label: "Total Businesses", value: data.stats.total_businesses, icon: Building2, color: "text-indigo-600", bg: "bg-indigo-600/5" },
    { label: "Pending Approvals", value: data.stats.pending_approvals, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/5" },
    { label: "New Today", value: data.stats.new_today, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/5" },
    { label: "Total Revenue", value: `₹${data.stats.total_revenue}`, icon: CreditCard, color: "text-slate-900", bg: "bg-slate-900/5" },
  ];

  return (
    <div className="space-y-10 p-6 lg:p-12 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight text-uppercase">Dashboard</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Manage your directory from here</p>
        </div>
        <div className="flex gap-4">
           <Link to="/admin/categories">
              <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 font-bold px-6 h-12">
                 <FolderPlus size={18} className="mr-2" /> Categories
              </Button>
           </Link>
           <Link to="/admin/businesses">
              <Button className="bg-indigo-600 hover:bg-slate-950 text-white rounded-xl font-bold px-8 h-12 shadow-lg shadow-indigo-600/20">
                 <Plus size={18} className="mr-2" /> Add Business
              </Button>
           </Link>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-50">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-display font-bold text-slate-950">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Trend Chart */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 shadow-lg border border-slate-50">
          <div className="mb-10">
            <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Registration Trends</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Busineses added in last 6 months</p>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthly_registrations}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Hub */}
        <div className="lg:col-span-4 space-y-10">
           {/* Action Widget */}
           <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10 space-y-6">
                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400">
                    <Clock size={24} />
                 </div>
                 <div>
                    <h4 className="text-xl font-display font-bold leading-tight">Pending Approvals</h4>
                    <p className="text-white/40 text-sm mt-2">{data.stats.pending_approvals} businesses are waiting for your review.</p>
                 </div>
                 <Link to="/admin/businesses/pending" className="block text-center">
                    <Button className="w-full bg-indigo-600 hover:bg-white hover:text-indigo-600 h-12 rounded-xl font-bold transition-all text-xs uppercase tracking-widest">
                       Review All
                    </Button>
                 </Link>
              </div>
           </div>

           {/* Quick Stats Distribution */}
           <div className="bg-white rounded-[2.5rem] p-10 shadow-lg border border-slate-50 space-y-8">
              <h4 className="text-lg font-display font-bold text-slate-900 tracking-tight">Global Status</h4>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Listings</span>
                       <span className="text-indigo-600 font-bold text-xs">85%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full">
                       <div className="h-full bg-indigo-600 w-[85%] rounded-full" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Categories</span>
                       <span className="text-emerald-500 font-bold text-xs">100%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full">
                       <div className="h-full bg-emerald-500 w-full rounded-full" />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* List Wrapper */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-lg border border-slate-50">
        <div className="flex justify-between items-center mb-10">
           <div>
             <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Recently Added</h2>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Latest business registrations</p>
           </div>
           <Link to="/admin/businesses">
              <Button variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50 px-4 rounded-xl flex gap-2">
                 View All <ArrowUpRight size={18} />
              </Button>
           </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Business Name</th>
                <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Added On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.recent_businesses.map((biz) => (
                <tr key={biz.id}>
                  <td className="py-6">
                     <span className="font-bold text-slate-900">{biz.business_name}</span>
                  </td>
                  <td className="py-6">
                     <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">{biz.category_name}</span>
                  </td>
                  <td className="py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      biz.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                      biz.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {biz.status}
                    </span>
                  </td>
                  <td className="py-6 text-right font-bold text-slate-400 text-[10px]">
                     {new Date(biz.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
