"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { getGenres, getMoviesByGenre } from "@/lib/tmdb";
import { createSession } from "@/lib/firebase/sessions";
import type { Genre, SessionFilters } from "@/lib/types/movie";
import { nanoid } from "nanoid";

export default function CreateSessionPage() {
    const router = useRouter();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [timeframe, setTimeframe] = useState<"5" | "10" | "all">("10");
    const [region, setRegion] = useState<"hollywood" | "bollywood" | "all">("all");
    const [movieCount, setMovieCount] = useState(20);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getGenres().then(setGenres).catch(console.error);
    }, []);

    const toggleGenre = (genreId: number) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId)
                ? prev.filter((id) => id !== genreId)
                : [...prev, genreId]
        );
    };

    const handleCreateSession = async () => {
        setIsLoading(true);

        try {
            const currentYear = new Date().getFullYear();
            const yearRange: [number, number] = timeframe === "5"
                ? [currentYear - 5, currentYear]
                : timeframe === "10"
                    ? [currentYear - 10, currentYear]
                    : [1900, currentYear];

            const language = region === "bollywood" ? "hi" : region === "hollywood" ? "en" : undefined;

            const moviesData = await getMoviesByGenre(
                selectedGenres,
                1,
                yearRange,
                6.0, // Default good rating
                language
            );

            const movies = moviesData.results.slice(0, movieCount);

            if (movies.length === 0) {
                alert("No movies found! Try broader filters.");
                setIsLoading(false);
                return;
            }

            const userId = nanoid(8);
            const session = await createSession({
                createdBy: userId,
                createdAt: Date.now(),
                movies,
                filters: {
                    genres: selectedGenres,
                    yearRange,
                    minRating: 6.0,
                    movieCount,
                },
                participants: [userId],
                status: "active",
            });

            router.push(`/match/session/${session.id}?userId=${userId}`);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create session.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-netflix-black text-white">
            <Navbar />

            <main className="max-w-6xl mx-auto py-16 px-6 relative z-10">
                <div className="mb-12">
                    <h1 className="font-bebas text-7xl md:text-8xl mb-4 text-white tracking-tight">FIND YOUR <span className="text-netflix-red">MATCH</span></h1>
                    <p className="text-gray-400 text-xl font-light max-w-2xl">Tailor your experience. We&apos;ll curate a special list for you and your partner to swipe on.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Filters Column */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Region Selection */}
                        <section>
                            <h2 className="text-2xl font-bebas mb-6 text-white tracking-wider flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-netflix-red flex items-center justify-center text-xs">1</span>
                                Select Region
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { id: "all", label: "Worldwide", icon: "🌎" },
                                    { id: "hollywood", label: "Hollywood", icon: "🇺🇸" },
                                    { id: "bollywood", label: "Bollywood", icon: "🇮🇳" },
                                ].map((r) => (
                                    <button
                                        key={r.id}
                                        onClick={() => setRegion(r.id as any)}
                                        className={`group relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${region === r.id
                                                ? "border-netflix-red bg-netflix-red/10 animate-pulse-slow shadow-[0_0_20px_rgba(229,9,20,0.2)]"
                                                : "border-white/10 bg-white/5 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className="relative z-10 flex flex-col items-center gap-3">
                                            <span className="text-4xl filter drop-shadow-md">{r.icon}</span>
                                            <span className={`font-bold tracking-wide ${region === r.id ? "text-netflix-red" : "text-gray-400 group-hover:text-white"}`}>
                                                {r.label}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Timeframe Selection */}
                        <section>
                            <h2 className="text-2xl font-bebas mb-6 text-white tracking-wider flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-netflix-red flex items-center justify-center text-xs">2</span>
                                Select Timeframe
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { id: "5", label: "Last 5 Years", desc: "Latest releases" },
                                    { id: "10", label: "Last 10 Years", desc: "Best of decade" },
                                    { id: "all", label: "All Time", desc: "The classics" },
                                ].map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTimeframe(t.id as any)}
                                        className={`group p-6 rounded-2xl border text-left transition-all duration-300 ${timeframe === t.id
                                                ? "border-netflix-red bg-netflix-red/10"
                                                : "border-white/10 bg-white/5 hover:bg-white/10"
                                            }`}
                                    >
                                        <div className={`font-black text-xl mb-1 ${timeframe === t.id ? "text-netflix-red" : "text-white"}`}>
                                            {t.label}
                                        </div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest">{t.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Genre Selection */}
                        <section>
                            <h2 className="text-2xl font-bebas mb-6 text-white tracking-wider flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-netflix-red flex items-center justify-center text-xs">3</span>
                                Focus Your Mood
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {genres.slice(0, 15).map((genre) => (
                                    <button
                                        key={genre.id}
                                        onClick={() => toggleGenre(genre.id)}
                                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 border ${selectedGenres.includes(genre.id)
                                                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                                : "bg-white/5 border-white/10 hover:border-white/30 text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {genre.name}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Summary & Create Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-netflix-red mb-6 underline decoration-netflix-red underline-offset-8">Session Summary</h3>

                            <div className="space-y-6 mb-8">
                                <div className="flex justify-between items-center group">
                                    <span className="text-gray-500 font-medium">Region</span>
                                    <span className="text-white font-bold group-hover:text-netflix-red transition-colors capitalize">{region}</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-gray-500 font-medium">Timeframe</span>
                                    <span className="text-white font-bold group-hover:text-netflix-red transition-colors">{timeframe === "all" ? "All Time" : `Last ${timeframe} Yrs`}</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-gray-500 font-medium">Genres</span>
                                    <span className="text-white font-bold group-hover:text-netflix-red transition-colors">{selectedGenres.length || "Any"}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCreateSession}
                                disabled={isLoading}
                                className="w-full bg-netflix-red hover:bg-netflix-red-dark text-white font-black py-5 rounded-2xl text-xl uppercase tracking-tighter transition-all duration-500 hover:scale-[1.05] shadow-[0_10px_30px_rgba(229,9,20,0.4)] disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Curating...</span>
                                    </div>
                                ) : "Go to Swiping →"}
                            </button>
                            <p className="text-[10px] text-gray-500 mt-6 text-center uppercase tracking-widest leading-loose">
                                We&apos;ll find the best {movieCount} matches based on your vibe.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
