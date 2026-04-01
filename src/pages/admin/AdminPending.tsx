import { sampleBusinesses } from "@/data/categories";
import { CheckCircle2, XCircle, Eye } from "lucide-react";

const pendingBiz = [
  { id: 201, name: "Green Valley Organics", owner: "P. Mohan", category: "Retail", mobile: "+91 99999 11111", date: "Today", area: "Fairlands" },
  { id: 202, name: "Salem Fresh Bakery", owner: "R. Geetha", category: "Food & Beverages", mobile: "+91 88888 33333", date: "Today", area: "Ammapet" },
  { id: 203, name: "Perfect Stitch Tailors", owner: "M. Selvam", category: "Clothing & Fashion", mobile: "+91 77777 44444", date: "Yesterday", area: "Five Roads" },
  { id: 204, name: "Smart Learn Academy", owner: "Dr. S. Kumari", category: "Education", mobile: "+91 66666 55555", date: "Yesterday", area: "Hasthampatti" },
  { id: 205, name: "Royal Auto Garage", owner: "T. Velu", category: "Automotive", mobile: "+91 55555 66666", date: "2 days ago", area: "Gugai" },
];

export default function AdminPending() {
  return (
    <div className="space-y-4">
      <p className="text-sm font-sans text-muted-foreground">{pendingBiz.length} businesses awaiting approval</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {pendingBiz.map((b) => (
          <div key={b.id} className="rounded-xl border border-warning/30 bg-card p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-sans font-semibold text-foreground">{b.name}</h3>
                <p className="text-xs font-body text-muted-foreground">{b.owner}</p>
              </div>
              <span className="rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-sans font-medium text-warning">Pending</span>
            </div>
            <div className="mt-2 space-y-1 text-xs font-body text-muted-foreground">
              <p>📂 {b.category}</p>
              <p>📍 {b.area}, Salem</p>
              <p>📞 {b.mobile}</p>
              <p>🕐 Submitted: {b.date}</p>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-success/10 px-3 py-2 text-xs font-sans font-medium text-success hover:bg-success/20 transition-colors">
                <CheckCircle2 className="h-3.5 w-3.5" /> Approve
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-xs font-sans font-medium text-destructive hover:bg-destructive/20 transition-colors">
                <XCircle className="h-3.5 w-3.5" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
