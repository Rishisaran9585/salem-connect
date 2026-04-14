import { Link } from "react-router-dom";
import { MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Business } from "@/data/categories";

export default function BusinessCardSimple({ business }: { business: Business }) {
  return (
    <div className="rounded-[24px] bg-white border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Content Section */}
      <div className="p-8 pb-6">
        <h3 className="text-2xl font-serif font-black text-[#003131] mb-6 tracking-tight">
          {business.businessName}
        </h3>

        <div className="space-y-3">
          {/* Address Line 1 */}
          <div className="flex gap-4 items-start">
            <MapPin className="h-5 w-5 text-[#B8860B] mt-0.5 flex-shrink-0" />
            <p className="text-base font-sans font-medium text-slate-600 leading-snug">
              {business.address}
            </p>
          </div>

          {/* Address Line 2 - City & Pincode */}
          <div className="flex gap-4 items-start">
            <Globe className="h-5 w-5 text-[#B8860B] mt-0.5 flex-shrink-0" />
            <p className="text-base font-sans font-medium text-slate-600 leading-snug">
              {business.city} - {business.pincode} ({business.state || 'Tamil Nadu'}) India
            </p>
          </div>
        </div>
      </div>

      {/* Button Section with different background */}
      <div className="bg-[#F8FAFC] px-6 py-6 border-t border-slate-50">
        <Link to={`/business/${business.slug}`} className="block">
          <Button className="w-full bg-[#003131] hover:bg-[#004d4d] text-[#FFD700] hover:text-[#FFD700] text-sm md:text-base font-sans font-black py-7 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
            <span className="text-lg">📞</span>
            Show Number & full details of {business.businessName}
          </Button>
        </Link>
      </div>
    </div>
  );
}
