import { useState, useEffect, useRef } from "react";
import { Plus, Search, Edit2, Trash2, Tag, LayoutGrid, CheckCircle, XCircle, Upload } from "lucide-react";
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
        console.log("Fetched categories:", response.data.data);
        setCategories(response.data.data);
      } else {
        toast.error("Failed to fetch categories");
        console.error("Response:", response.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories");
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
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return toast.error("Category name is required");

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
        toast.success("Category added successfully!");
        setShowAddForm(false);
        setNewName("");
        setNewIcon("folder");
        setNewImage("");
        setNewDescription("");
        // Refresh the categories list
        await fetchCategories();
      } else {
        toast.error(response.data.message || "Failed to add category");
        console.error("Response:", response.data);
      }
    } catch (error: any) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.message || "Error adding category");
    }
  };

  const deleteCategory = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await axios.delete(`${API.admin.CATEGORIES}?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (response.data.success) {
        toast.success("Category deleted");
        fetchCategories();
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-xl">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#1B4332]">Manage Categories</h1>
          <p className="text-gray-500 font-sans mt-1">Add, browse, or edit business categories for Salem Directory.</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#C9973A] hover:bg-[#C9973A]/90 text-white rounded-full px-8 py-6 font-bold flex gap-2"
        >
          {showAddForm ? <XCircle /> : <Plus />}
          {showAddForm ? "Cancel Adding" : "Add New Category"}
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-[#C9973A]/10"
          >
            <h2 className="text-xl font-display font-bold text-[#1B4332] mb-8 flex items-center gap-3">
              <LayoutGrid className="w-6 h-6 text-[#C9973A]" />
              New Category Details
            </h2>
            <form onSubmit={handleAddCategory} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest pl-2">Category Name *</label>
                <Input 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  placeholder="e.g. Restaurants" 
                  className="rounded-xl border-gray-100 bg-gray-50 p-6 text-lg focus:ring-[#C9973A]"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest pl-2">Lucide Icon Name</label>
                <Input 
                  value={newIcon} 
                  onChange={(e) => setNewIcon(e.target.value)} 
                  placeholder="e.g. utensils, car, home" 
                  className="rounded-xl border-gray-100 bg-gray-50 p-6 text-lg"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest pl-2">Thumbnail Image</label>
                <div className="flex gap-3">
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
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground flex gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                </div>
                {newImage && (
                  <div className="mt-3">
                    <img src={newImage} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                    <p className="text-xs text-success mt-2">✓ Image uploaded</p>
                  </div>
                )}
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest pl-2">Description</label>
                <textarea 
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Brief description of the category..."
                  className="w-full rounded-xl border border-gray-100 bg-gray-50 p-6 text-lg focus:outline-none focus:ring-2 focus:ring-[#C9973A]"
                />
              </div>
              <Button type="submit" className="md:col-span-2 bg-[#1B4332] hover:bg-[#1B4332]/90 py-8 rounded-2xl text-xl font-bold shadow-xl border-none">
                Save Category to Directory
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Grid List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="p-10 text-center col-span-full font-sans animate-pulse">Loading categories...</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all border border-gray-100 group overflow-hidden">
              {cat.image_url && (
                <div className="h-32 overflow-hidden bg-gray-100">
                  <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-[#1B4332]/5 rounded-2xl flex items-center justify-center text-[#C9973A] group-hover:bg-[#C9973A] group-hover:text-white transition-all transform group-hover:rotate-6 shadow-md">
                    <Tag className="w-6 h-6" />
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteCategory(cat.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-[#1B4332] line-clamp-1">{cat.name}</h3>
                <p className="text-sm font-sans text-gray-400 font-bold uppercase tracking-widest mt-1">/category/{cat.slug}</p>
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#1B4332]/60 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span>STATUS: {cat.is_active ? "ACTIVE" : "INACTIVE"}</span>
                  {cat.is_active && <CheckCircle className="w-3 h-3 text-[#22C55E]" />}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
