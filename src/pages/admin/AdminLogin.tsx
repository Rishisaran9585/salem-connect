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
    <div className="flex min-h-screen items-center justify-center bg-primary p-4">
      <div className="w-full max-w-sm rounded-xl bg-card p-8 shadow-elevated">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-display font-bold text-foreground">Admin Login</h1>
          <p className="mt-1 text-xs font-body text-muted-foreground">Salem Directory Admin Panel</p>
        </div>
        
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 p-4 text-xs font-bold text-red-600 border border-red-100 animate-shake">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-sans font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans"
              placeholder="admin@salemdirectory.in"
            />
          </div>
          <div>
            <label className="text-sm font-sans font-medium text-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground font-sans">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
