"use client";

import type { Movie } from "@/lib/types/movie";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
    movies: Movie[];
    isLoading?: boolean;
}

export function MovieGrid({ movies, isLoading = false }: MovieGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="skeleton aspect-[2/3] w-full max-w-[270px] mx-auto rounded-lg"
                    />
                ))}
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
                <svg
                    className="w-24 h-24 text-gray-400 dark:text-gray-600 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No movies found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filters
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6 p-6">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
