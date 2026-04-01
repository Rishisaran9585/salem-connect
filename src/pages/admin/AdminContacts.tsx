import { Mail, MailOpen, CheckCircle } from "lucide-react";

const contacts = [
  { id: 1, name: "Kumar S.", reason: "Business Listing Information Wrong", business: "Sri Textiles", message: "My phone number is incorrect on the listing.", status: "new", date: "2 hours ago" },
  { id: 2, name: "Priya R.", reason: "General Inquiry", business: "N/A", message: "How do I upgrade my listing to featured?", status: "read", date: "Yesterday" },
  { id: 3, name: "Mohan K.", reason: "Want to Remove My Listing", business: "Mohan Electricals", message: "I have closed my business. Please remove.", status: "new", date: "Yesterday" },
  { id: 4, name: "Deepa V.", reason: "Technical Issue", business: "Fresh Bakery", message: "Cannot see my listing when I search.", status: "resolved", date: "3 days ago" },
  { id: 5, name: "Ravi T.", reason: "Partnership / Advertising", business: "TechStart", message: "Interested in advertising on Salem Directory.", status: "read", date: "4 days ago" },
];

export default function AdminContacts() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["all", "new", "read", "resolved"].map((f) => (
          <button key={f} className="rounded-md bg-secondary px-3 py-1.5 text-xs font-sans font-medium capitalize text-muted-foreground hover:bg-muted transition-colors">
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {contacts.map((c) => (
          <div key={c.id} className={`rounded-xl border bg-card p-4 shadow-card transition-colors ${c.status === "new" ? "border-accent/30" : "border-border"}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {c.status === "new" ? <Mail className="h-4 w-4 text-accent" /> : c.status === "resolved" ? <CheckCircle className="h-4 w-4 text-success" /> : <MailOpen className="h-4 w-4 text-muted-foreground" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-sans font-semibold text-foreground">{c.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-sans font-medium ${
                      c.status === "new" ? "bg-accent/10 text-accent" : c.status === "resolved" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-accent mt-0.5">{c.reason}</p>
                  {c.business !== "N/A" && <p className="text-xs font-body text-muted-foreground">Business: {c.business}</p>}
                  <p className="mt-1.5 text-sm font-body text-muted-foreground">{c.message}</p>
                </div>
              </div>
              <span className="text-xs font-body text-muted-foreground shrink-0">{c.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
