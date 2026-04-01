import { allCategories } from "@/data/categories";
import { Edit, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCategories() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-sans text-muted-foreground">{allCategories.length} categories</p>
        <Button size="sm" className="bg-primary text-primary-foreground font-sans">
          <Plus className="mr-1.5 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground">ID</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground">Category</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground hidden md:table-cell">Listings</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground hidden lg:table-cell">Status</th>
              <th className="px-4 py-3 text-right font-sans font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {allCategories.map((c) => (
              <tr key={c.id} className="hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <c.icon className="h-4 w-4 text-primary" />
                    <span className="font-sans font-medium text-foreground">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell">{c.count}</td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-sans text-success">Active</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="rounded p-1.5 hover:bg-secondary transition-colors" title="Edit">
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="rounded p-1.5 hover:bg-destructive/10 transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
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
