"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (query.trim()) {
                router.push(`/?search=${encodeURIComponent(query.trim())}`);
            }
        },
        [query, router]
    );

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className={cn(
                    "w-full bg-black border border-white/20",
                    "rounded-full px-6 py-2.5 text-sm",
                    "text-white placeholder:text-gray-500",
                    "focus:border-netflix-red focus:ring-1 focus:ring-netflix-red focus:outline-none",
                    "transition-all duration-300"
                )}
            />
        </form>
    );
}
