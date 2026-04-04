import { useState, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "@/lib/api";

interface PendingBusiness {
  id: number;
  business_name: string;
  owner_name: string;
  category_name: string;
  mobile: string;
  created_at: string;
  area: string;
  status: string;
}

export default function AdminPending() {
  const [businesses, setBusinesses] = useState<PendingBusiness[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${API.admin.BUSINESSES}?status=pending`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        setBusinesses(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load pending businesses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const res = await axios.put(API.admin.BUSINESSES, {
        id,
        status: 'approved'
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        toast.success("Business approved!");
        fetchPending();
      }
    } catch (err) {
      toast.error("Failed to approve business");
    }
  };

  const handleReject = async (id: number) => {
    try {
      const res = await axios.put(API.admin.BUSINESSES, {
        id,
        status: 'rejected'
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        toast.success("Business rejected");
        fetchPending();
      }
    } catch (err) {
      toast.error("Failed to reject business");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading pending businesses...</div>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-sans text-muted-foreground">{businesses.length} businesses awaiting approval</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {businesses.map((b) => (
          <div key={b.id} className="rounded-xl border border-warning/30 bg-card p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-sans font-semibold text-foreground">{b.business_name}</h3>
                <p className="text-xs font-body text-muted-foreground">{b.owner_name || 'N/A'}</p>
              </div>
              <span className="rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-sans font-medium text-warning">Pending</span>
            </div>
            <div className="mt-2 space-y-1 text-xs font-body text-muted-foreground">
              <p>📂 {b.category_name || 'Uncategorized'}</p>
              <p>📍 {b.area || 'Salem'}, Salem</p>
              <p>📞 {b.mobile}</p>
              <p>🕐 Submitted: {new Date(b.created_at).toLocaleDateString()}</p>
            </div>
            <div className="mt-3 flex gap-2">
              <button 
                onClick={() => handleApprove(b.id)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-success/10 px-3 py-2 text-xs font-sans font-medium text-success hover:bg-success/20 transition-colors">
                <CheckCircle2 className="h-3.5 w-3.5" /> Approve
              </button>
              <button 
                onClick={() => handleReject(b.id)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-xs font-sans font-medium text-destructive hover:bg-destructive/20 transition-colors">
                <XCircle className="h-3.5 w-3.5" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
