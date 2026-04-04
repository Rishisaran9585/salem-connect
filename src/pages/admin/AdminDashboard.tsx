import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { 
  Users, Building2, CreditCard, Clock, CheckCircle, 
  MessageSquare, TrendingUp, ArrowUpRight 
} from "lucide-react";
import axios from "axios";
import { API } from "@/lib/api";

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

const COLORS = ["#1B4332", "#C9973A", "#22C55E", "#F59E0B"];

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
          setError("Not authenticated. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await axios.get(API.admin.STATS, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (res.data.success) {
          setData(res.data.data);
        } else {
          setError(res.data.message || "Failed to load statistics");
        }
      } catch (err: any) {
        console.error("Error fetching dashboard stats:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
        } else {
          setError(err.response?.data?.message || "Error loading statistics");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 font-sans animate-pulse">Analyzing dashboard data...</div>;
  if (error) return <div className="p-10 text-red-500 font-bold font-sans">{error}</div>;
  if (!data) return <div className="p-10 text-red-500 font-bold font-sans">Error loading statistics.</div>;

  const statCards = [
    { label: "Total Businesses", value: data.stats.total_businesses, icon: Building2, color: "text-[#1B4332]", bg: "bg-[#1B4332]/5" },
    { label: "Pending Approvals", value: data.stats.pending_approvals, icon: Clock, color: "text-[#F59E0B]", bg: "bg-warning/10" },
    { label: "Daily New", value: data.stats.new_today, icon: TrendingUp, color: "text-[#22C55E]", bg: "bg-success/10" },
    { label: "Total Revenue", value: `₹${data.stats.total_revenue}`, icon: CreditCard, color: "text-[#C9973A]", bg: "bg-[#C9973A]/10" },
  ];

  return (
    <div className="space-y-8 p-6 lg:p-10 bg-gray-50/50 min-h-screen">
      <div>
        <h1 className="text-4xl font-display font-bold text-[#1B4332]">Dashboard Overview</h1>
        <p className="text-gray-500 font-sans mt-2">Welcome back. Here's a summary of Salem Directory's performance.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className={`bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group`}>
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <p className="text-gray-400 font-sans font-bold uppercase tracking-widest text-xs">{stat.label}</p>
            <h3 className={`text-4xl font-display font-bold mt-2 ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Registration Chart */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-display font-bold text-[#1B4332]">Registration Trends</h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-[#C9973A] rounded-full"></span>
              <span className="text-xs font-bold text-gray-400 font-sans uppercase">Last 6 Months</span>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthly_registrations}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9973A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9973A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '1.5rem'}}
                />
                <Area type="monotone" dataKey="count" stroke="#C9973A" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-display font-bold text-[#1B4332] mb-10">System Status</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-sm font-bold font-sans text-gray-500 uppercase tracking-widest mb-3">
                <span>Database Health</span>
                <span className="text-success">98% OPTIMAL</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-success w-[98%] rounded-full shadow-lg"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold font-sans text-gray-500 uppercase tracking-widest mb-3">
                <span>Storage Used</span>
                <span className="text-[#C9973A]">42%</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#C9973A] w-[42%] rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-8 rounded-3xl bg-[#1B4332] text-white overflow-hidden relative group cursor-pointer shadow-xl">
             <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
               <TrendingUp size={120} />
             </div>
             <h4 className="text-lg font-display font-bold">Action Needed</h4>
             <p className="text-white/60 text-sm mt-2 font-sans">{data.stats.pending_approvals} businesses are waiting for your approval.</p>
             <button className="mt-6 flex items-center gap-2 bg-[#C9973A] text-white px-5 py-2 rounded-full text-xs font-bold font-sans hover:bg-white hover:text-[#C9973A] transition-all">
                Review Now <ArrowUpRight size={14} />
             </button>
          </div>
        </div>
      </div>

      {/* Recent Businesses Table */}
      <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-lg border border-gray-100 overflow-hidden">
        <h2 className="text-2xl font-display font-bold text-[#1B4332] mb-10">Recent Registrations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-6 text-xs font-bold text-gray-400 uppercase tracking-widest pl-4">Business Name</th>
                <th className="pb-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="pb-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="pb-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="pb-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.recent_businesses.map((biz) => (
                <tr key={biz.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-6 font-bold text-[#1B4332] pl-4">{biz.business_name}</td>
                  <td className="py-6 text-gray-500 font-medium">{biz.category_name}</td>
                  <td className="py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      biz.status === 'approved' ? 'bg-success/10 text-success' : 
                      biz.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-red-100 text-red-500'
                    }`}>
                      {biz.status}
                    </span>
                  </td>
                  <td className="py-6 text-gray-400 text-sm">
                    {new Date(biz.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-6 text-right pr-4">
                    <button className="p-3 bg-gray-100 text-[#1B4332] rounded-xl hover:bg-[#C9973A] hover:text-white transition-all shadow-sm">
                       <ArrowUpRight size={18} />
                    </button>
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
