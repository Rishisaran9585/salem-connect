import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Tag, LayoutGrid, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image_url: string;
  is_active: boolean;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New Category Form State
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("folder");
  const [newImage, setNewImage] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost/salem-connect/backend/api/v1/admin/categories.php", {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return toast.error("Category name is required");

    try {
      const response = await axios.post("http://localhost/salem-connect/backend/api/v1/admin/categories.php", {
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
        fetchCategories();
      }
    } catch (error) {
      toast.error("Error adding category");
    }
  };

  const deleteCategory = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await axios.delete(`http://localhost/salem-connect/backend/api/v1/admin/categories.php?id=${id}`, {
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

      {showAddForm && (
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest pl-2">Thumbnail Image URL</label>
              <Input 
                value={newImage} 
                onChange={(e) => setNewImage(e.target.value)} 
                placeholder="https://images.unsplash.com/..." 
                className="rounded-xl border-gray-100 bg-gray-50 p-6 text-lg"
              />
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

      {/* Categories Grid List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="p-10 text-center col-span-full font-sans animate-pulse">Loading categories...</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="bg-white p-6 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
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
          ))
        )}
      </div>
    </div>
  );
}
import { motion } from "framer-motion";
