import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="relative z-10 px-4 py-8 bg-[#050505] border-b border-white/5">
      <form
        onSubmit={handleSearch}
        className="mx-auto flex max-w-4xl items-center gap-3 rounded-2xl bg-card p-3 shadow-elevated transition-transform hover:scale-[1.01] duration-300"
      >
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-secondary/80 px-5 py-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search businesses, categories, services..."
            className="w-full bg-transparent text-base font-sans text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        <Button type="submit" size="lg" className="bg-gradient-gold font-sans text-accent-foreground shadow-sm hover:opacity-90 shrink-0 h-14 px-8 text-base">
          Search
        </Button>
      </form>
    </section>
  );
}
