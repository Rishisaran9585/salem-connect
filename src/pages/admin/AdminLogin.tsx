import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, AlertCircle } from "lucide-react";
import axios from "axios";

export default function AdminLogin() {
  const token = localStorage.getItem("admin_token");
  if (token) return <Navigate to="/admin" replace />;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/backend/api/v1/admin/auth.php", {
        email,
        password
      });

      if (res.data.success) {
        localStorage.setItem("admin_token", res.data.data.token);
        localStorage.setItem("admin_logged_in", "true");
        navigate("/admin");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Check server.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      
      <div className="w-full max-w-md rounded-[2.5rem] bg-white p-10 lg:p-12 shadow-2xl relative z-10">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-indigo-600 shadow-xl shadow-indigo-600/20 rotate-12">
            <Lock className="h-10 w-10 text-white -rotate-12" />
          </div>
          <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight">Salem <span className="text-indigo-600 italic">Connect</span></h1>
          <p className="mt-3 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Management Portal</p>
        </div>
        
        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl bg-red-50 p-5 text-sm font-bold text-red-600 border border-red-100">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-sans font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
              placeholder="Salembusiness37@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-sans font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full h-14 bg-indigo-600 hover:bg-slate-950 text-white rounded-2xl font-sans font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1">
            Access Dashboard
          </Button>
          <div className="text-center">
            <Link to="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-indigo-600 transition-colors">← Back to Directory</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
