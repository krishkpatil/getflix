"use client";

import { useState } from "react";
import Image from "next/image";
import type { Movie } from "@/lib/types/movie";
import { getPosterUrl } from "@/lib/tmdb";
import { getRatingColor, formatRating } from "@/lib/utils/rating";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const [showModal, setShowModal] = useState(false);
    const ratingColor = getRatingColor(movie.vote_average || 0);
    const posterUrl = getPosterUrl(movie.poster_path);

    const ratingColorClasses = {
        green: "text-green-500",
        orange: "text-orange-500",
        red: "text-red-500",
    };

    return (
        <>
            <div
                onClick={() => setShowModal(true)}
                className="group relative bg-[#121212] rounded-xl overflow-hidden shadow-2xl transition-all duration-400 hover:scale-105 hover:z-20 ring-1 ring-white/5 cursor-pointer"
            >
                {/* Movie Poster */}
                <div className="relative aspect-[2/3] w-full">
                    <Image
                        src={posterUrl}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                        priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-black/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-sm font-black border border-white/10">
                        <span className={ratingColorClasses[ratingColor]}>
                            ⭐ {formatRating(movie.vote_average || 0)}
                        </span>
                    </div>
                </div>

                {/* Static Title (Footer) - Always visible, not truncated */}
                <div className="p-3 md:p-4 bg-[#121212]">
                    <h3 className="font-black text-xs md:text-sm text-white leading-tight line-clamp-2 min-h-[2.5rem]">
                        {movie.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-1">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </p>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-[#121212] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header with Backdrop */}
                        <div className="relative h-64 md:h-80">
                            <Image
                                src={posterUrl}
                                alt={movie.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/60 to-transparent"></div>

                            {/* Close Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 w-10 h-10 bg-black/80 hover:bg-netflix-red rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
                            >
                                <span className="text-white text-xl">×</span>
                            </button>

                            {/* Title Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h2 className="font-bebas text-4xl md:text-5xl text-white mb-2 leading-none tracking-tight">
                                    {movie.title}
                                </h2>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className={`font-black ${ratingColorClasses[ratingColor]}`}>
                                        ⭐ {formatRating(movie.vote_average || 0)}
                                    </span>
                                    <span className="text-gray-400">
                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 md:p-8">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-netflix-red mb-4">
                                Overview
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                {movie.overview || "No overview available for this movie."}
                            </p>

                            {/* Movie Details Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Release Date</p>
                                    <p className="text-white font-bold">
                                        {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Unknown'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rating</p>
                                    <p className="text-white font-bold">
                                        {movie.vote_average?.toFixed(1)}/10 ({movie.vote_count} votes)
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Language</p>
                                    <p className="text-white font-bold uppercase">
                                        {movie.original_language}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Popularity</p>
                                    <p className="text-white font-bold">
                                        {movie.popularity?.toFixed(0)}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-netflix-red hover:bg-netflix-red-dark text-white font-black py-4 rounded-full transition-all duration-300 hover:scale-105 uppercase tracking-tight"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
