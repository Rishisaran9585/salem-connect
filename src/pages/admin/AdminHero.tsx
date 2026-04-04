import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Image as ImageIcon, Layout, Save, XCircle, Upload } from "lucide-react";
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
      toast.error("Failed to fetch slides");
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
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage) return toast.error("Image is required");

    try {
      const response = await axios.post(API.admin.HERO, {
        image_url: newImage,
        title: newTitle,
        subtitle: newSubtitle
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });

      if (response.data.success) {
        toast.success("Slide added successfully!");
        setShowAddForm(false);
        setNewImage("");
        setNewTitle("");
        setNewSubtitle("");
        fetchSlides();
      }
    } catch (error) {
      toast.error("Error adding slide");
    }
  };

  const deleteSlide = async (id: number) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API.admin.HERO}?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      toast.success("Slide deleted");
      fetchSlides();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading slides...</div>;
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-xl">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#1B4332]">Homepage Hero Carousel</h1>
          <p className="text-gray-500 font-sans mt-1">Manage the high-impact visual slides on your homepage.</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#C9973A] hover:bg-[#C9973A]/90 text-white rounded-full px-8 py-6 font-bold flex gap-2"
        >
          {showAddForm ? <XCircle /> : <Plus />}
          {showAddForm ? "Cancel" : "Add New Slide"}
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <form onSubmit={handleAddSlide} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Slide Image</label>
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
                    <img src={newImage} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                    <p className="text-xs text-success mt-2">✓ Image uploaded</p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Main Heading (Optional)</label>
                <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Discover Salem" className="rounded-xl p-6" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Sub-headline (Optional)</label>
                <Input value={newSubtitle} onChange={(e) => setNewSubtitle(e.target.value)} placeholder="e.g. The Elite Business Network" className="rounded-xl p-6" />
              </div>
              <Button type="submit" className="md:col-span-2 bg-[#1B4332] py-8 rounded-2xl text-xl font-bold">Publish Slide</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {slides.map(slide => (
          <div key={slide.id} className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 group">
            <div className="h-48 relative">
              <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <button type="button" onClick={() => deleteSlide(slide.id)} className="bg-white p-4 rounded-full text-red-500 hover:scale-110 transition-transform">
                    <Trash2 size={24} />
                 </button>
              </div>
            </div>
            <div className="p-8">
               <h3 className="text-xl font-display font-bold text-[#1B4332] line-clamp-1">{slide.title || "No Title"}</h3>
               <p className="text-gray-400 text-sm mt-2 line-clamp-2">{slide.subtitle || "No subtitle provided."}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
