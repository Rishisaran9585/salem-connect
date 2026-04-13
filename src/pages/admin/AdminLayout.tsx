import { Link, Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import {
  LayoutDashboard, Building2, FolderOpen, LogOut, Menu, X, Globe, ChevronRight, ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
  { icon: Building2, label: "Businesses", to: "/admin/businesses" },
  { icon: FolderOpen, label: "Categories", to: "/admin/categories" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem("admin_token");
  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login");
  };

  const activeItem = navItems.find((n) => n.to === location.pathname);

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white transform transition-all duration-500 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} border-r border-white/5 shadow-2xl`}>
        <div className="flex h-24 items-center justify-between border-b border-white/5 px-8">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
               <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-display font-black tracking-tighter uppercase italic">Salem</span>
               <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest leading-none mt-1">Connect</span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white/30 hover:text-white p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="p-6 space-y-2 mt-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                location.pathname === item.to
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className={`h-5 w-5 ${location.pathname === item.to ? 'text-white' : 'text-slate-600'}`} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
          <button onClick={handleLogout} className="flex w-full items-center gap-4 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="h-5 w-5" /> Logout
          </button>
          
          <Link to="/" className="flex w-full items-center gap-4 rounded-2xl px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:text-indigo-400 transition-all">
             <Globe className="h-4 w-4" /> Go to Website →
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-8 sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-900 bg-slate-50 rounded-xl">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin</span>
               <ChevronRight className="h-3 w-3 text-slate-300" />
               <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                 {activeItem?.label || "Page"}
               </h2>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
             <div className="text-right">
                <p className="text-xs font-bold text-slate-900">Admin Account</p>
                <p className="text-[10px] text-slate-400">Salembusiness37@gmail.com</p>
             </div>
             <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                <ShieldCheck size={20} />
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
