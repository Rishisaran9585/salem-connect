import { Link, Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import {
  LayoutDashboard, Building2, FolderOpen, MessageSquare,
  CreditCard, Settings, LogOut, Clock, Menu, X, Layout
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
  { icon: Layout, label: "Hero Carousel", to: "/admin/hero" },
  { icon: Building2, label: "Businesses", to: "/admin/businesses" },
  { icon: Clock, label: "Pending", to: "/admin/businesses/pending" },
  { icon: FolderOpen, label: "Categories", to: "/admin/categories" },
  { icon: MessageSquare, label: "Contacts", to: "/admin/contacts" },
  { icon: CreditCard, label: "Payments", to: "/admin/payments" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth Guard: If no token is present, redirect to login
  const token = localStorage.getItem("admin_token");
  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_logged_in");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-primary text-primary-foreground transform transition-transform md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-14 items-center justify-between border-b border-primary-foreground/10 px-4">
          <Link to="/admin" className="flex items-center gap-1.5">
            <span className="text-base font-bold font-sans">Salem</span>
            <span className="text-base font-display italic text-gold">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-sans transition-colors ${
                location.pathname === item.to
                  ? "bg-primary-foreground/15 text-primary-foreground font-semibold"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-primary-foreground/10">
          <button onClick={handleLogout} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-sans text-primary-foreground/70 hover:bg-primary-foreground/10 transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
          <Link to="/" className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-sans text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors mt-1">
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-foreground/30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <h2 className="text-sm font-sans font-semibold text-foreground">
            {navItems.find((n) => n.to === location.pathname)?.label || "Admin"}
          </h2>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
