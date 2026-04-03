import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { allCategories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const steps = ["Your Info", "Business Details", "Location", "Contact", "Optional", "Payment"];

export default function Register() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Registration Submitted!</h1>
            <p className="mt-3 text-sm font-body text-muted-foreground">
              Your business registration has been received. Registration ID: <strong className="font-sans text-foreground">SD-2024-{Math.floor(Math.random() * 9000 + 1000)}</strong>
            </p>
            <p className="mt-2 text-sm font-body text-muted-foreground">
              We'll verify your listing within 24-48 hours. You'll receive a confirmation email once approved.
            </p>
          </div>
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
            <h1 className="text-3xl font-display font-bold text-primary-foreground">Register Your Business</h1>
            <p className="mt-2 text-sm font-body text-primary-foreground/70">Get listed in Salem's #1 business directory</p>
          </div>
        </div>

        <div className="container mx-auto max-w-2xl px-4 py-8">
          {/* Notice */}
          <div className="mb-6 rounded-xl border border-warning/30 bg-warning/5 p-4">
            <p className="text-sm font-sans font-semibold text-warning">📌 Important Notice</p>
            <ul className="mt-2 space-y-1 text-xs font-body text-muted-foreground">
              <li>• Business listings displayed in alphabetical order</li>
              <li>• Verification & Processing Fee: ₹150 (One-time)</li>
              <li>• Payment is non-refundable</li>
            </ul>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((s, i) => (
                <div key={s} className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-sans font-semibold ${
                    i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <span className="mt-1 text-[10px] font-sans text-muted-foreground hidden sm:block">{s}</span>
                </div>
              ))}
            </div>
            <div className="h-1.5 rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>
          </div>

          {/* Form Steps */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-sans font-semibold text-foreground">Your Information</h2>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Your Name *</label>
                  <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Your Email *</label>
                  <input type="email" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Your Mobile Number *</label>
                  <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-sans font-semibold text-foreground">Business Details</h2>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Business Name *</label>
                  <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="Enter business name" />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Business Category *</label>
                  <select className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans">
                    <option value="">Select category</option>
                    {allCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Business Owner Name *</label>
                  <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="Business owner's name" />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Business Description</label>
                  <textarea rows={3} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="Describe your business..." />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-sans font-semibold text-foreground">Location</h2>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Address *</label>
                  <textarea rows={2} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="Full address" />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Area / Locality</label>
                  <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="e.g., Fairlands, Ammapet" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-sans font-medium text-foreground">City *</label>
                    <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" defaultValue="Salem" />
                  </div>
                  <div>
                    <label className="text-sm font-sans font-medium text-foreground">State *</label>
                    <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" defaultValue="Tamil Nadu" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Pincode *</label>
                  <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="636001" />
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-sans font-semibold text-foreground">Contact Information</h2>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Mobile Number *</label>
                  <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Alternate Mobile</label>
                  <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Email Address</label>
                  <input type="email" className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="business@email.com" />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Website URL</label>
                  <input className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="www.yourbusiness.com" />
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-sans font-semibold text-foreground">Optional Details</h2>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Upload Business Logo</label>
                  <div className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-input p-8">
                    <p className="text-sm font-sans text-muted-foreground">Click or drag to upload (JPG, PNG — Max 2MB)</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-foreground">Message / Special Instructions</label>
                  <textarea rows={3} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-sans" placeholder="Any special instructions..." />
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-lg font-sans font-semibold text-foreground">Payment</h2>
                <div className="rounded-lg border border-border bg-secondary p-4">
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted-foreground">Verification & Processing Fee</span>
                    <span className="font-semibold text-foreground">₹150.00</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-sans">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-primary">₹150.00</span>
                  </div>
                </div>
                <p className="text-xs font-body text-muted-foreground">
                  Payment will be processed via Razorpay. Your listing will be activated after verification.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex justify-between">
              {step > 0 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="font-sans">Previous</Button>
              ) : <div />}
              {step < steps.length - 1 ? (
                <Button onClick={() => setStep(step + 1)} className="bg-primary text-primary-foreground font-sans">
                  Next Step
                </Button>
              ) : (
                <Button onClick={() => setSubmitted(true)} className="bg-gradient-gold text-accent-foreground font-sans">
                  Pay ₹150 & Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
