const payments = [
  { id: "TXN-001", business: "Sri Lakshmi Textiles", amount: "₹150", status: "paid", date: "2024-01-15", method: "Razorpay" },
  { id: "TXN-002", business: "Global IT Solutions", amount: "₹150", status: "paid", date: "2024-01-14", method: "UPI" },
  { id: "TXN-003", business: "Green Valley Organics", amount: "₹150", status: "pending", date: "2024-01-14", method: "Razorpay" },
  { id: "TXN-004", business: "Annapoorna Restaurant", amount: "₹150", status: "paid", date: "2024-01-13", method: "Razorpay" },
  { id: "TXN-005", business: "TechVista Solutions", amount: "₹150", status: "failed", date: "2024-01-12", method: "UPI" },
  { id: "TXN-006", business: "Salem Dental Care", amount: "₹150", status: "paid", date: "2024-01-11", method: "Razorpay" },
];

export default function AdminPayments() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <p className="text-xs font-sans text-muted-foreground">Total Revenue</p>
          <p className="text-xl font-sans font-bold text-foreground">₹7,87,050</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <p className="text-xs font-sans text-muted-foreground">This Month</p>
          <p className="text-xl font-sans font-bold text-success">₹48,750</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <p className="text-xs font-sans text-muted-foreground">Pending</p>
          <p className="text-xl font-sans font-bold text-warning">₹3,450</p>
        </div>
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
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3 font-sans font-medium text-foreground">{p.business}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell">{p.method}</td>
                <td className="px-4 py-3 font-sans font-semibold text-foreground">{p.amount}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-sans font-medium ${
                    p.status === "paid" ? "bg-success/10 text-success" :
                    p.status === "pending" ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs font-body text-muted-foreground hidden lg:table-cell">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
