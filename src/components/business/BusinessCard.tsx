import { Link } from "react-router-dom";
import { MapPin, Phone, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Business } from "@/data/categories";

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-sans font-bold text-lg">
          {business.businessName.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-sans font-semibold text-foreground">
              {business.businessName}
            </h3>
            {business.verified && (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
            )}
          </div>
          <span className="inline-block mt-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-mono text-accent">
            {business.categoryName}
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{business.address}, {business.city}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          <span>{business.mobile}</span>
        </div>
        {business.website && (
          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{business.website}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <Link to={`/business/${business.slug}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full text-xs font-sans">
            View Details
          </Button>
        </Link>
        <a href={`tel:${business.mobile.replace(/\s/g, "")}`} className="flex-1">
          <Button size="sm" className="w-full bg-primary text-primary-foreground text-xs font-sans hover:opacity-90">
            Call Now
          </Button>
        </a>
      </div>
    </div>
  );
}
