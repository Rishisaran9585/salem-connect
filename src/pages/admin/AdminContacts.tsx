import { useState, useEffect } from "react";
import { Mail, MailOpen, CheckCircle, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "@/lib/api";

interface Contact {
  id: number;
  name: string;
  email?: string;
  mobile: string;
  business_name?: string;
  reason?: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const url = filter === "all" ? API.admin.CONTACTS : `${API.admin.CONTACTS}?status=${filter}`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        setContacts(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await axios.put(API.admin.CONTACTS, {
        id,
        status
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        toast.success("Status updated");
        fetchContacts();
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const deleteContact = async (id: number) => {
    if (!window.confirm("Delete this contact?")) return;
    try {
      const res = await axios.delete(`${API.admin.CONTACTS}?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (res.data.success) {
        toast.success("Contact deleted");
        fetchContacts();
      }
    } catch (err) {
      toast.error("Failed to delete contact");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading contacts...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {["all", "new", "read", "resolved"].map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-3 py-1.5 text-xs font-sans font-medium capitalize transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-muted"
            }`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {contacts.map((c) => (
          <div key={c.id} className={`rounded-xl border bg-card p-4 shadow-card transition-colors ${c.status === "new" ? "border-accent/30" : "border-border"}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">
                  {c.status === "new" ? <Mail className="h-4 w-4 text-accent" /> : c.status === "resolved" ? <CheckCircle className="h-4 w-4 text-success" /> : <MailOpen className="h-4 w-4 text-muted-foreground" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-sans font-semibold text-foreground">{c.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-sans font-medium cursor-pointer transition-colors ${
                      c.status === "new" ? "bg-accent/10 text-accent" : c.status === "resolved" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-accent mt-0.5">{c.reason || "General"}</p>
                  {c.business_name && <p className="text-xs font-body text-muted-foreground">Business: {c.business_name}</p>}
                  <p className="mt-1.5 text-sm font-body text-muted-foreground">{c.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">📧 {c.email || c.mobile}</p>
                </div>
              </div>
              <div className="flex gap-2 ml-2">
                {c.status !== "resolved" && (
                  <button
                    onClick={() => updateStatus(c.id, c.status === "new" ? "read" : "resolved")}
                    className="text-xs px-2 py-1 rounded bg-secondary hover:bg-secondary/80 text-muted-foreground"
                  >
                    {c.status === "new" ? "Mark Read" : "Resolve"}
                  </button>
                )}
                <button
                  onClick={() => deleteContact(c.id)}
                  className="text-xs px-2 py-1 rounded bg-destructive/10 hover:bg-destructive/20 text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
            <span className="text-xs font-body text-muted-foreground float-right mt-2">{new Date(c.created_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
