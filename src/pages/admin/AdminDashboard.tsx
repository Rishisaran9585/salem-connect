import { Building2, Clock, FolderOpen, CreditCard, MessageSquare, TrendingUp } from "lucide-react";

const stats = [
  { icon: Building2, label: "Total Businesses", value: "5,247", change: "+12 today" },
  { icon: Clock, label: "Pending Approvals", value: "23", change: "Needs review" },
  { icon: FolderOpen, label: "Categories", value: "316", change: "All active" },
  { icon: CreditCard, label: "Total Revenue", value: "₹7,87,050", change: "+₹2,250 today" },
  { icon: MessageSquare, label: "Contact Inquiries", value: "156", change: "8 unread" },
  { icon: TrendingUp, label: "New This Month", value: "342", change: "+18% growth" },
];

const recentBusinesses = [
  { name: "Green Valley Organics", category: "Retail", status: "pending", date: "Today" },
  { name: "TechVista Solutions", category: "Technology", status: "approved", date: "Yesterday" },
  { name: "Salem Fresh Bakery", category: "Food & Beverages", status: "pending", date: "Yesterday" },
  { name: "Dr. Anand's Clinic", category: "Health & Medical", status: "approved", date: "2 days ago" },
  { name: "Royal Auto Works", category: "Automotive", status: "rejected", date: "3 days ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-sans text-muted-foreground">{s.label}</p>
                <p className="text-xl font-sans font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] font-mono text-accent">{s.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Registrations */}
      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-sm font-sans font-semibold text-foreground">Recent Registrations</h3>
        </div>
        <div className="divide-y divide-border">
          {recentBusinesses.map((b, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-sans font-medium text-foreground">{b.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{b.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-sans font-medium ${
                  b.status === "approved" ? "bg-success/10 text-success" :
                  b.status === "pending" ? "bg-warning/10 text-warning" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {b.status}
                </span>
                <span className="text-xs font-body text-muted-foreground">{b.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
