"use client";

import Image from "next/image";
import type { Movie } from "@/lib/types/movie";
import { getPosterUrl } from "@/lib/tmdb";
import { getRatingColor, formatRating } from "@/lib/utils/rating";
import { cn } from "@/lib/utils/cn";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const ratingColor = getRatingColor(movie.vote_average || 0);
    const posterUrl = getPosterUrl(movie.poster_path);

    const ratingColorClasses = {
        green: "text-green-500",
        orange: "text-orange-500",
        red: "text-red-500",
    };

    return (
        <div className="group relative bg-[#181818] rounded-xl overflow-hidden shadow-2xl transition-all duration-400 hover:scale-105 hover:z-20 ring-1 ring-white/5">
            {/* Movie Poster */}
            <div className="relative aspect-[2/3] w-full">
                <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-xs font-black border border-white/10">
                    <span className={ratingColorClasses[ratingColor]}>
                        {formatRating(movie.vote_average || 0)}
                    </span>
                </div>
            </div>

            {/* Movie Info on Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black p-6 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="font-bebas text-2xl text-white mb-2 leading-tight tracking-wide">
                    {movie.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-3 mb-4 leading-relaxed">
                    {movie.overview || "No overview available."}
                </p>
                <div className="flex gap-2">
                    <button className="flex-1 bg-white text-black text-xs font-bold py-2 rounded hover:bg-gray-200 transition-colors">
                        Details
                    </button>
                    <button className="w-10 h-8 flex items-center justify-center bg-gray-600/50 rounded text-white hover:bg-gray-600 transition-colors">
                        +
                    </button>
                </div>
            </div>

            {/* Static Title (Footer) - Shown when not hovering */}
            <div className="p-4 bg-[#121212] group-hover:opacity-0 transition-opacity">
                <h3 className="font-black text-xs uppercase tracking-wider truncate text-gray-100">
                    {movie.title}
                </h3>
            </div>
        </div>
    );
}
