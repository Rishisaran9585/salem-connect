import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, ToggleLeft, ToggleRight } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "@/lib/api";

interface Settings {
  site_title: string;
  site_tagline: string;
  contact_email: string;
  registration_fee: number;
  razorpay_key_id: string;
  meta_title: string;
  meta_description: string;
  maintenance_mode: boolean;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    site_title: "Salem Directory",
    site_tagline: "Find Every Business in Salem",
    contact_email: "info@salemdirectory.in",
    registration_fee: 150,
    razorpay_key_id: "",
    meta_title: "Salem Directory — Find Every Business in Salem",
    meta_description: "5,000+ verified businesses across 300+ categories in Salem District, Tamil Nadu.",
    maintenance_mode: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(API.admin.SETTINGS, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        setSettings(prev => ({ ...prev, ...res.data.data }));
      }
    } catch (err) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleMaintenance = () => {
    handleChange('maintenance_mode', !settings.maintenance_mode);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await axios.post(API.admin.SETTINGS, settings, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        toast.success("Settings saved successfully!");
      }
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <h3 className="text-lg font-sans font-semibold text-foreground">Site Settings</h3>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Site Title</label>
          <input 
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" 
            value={settings.site_title}
            onChange={(e) => handleChange('site_title', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Tagline</label>
          <input 
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" 
            value={settings.site_tagline}
            onChange={(e) => handleChange('site_tagline', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Contact Email</label>
          <input 
            type="email" 
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" 
            value={settings.contact_email}
            onChange={(e) => handleChange('contact_email', e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <h3 className="text-lg font-sans font-semibold text-foreground">Payment Settings</h3>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Registration Fee (₹)</label>
          <input 
            type="number"
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" 
            value={settings.registration_fee}
            onChange={(e) => handleChange('registration_fee', parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Razorpay Key ID</label>
          <input 
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" 
            placeholder="rzp_live_XXXXX"
            value={settings.razorpay_key_id}
            onChange={(e) => handleChange('razorpay_key_id', e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <h3 className="text-lg font-sans font-semibold text-foreground">SEO Defaults</h3>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Default Meta Title</label>
          <input 
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" 
            value={settings.meta_title}
            onChange={(e) => handleChange('meta_title', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-sans font-medium text-foreground">Default Meta Description</label>
          <textarea 
            rows={3} 
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" 
            value={settings.meta_description}
            onChange={(e) => handleChange('meta_description', e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-card">
        <div className="flex items-center justify-between">
          <span className="text-sm font-sans text-foreground">Maintenance Mode</span>
          <button 
            onClick={toggleMaintenance}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              settings.maintenance_mode ? 'bg-success/30' : 'bg-muted'
            }`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full transition-all ${
              settings.maintenance_mode ? 'right-0.5 bg-success' : 'left-0.5 bg-muted-foreground'
            }`} />
          </button>
        </div>
        {settings.maintenance_mode && (
          <p className="text-xs text-warning mt-2">⚠️ Maintenance mode is ON. Users cannot register or access the site.</p>
        )}
      </div>

      <Button 
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-primary text-primary-foreground font-sans py-6 text-base">
        <Save className="mr-2 h-4 w-4" /> 
        {saving ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  );
}
