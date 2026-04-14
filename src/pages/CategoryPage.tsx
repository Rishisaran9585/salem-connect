import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BusinessCardSimple from "@/components/business/BusinessCardSimple";
import { allCategories, sampleBusinesses } from "@/data/categories";
import { 
  Loader2, 
  MapPin, 
  Search, 
  ChevronRight, 
  Home as HomeIcon, 
  Star, 
  ShieldCheck, 
  Info,
  HelpCircle,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoryContent } from "@/data/categoryContent";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = allCategories.find((c) => c.slug === slug);
  const categoryContent = getCategoryContent(category?.name || slug || "");

  // Get some related categories for the sidebar
  const relatedCategories = allCategories
    .filter(c => c.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/backend/api/v1/businesses.php?category=${slug}`);
        if (response.data.success) {
          const normalized = response.data.data.map((b: any) => ({
            id: b.id,
            businessName: b.business_name,
            ownerName: b.owner_name,
            categoryName: b.category_name,
            description: b.description,
            address: b.address,
            area: b.area,
            city: b.city,
            state: b.state,
            pincode: b.pincode,
            mobile: b.mobile,
            email: b.email,
            website: b.website,
            verified: b.is_verified == 1,
            slug: b.slug,
            status: "approved"
          }));
          
          if (normalized.length === 0) {
            const filteredSamples = sampleBusinesses.filter(sb => sb.categoryId === category?.id);
            setBusinesses(filteredSamples);
          } else {
            setBusinesses(normalized);
          }
        }
      } catch (error) {
        console.error("Failed to fetch businesses:", error);
        const filteredSamples = sampleBusinesses.filter(sb => sb.categoryId === category?.id);
        setBusinesses(filteredSamples);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [slug, category?.id]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      


      {/* Breadcrumb Section */}
      <div className="bg-white border-b border-slate-100 pt-12 pb-6">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1 group">
                    <HomeIcon className="h-4 w-4 group-hover:text-indigo-600 transition-colors" />
                    <span>Home</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-slate-900">{category?.name || slug}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - Desktop Only (left) */}
          <aside className="hidden lg:block w-80 shrink-0 space-y-8">
            {/* Category Status Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 z-0" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-indigo-600 mb-4">
                  <Star className="h-5 w-5 fill-indigo-600" />
                  <span className="text-xs font-black uppercase tracking-widest">Premium Listing</span>
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 mb-2">Grow Your Business</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  List your business in the {category?.name} category and reach thousands of local customers in Salem.
                </p>
                <Link to="/register">
                  <Button className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold transition-all duration-300">
                    Add Your Business
                  </Button>
                </Link>
              </div>
            </div>

            {/* Related Categories */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-indigo-600 rounded-full" />
                Related Categories
              </h3>
              <div className="space-y-1">
                {relatedCategories.map((cat) => (
                  <Link 
                    key={cat.id} 
                    to={`/category/${cat.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-semibold text-slate-600 hover:text-indigo-600 group transition-all"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>
              <Link to="/categories" className="block text-center mt-6 text-sm font-bold text-indigo-600 hover:underline">
                View All Categories
              </Link>
            </div>

            {/* Verification Badge Info */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
               <ShieldCheck className="absolute -bottom-4 -right-4 h-24 w-24 text-white/10" />
               <h3 className="text-base font-bold mb-2">Verified Content</h3>
               <p className="text-xs text-indigo-100 leading-relaxed">
                 All businesses listed on Salem Business are manually verified by our team to ensure accuracy and reliability.
               </p>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            
            {/* Category Header */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                 {category?.icon && <category.icon size={160} />}
               </div>
               
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                 <div>
                   <div className="flex items-center gap-2 mb-4 bg-slate-900 text-white rounded-full px-4 py-1.5 w-fit">
                     <MapPin className="h-4 w-4 text-indigo-400" />
                     <span className="text-xs font-black tracking-widest uppercase">Popular in Salem</span>
                   </div>
                   <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
                     {categoryContent?.heroTitle || category?.name}
                   </h1>
                   <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
                     {categoryContent?.heroDescription || category?.description}
                   </p>
                 </div>
                 <div className="bg-indigo-50 rounded-2xl p-6 text-center border border-indigo-100 min-w-[140px]">
                    <div className="text-3xl font-black text-indigo-600 mb-1">{businesses.length}</div>
                    <div className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Listed Businesses</div>
                 </div>
               </div>
            </div>

            {/* Business Listings Grid */}
            <section id="listings" className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-display font-bold text-slate-900">Featured Listings</h2>
                <div className="flex items-center gap-4">
                   <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600">
                     <Search size={14} /> Search in {category?.name}
                   </div>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} className="h-80 bg-white rounded-2xl animate-pulse border border-slate-100" />
                  ))}
                </div>
              ) : businesses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {businesses.map((b) => (
                    <BusinessCardSimple key={b.id} business={b} />
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">No Results Found</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mb-8">We couldn't find any businesses in this category yet. Be the first to join!</p>
                  <Link to="/register">
                    <Button className="bg-indigo-600 text-white font-bold px-8 h-12 rounded-xl">
                      Register Your Business
                    </Button>
                  </Link>
                </div>
              )}
            </section>

            {/* Details/Content Section */}
            <section id="about" className="space-y-6">
               <div className="bg-white rounded-2xl border border-slate-100 p-10 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <Info size={24} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-slate-900">Information about {category?.name}</h2>
                  </div>
                  
                  <div className="space-y-12">
                    {categoryContent.sections.map((section, idx) => (
                      <div key={idx} className="group">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-indigo-600" />
                          {section.title}
                        </h3>
                        
                        {section.content && (
                          <p className="text-slate-600 leading-relaxed mb-6 text-base italic border-l-4 border-slate-100 pl-6">
                            {section.content}
                          </p>
                        )}
                        
                        {section.items && section.items.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="mt-1 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow-sm text-[10px] font-black text-indigo-600 shrink-0">
                                  {itemIdx + 1}
                                </div>
                                <span className="text-slate-700 text-sm font-semibold leading-relaxed">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {section.subSections && section.subSections.length > 0 && (
                          <div className="grid grid-cols-1 gap-6 mt-8">
                            {section.subSections.map((sub, subIdx) => (
                              <div key={subIdx} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="text-lg font-bold text-slate-900 mb-3">{sub.title}</h4>
                                <p className="text-slate-600 leading-relaxed text-sm">{sub.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
               </div>
            </section>

            {/* FAQ Section */}
            {categoryContent.faqs && categoryContent.faqs.length > 0 && (
              <section id="faq" className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-10 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <HelpCircle size={24} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-slate-900">Frequently Asked Questions</h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {categoryContent.faqs.map((faq, idx) => (
                      <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-slate-100 py-2 px-1">
                        <AccordionTrigger className="text-left font-bold text-slate-800 hover:text-indigo-600 hover:no-underline py-4 text-base">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-500 text-base leading-relaxed pt-2 pb-6 px-1 indent-4 border-l-2 border-indigo-100 ml-2">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>
            )}

            {/* Bottom Register CTA for Mobile */}
            <div className="lg:hidden bg-indigo-600 rounded-2xl p-8 text-white text-center shadow-xl">
               <Smartphone className="h-12 w-12 mx-auto mb-4 text-indigo-200" />
               <h3 className="text-2xl font-display font-bold mb-4">Are you a business owner?</h3>
               <p className="text-indigo-100 mb-8 max-w-xs mx-auto">
                 List your business in Salem and get discovered by thousands of potential customers daily.
               </p>
               <Link to="/register">
                 <Button className="w-full bg-white text-indigo-600 font-black h-14 rounded-xl shadow-lg">
                   Register Now
                 </Button>
               </Link>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
