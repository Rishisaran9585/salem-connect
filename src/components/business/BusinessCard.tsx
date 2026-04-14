import { Link } from "react-router-dom";
import { MapPin, Phone, Globe, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Business } from "@/data/categories";

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white shadow-md transition-all hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1">
      {/* Header with logo and title */}
      <div className="border-b border-slate-100 p-6 pb-5">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-sans font-bold text-2xl shadow-md">
            {business.businessName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2 mb-1">
              <h3 className="text-lg font-sans font-bold text-slate-900 line-clamp-2 leading-tight">
                {business.businessName}
              </h3>
              {business.verified && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
              )}
            </div>
            {business.ownerName && (
              <p className="text-sm font-sans text-slate-500">
                <span className="font-semibold">Owner:</span> {business.ownerName}
              </p>
            )}
            {business.categoryName && (
              <div className="mt-2 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {business.categoryName}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {business.description && (
        <div className="px-6 pt-5 pb-4 border-b border-slate-100">
          <p className="text-sm font-sans text-slate-600 line-clamp-3 leading-relaxed">
            {business.description}
          </p>
        </div>
      )}

      {/* Contact Information */}
      <div className="px-6 py-5 space-y-3">
        {/* Address */}
        <div className="flex gap-3">
          <MapPin className="h-5 w-5 shrink-0 text-slate-400 mt-0.5" />
          <div className="text-sm font-sans text-slate-700 line-clamp-2">
            <p className="font-semibold text-slate-900">{business.address}</p>
            <p className="text-slate-600">{business.area}, {business.city}{business.state && `, ${business.state}`} {business.pincode}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-3 items-center">
          <Phone className="h-5 w-5 shrink-0 text-slate-400" />
          <a href={`tel:${business.mobile.replace(/\s/g, "")}`} className="text-sm font-mono font-semibold text-blue-600 hover:text-blue-800">
            {business.mobile}
          </a>
        </div>

        {/* Email */}
        {business.email && (
          <div className="flex gap-3 items-start">
            <Mail className="h-5 w-5 shrink-0 text-slate-400 mt-0.5" />
            <a href={`mailto:${business.email}`} className="text-sm font-sans text-blue-600 hover:text-blue-800 truncate">
              {business.email}
            </a>
          </div>
        )}

        {/* Website */}
        {business.website && (
          <div className="flex gap-3 items-center">
            <Globe className="h-5 w-5 shrink-0 text-slate-400" />
            <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-sm font-sans text-blue-600 hover:text-blue-800 truncate">
              {business.website}
            </a>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="border-t border-slate-100 px-6 py-4 flex gap-3">
        <Link to={`/business/${business.slug}`} className="flex-1">
          <Button variant="outline" className="w-full text-sm font-sans font-semibold text-slate-700 hover:bg-slate-50">
            View Details
          </Button>
        </Link>
        <a href={`tel:${business.mobile.replace(/\s/g, "")}`} className="flex-1">
          <Button className="w-full bg-indigo-600 text-white text-sm font-sans font-semibold hover:bg-indigo-700 shadow-sm">
            Call Now
          </Button>
        </a>
      </div>
    </div>
  );
}
