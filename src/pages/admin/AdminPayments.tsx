import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "@/lib/api";

interface Payment {
  id: number;
  transaction_id: string;
  business_name: string;
  payment_amount: number;
  payment_status: string;
  payment_method?: string;
  created_at: string;
}

interface PaymentTotals {
  total_revenue: number;
  month_revenue: number;
  pending_revenue: number;
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totals, setTotals] = useState<PaymentTotals>({ total_revenue: 0, month_revenue: 0, pending_revenue: 0 });
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const url = filter === "all" ? API.admin.PAYMENTS : `${API.admin.PAYMENTS}?status=${filter}`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        setPayments(res.data.data.payments);
        setTotals(res.data.data.totals);
      }
    } catch (err) {
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [filter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return <div className="text-center py-8">Loading payments...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <p className="text-xs font-sans text-muted-foreground">Total Revenue</p>
          <p className="text-xl font-sans font-bold text-foreground">{formatCurrency(totals.total_revenue)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <p className="text-xs font-sans text-muted-foreground">This Month</p>
          <p className="text-xl font-sans font-bold text-success">{formatCurrency(totals.month_revenue)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <p className="text-xs font-sans text-muted-foreground">Pending</p>
          <p className="text-xl font-sans font-bold text-warning">{formatCurrency(totals.pending_revenue)}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {["all", "paid", "pending", "failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-3 py-1.5 text-xs font-sans font-medium capitalize transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-muted"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground">Transaction ID</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground">Business</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground hidden md:table-cell">Method</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground">Amount</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-left font-sans font-semibold text-foreground hidden lg:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.transaction_id}</td>
                <td className="px-4 py-3 font-sans font-medium text-foreground">{p.business_name}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell">{p.payment_method || 'N/A'}</td>
                <td className="px-4 py-3 font-sans font-semibold text-foreground">{formatCurrency(p.payment_amount)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-sans font-medium ${
                    p.payment_status === "paid" ? "bg-success/10 text-success" :
                    p.payment_status === "pending" ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  }`}>
                    {p.payment_status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs font-body text-muted-foreground hidden lg:table-cell">{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
