import { useState } from "react";
import { sampleBusinesses } from "@/data/categories";
import { CheckCircle2, XCircle, Eye, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const allBiz = [
  ...sampleBusinesses,
  { id: 101, slug: "pending-biz-1", businessName: "Green Valley Organics", ownerName: "P. Mohan", categoryId: 7, categoryName: "Retail & General Stores", description: "Organic store", address: "12, Fairlands", area: "Fairlands", city: "Salem", state: "Tamil Nadu", pincode: "636016", mobile: "+91 99999 11111", verified: false, status: "approved" as const },
  { id: 102, slug: "pending-biz-2", businessName: "TechVista Solutions", ownerName: "K. Deepak", categoryId: 12, categoryName: "Technology", description: "IT Solutions", address: "56, Cherry Road", area: "Cherry Road", city: "Salem", state: "Tamil Nadu", pincode: "636007", mobile: "+91 88888 22222", verified: false, status: "approved" as const },
];

export default function AdminBusinesses() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = allBiz.filter((b) => {
    if (search && !b.businessName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm font-sans outline-none placeholder:text-muted-foreground"
            placeholder="Search businesses..."
          />
        </div>
        <div className="flex gap-2">
          {["all", "approved", "pending", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-sans font-medium capitalize transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground">ID</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground">Business Name</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground hidden lg:table-cell">City</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-right font-sans font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.id}</td>
                <td className="px-4 py-3">
                  <div className="font-sans font-medium text-foreground">{b.businessName}</div>
                  <div className="text-xs font-body text-muted-foreground">{b.ownerName}</div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-mono text-accent">{b.categoryName}</span>
                </td>
                <td className="px-4 py-3 text-xs font-body text-muted-foreground hidden lg:table-cell">{b.city}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-sans font-medium ${
                    b.verified ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>
                    {b.verified ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="rounded p-1.5 hover:bg-secondary transition-colors" title="View">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="rounded p-1.5 hover:bg-success/10 transition-colors" title="Approve">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </button>
                    <button className="rounded p-1.5 hover:bg-destructive/10 transition-colors" title="Reject">
                      <XCircle className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
