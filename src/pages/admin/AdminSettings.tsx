import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <h3 className="text-lg font-sans font-semibold text-foreground">Site Settings</h3>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Site Title</label>
          <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" defaultValue="Salem Directory" />
        </div>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Tagline</label>
          <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" defaultValue="Find Every Business in Salem" />
        </div>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Contact Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" defaultValue="info@salemdirectory.in" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <h3 className="text-lg font-sans font-semibold text-foreground">Payment Settings</h3>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Registration Fee (₹)</label>
          <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" defaultValue="150" />
        </div>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Razorpay Key ID</label>
          <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="rzp_live_XXXXX" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <h3 className="text-lg font-sans font-semibold text-foreground">SEO Defaults</h3>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Default Meta Title</label>
          <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" defaultValue="Salem Directory — Find Every Business in Salem" />
        </div>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Default Meta Description</label>
          <textarea rows={2} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" defaultValue="5,000+ verified businesses across 300+ categories in Salem District, Tamil Nadu." />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 shadow-card">
          <span className="text-sm font-sans text-foreground">Maintenance Mode</span>
          <button className="relative h-5 w-9 rounded-full bg-muted transition-colors">
            <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-muted-foreground transition-transform" />
          </button>
        </div>
      </div>

      <Button className="bg-primary text-primary-foreground font-sans">
        <Save className="mr-1.5 h-4 w-4" /> Save Settings
      </Button>
    </div>
  );
}
