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
    <section className="-mt-7 relative z-10 px-4">
      <form
        onSubmit={handleSearch}
        className="mx-auto flex max-w-2xl items-center gap-2 rounded-xl bg-card p-2 shadow-elevated"
      >
        <div className="flex flex-1 items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search businesses, categories, services..."
            className="w-full bg-transparent text-sm font-sans text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        <Button type="submit" className="bg-gradient-gold font-sans text-accent-foreground shadow-sm hover:opacity-90 shrink-0">
          Search
        </Button>
      </form>
    </section>
  );
}
