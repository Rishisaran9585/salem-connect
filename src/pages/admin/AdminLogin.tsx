import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    localStorage.setItem("admin_logged_in", "true");
    navigate("/admin");
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
