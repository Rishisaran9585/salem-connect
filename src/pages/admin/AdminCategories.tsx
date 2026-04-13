import { useState, useEffect, useRef } from "react";
import { Plus, Search, Edit2, Trash2, Tag, LayoutGrid, CheckCircle, XCircle, Upload, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "@/lib/api";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image_url: string;
  is_active: boolean;
  description?: string;
  business_count?: number;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // New Category Form State
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("folder");
  const [newImage, setNewImage] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API.admin.CATEGORIES, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error: any) {
      toast.error("Could not load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "categories");

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
        toast.success("Image uploaded!");
      }
    } catch (error) {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return toast.error("Category name is required.");

    try {
      const response = await axios.post(API.admin.CATEGORIES, {
        name: newName,
        icon: newIcon,
        image_url: newImage,
        description: newDescription
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });

      if (response.data.success) {
        toast.success("Category created!");
        setShowAddForm(false);
        setNewName("");
        setNewIcon("folder");
        setNewImage("");
        setNewDescription("");
        fetchCategories();
      }
    } catch (error: any) {
      toast.error("Error creating category.");
    }
  };

  const deleteCategory = async (id: number) => {
    if (!window.confirm("Delete this category? Businesses in this category will be affected.")) return;

    try {
      const response = await axios.delete(`${API.admin.CATEGORIES}?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (response.data.success) {
        toast.success("Category deleted.");
        fetchCategories();
      }
    } catch (error) {
      toast.error("Error deleting.");
    }
  };

  return (
    <div className="space-y-12 p-6 lg:p-14 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 bg-indigo-500 rounded-full" />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Manage Categories</p>
          </div>
          <h1 className="text-5xl font-display font-black text-slate-950 tracking-tighter uppercase italic">Categories</h1>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 hover:bg-slate-950 text-white rounded-xl font-bold px-10 h-14 text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20"
        >
          {showAddForm ? <XCircle className="mr-2 h-5 w-5" /> : <Plus className="mr-2 h-5 w-5" />}
          {showAddForm ? "Cancel" : "Add Category"}
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-xl border border-slate-50 relative overflow-hidden"
          >
            <div className="relative z-10">
               <h2 className="text-2xl font-bold text-slate-950 mb-10 flex items-center gap-4">
                 <LayoutGrid className="w-8 h-8 text-indigo-600" />
                 Category Details
               </h2>
               <form onSubmit={handleAddCategory} className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category Name</label>
                   <Input 
                     value={newName} 
                     onChange={(e) => setNewName(e.target.value)} 
                     placeholder="e.g. Restaurants" 
                     className="h-14 rounded-xl border-slate-100 bg-slate-50 px-6 font-bold"
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Icon Name (Optional)</label>
                   <Input 
                     value={newIcon} 
                     onChange={(e) => setNewIcon(e.target.value)} 
                     placeholder="e.g. shopping-bag" 
                     className="h-14 rounded-xl border-slate-100 bg-slate-50 px-6 font-bold"
                   />
                 </div>
                 <div className="space-y-3 md:col-span-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category Image</label>
                   <div className="flex gap-4">
                     <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" disabled={uploading} className="hidden" />
                     <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="h-14 flex-1 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs border border-slate-100">
                       <Upload className="h-4 w-4 mr-2" />
                       {uploading ? "Uploading..." : "Click to select image"}
                     </Button>
                   </div>
                   {newImage && (
                     <div className="mt-6 flex items-center gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                       <img src={newImage} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                       <p className="text-xs font-bold text-emerald-600">Image ready!</p>
                     </div>
                   )}
                 </div>
                 <div className="space-y-3 md:col-span-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</label>
                   <textarea 
                     value={newDescription}
                     onChange={(e) => setNewDescription(e.target.value)}
                     rows={3}
                     placeholder="Write a short description..."
                     className="w-full rounded-xl border border-slate-100 bg-slate-50 p-6 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600 min-h-[120px]"
                   />
                 </div>
                 <Button type="submit" className="md:col-span-2 h-16 bg-slate-950 hover:bg-slate-900 text-white rounded-xl text-lg font-bold uppercase tracking-widest shadow-xl">
                   Save Category
                 </Button>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
             <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading Categories...</p>
             </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-[2.5rem] shadow-lg border border-slate-50 group hover:shadow-indigo-600/5 transition-all overflow-hidden relative">
              <div className="h-40 bg-slate-100 relative overflow-hidden">
                {cat.image_url ? (
                  <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                     <Tag className="w-10 h-10 text-slate-300" />
                  </div>
                )}
                
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2 bg-white/90 rounded-lg text-slate-600 hover:text-indigo-600 shadow-sm transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteCategory(cat.id)} className="p-2 bg-white/90 rounded-lg text-red-500 hover:bg-red-500 hover:text-white shadow-sm transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                </div>
              </div>
              
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{cat.name}</h3>
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Businesses</p>
                      <p className="text-xl font-bold text-slate-900">{cat.business_count || 0}</p>
                   </div>
                   <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-300 flex items-center justify-center">
                      <ChevronRight size={16} />
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
