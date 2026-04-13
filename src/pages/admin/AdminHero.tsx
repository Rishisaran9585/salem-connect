import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Image as ImageIcon, Layout, Save, XCircle, Upload, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "@/lib/api";

interface Slide {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
  sort_order: number;
  is_active: boolean;
}

export default function AdminHero() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form State
  const [newImage, setNewImage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");

  const fetchSlides = async () => {
    try {
      const response = await axios.get(API.admin.HERO, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (response.data.success) {
        setSlides(response.data.data);
      }
    } catch (error) {
      toast.error("Protocol disruption: Visual feed offline");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "hero");

    setUploading(true);
    try {
      const res = await axios.post(API.admin.FILE_UPLOAD, formData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.data.success) {
        setNewImage(res.data.data.url);
        toast.success("Asset verified: Image uploaded");
      }
    } catch (error) {
      toast.error("Upload failed: Check asset dimensions");
    } finally {
      setUploading(false);
    }
  };

  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage) return toast.error("Asset required: Primary image missing");

    try {
      const response = await axios.post(API.admin.HERO, {
        image_url: newImage,
        title: newTitle,
        subtitle: newSubtitle
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });

      if (response.data.success) {
        toast.success("Visual updated: New slide deployed");
        setShowAddForm(false);
        setNewImage("");
        setNewTitle("");
        setNewSubtitle("");
        fetchSlides();
      }
    } catch (error) {
      toast.error("Protocol error: Deployment failed");
    }
  };

  const deleteSlide = async (id: number) => {
    if (!window.confirm("Execute removal? Asset will be purged.")) return;
    try {
      await axios.delete(`${API.admin.HERO}?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      toast.success("Asset decommissioned");
      fetchSlides();
    } catch (error) {
      toast.error("Decommissioning failed");
    }
  };

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hydrating visual assets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 p-6 lg:p-14 bg-slate-50/40 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-3 h-3 bg-indigo-500 rounded-full" />
             <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Visual Management Layer</p>
          </div>
          <h1 className="text-5xl font-display font-black text-slate-950 tracking-tighter italic">Hero <span className="text-indigo-600">Visuals</span></h1>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 hover:bg-slate-950 text-white rounded-2xl font-black px-10 h-14 text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/25 transition-all hover:-translate-y-1"
        >
          {showAddForm ? <XCircle className="mr-2 h-5 w-5" /> : <Plus className="mr-2 h-5 w-5" />}
          {showAddForm ? "Cancel Operation" : "New Visual Deployment"}
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10">
               <h2 className="text-3xl font-display font-black text-slate-950 mb-12 flex items-center gap-4">
                 <ImageIcon className="w-10 h-10 text-indigo-600" />
                 Slide Configuration
               </h2>
               <form onSubmit={handleAddSlide} className="grid md:grid-cols-2 gap-10">
                 <div className="space-y-4 md:col-span-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Asset (Widescreen Recommended)</label>
                   <div className="flex gap-4">
                     <input 
                       type="file"
                       ref={fileInputRef}
                       onChange={handleFileUpload}
                       accept="image/*"
                       disabled={uploading}
                       className="hidden"
                     />
                     <Button
                       type="button"
                       onClick={() => fileInputRef.current?.click()}
                       disabled={uploading}
                       className="h-20 flex-1 rounded-2xl bg-indigo-600/5 hover:bg-indigo-600/10 text-indigo-600 font-black text-[10px] uppercase tracking-widest border border-indigo-600/10 transition-all flex items-center justify-center gap-3"
                     >
                       <Upload className="h-5 w-5" />
                       {uploading ? "Uploading Bundle..." : "Select Master Image"}
                     </Button>
                   </div>
                   {newImage && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-xl relative group">
                        <img src={newImage} alt="Bundle preview" className="w-full h-80 object-cover" />
                        <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Asset Previewing</p>
                        </div>
                     </motion.div>
                   )}
                 </div>
                 <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Heading</label>
                   <Input 
                     value={newTitle} 
                     onChange={(e) => setNewTitle(e.target.value)} 
                     placeholder="e.g. THE ELITE DIRECTORY" 
                     className="h-16 rounded-2xl border-slate-100 bg-slate-50 px-8 text-lg font-bold focus:ring-indigo-600 transition-all"
                   />
                 </div>
                 <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secondary Support Text</label>
                   <Input 
                     value={newSubtitle} 
                     onChange={(e) => setNewSubtitle(e.target.value)} 
                     placeholder="e.g. Connecting Salem's Top Enterprises" 
                     className="h-16 rounded-2xl border-slate-100 bg-slate-50 px-8 text-lg font-bold focus:ring-indigo-600 transition-all"
                   />
                 </div>
                 <Button type="submit" className="md:col-span-2 h-20 bg-slate-950 hover:bg-slate-900 text-white rounded-[1.5rem] text-lg font-black uppercase tracking-[0.3em] shadow-2xl transition-all hover:-translate-y-1">
                   Authorize Deployment
                 </Button>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {slides.map(slide => (
          <div key={slide.id} className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-50 overflow-hidden group hover:shadow-indigo-600/5 transition-all duration-500 flex flex-col relative">
            <div className="h-64 relative overflow-hidden bg-slate-950">
              <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-6 left-6">
                 <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] border shadow-sm ${
                   slide.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                 }`}>
                   {slide.is_active ? 'Online' : 'Draft'}
                 </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Sort Index: {slide.sort_order}</p>
                    <h3 className="text-xl font-display font-black text-white leading-tight line-clamp-1">{slide.title || "No Heading"}</h3>
                 </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 flex gap-2">
                <button 
                  onClick={() => deleteSlide(slide.id)}
                  className="grow bg-white text-red-500 py-4 rounded-[1.25rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                   <Trash2 size={16} /> Decommission
                </button>
                <div className="p-4 bg-white text-slate-300 rounded-[1.25rem] shadow-sm cursor-pointer hover:bg-slate-950 hover:text-white transition-all">
                   <Eye size={18} />
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
