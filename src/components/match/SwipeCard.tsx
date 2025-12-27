"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import type { Movie } from "@/lib/types/movie";
import { getPosterUrl } from "@/lib/tmdb";
import { formatRating, getRatingColor } from "@/lib/utils/rating";
import { cn } from "@/lib/utils/cn";

interface SwipeCardProps {
    movie: Movie;
    onSwipe: (direction: "left" | "right") => void;
    isTop: boolean;
}

export function SwipeCard({ movie, onSwipe, isTop }: SwipeCardProps) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 100) {
            onSwipe(info.offset.x > 0 ? "right" : "left");
        }
    };

    const ratingColor = getRatingColor(movie.vote_average);
    const ratingColorClasses = {
        green: "text-green-500",
        orange: "text-orange-500",
        red: "text-red-500",
    };

    return (
        <motion.div
            className={cn(
                "absolute w-full max-w-sm aspect-[2/3] cursor-grab active:cursor-grabbing",
                !isTop && "pointer-events-none"
            )}
            style={{
                x,
                rotate,
                opacity: isTop ? opacity : 1,
                scale: isTop ? 1 : 0.95,
                zIndex: isTop ? 10 : 1,
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={{ scale: 1.05 }}
        >
            {/* Like/Nope Indicators */}
            <motion.div
                className="absolute top-8 left-8 z-20 bg-green-500 text-white font-bebas text-5xl px-6 py-3 rounded-lg rotate-[-20deg] border-4 border-white shadow-xl"
                style={{
                    opacity: useTransform(x, [0, 100], [0, 1]),
                }}
            >
                LIKE
            </motion.div>

            <motion.div
                className="absolute top-8 right-8 z-20 bg-red-500 text-white font-bebas text-5xl px-6 py-3 rounded-lg rotate-[20deg] border-4 border-white shadow-xl"
                style={{
                    opacity: useTransform(x, [-100, 0], [1, 0]),
                }}
            >
                NOPE
            </motion.div>

            {/* Card Content */}
            <div className="relative w-full h-full bg-[#181818] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden border border-white/10">
                {/* Movie Poster */}
                <div className="relative w-full h-full">
                    <Image
                        src={getPosterUrl(movie.poster_path, "original")}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                        priority
                    />

                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                    {/* Movie Info Overlayed on bottom */}
                    <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
                        <div className="mb-4">
                            <h2 className="font-bebas text-5xl text-white mb-2 leading-none tracking-tight drop-shadow-2xl">
                                {movie.title}
                            </h2>
                            <div className="flex items-center gap-4">
                                <span
                                    className={cn(
                                        "bg-netflix-red text-white rounded-full px-4 py-1.5 text-sm font-black shadow-lg",
                                    )}
                                >
                                    ⭐ {formatRating(movie.vote_average)}
                                </span>
                                {movie.release_date && (
                                    <span className="text-white/80 text-lg font-medium drop-shadow-md">
                                        {new Date(movie.release_date).getFullYear()}
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-200 text-sm leading-relaxed line-clamp-3 font-light drop-shadow-md">
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
