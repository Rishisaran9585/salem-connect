import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  "Business Listing Information Wrong",
  "Want to Remove My Listing",
  "General Inquiry",
  "Technical Issue",
  "Partnership / Advertising",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">Message Sent!</h1>
          <p className="mt-3 text-sm font-body text-muted-foreground">We'll get back to you within 24 hours.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="bg-gradient-hero pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-display font-bold text-primary-foreground">Contact Us</h1>
            <p className="mt-2 text-sm font-body text-primary-foreground/70">We're here to help with any questions</p>
          </div>
        </div>
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
            <div>
              <label className="text-sm font-sans font-medium text-foreground">Reason for Contact *</label>
              <select className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans">
                <option value="">Select reason</option>
                {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-sans font-medium text-foreground">Your Name *</label>
                <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" />
              </div>
              <div>
                <label className="text-sm font-sans font-medium text-foreground">Are You Business Owner?</label>
                <select className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-sans font-medium text-foreground">Business Name *</label>
              <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" />
            </div>
            <div>
              <label className="text-sm font-sans font-medium text-foreground">Business Category *</label>
              <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" />
            </div>
            <div>
              <label className="text-sm font-sans font-medium text-foreground">Address *</label>
              <textarea rows={2} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-sans font-medium text-foreground">State *</label>
                <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" defaultValue="Tamil Nadu" />
              </div>
              <div>
                <label className="text-sm font-sans font-medium text-foreground">City *</label>
                <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" defaultValue="Salem" />
              </div>
              <div>
                <label className="text-sm font-sans font-medium text-foreground">Pincode *</label>
                <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-sans font-medium text-foreground">Mobile Number *</label>
                <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" />
              </div>
              <div>
                <label className="text-sm font-sans font-medium text-foreground">Email</label>
                <input type="email" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" />
              </div>
            </div>
            <div>
              <label className="text-sm font-sans font-medium text-foreground">Message</label>
              <textarea rows={4} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="Describe your inquiry..." />
            </div>
            <Button onClick={() => setSubmitted(true)} className="w-full bg-primary text-primary-foreground font-sans">
              Submit
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
