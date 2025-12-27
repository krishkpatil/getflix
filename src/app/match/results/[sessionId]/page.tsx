"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { getSession, getMatches } from "@/lib/firebase/sessions";
import { getPosterUrl } from "@/lib/tmdb";
import { calculateSessionStats, getMatches as getMatchedMovies } from "@/lib/utils/matching";
import type { MatchSession, Movie } from "@/lib/types/movie";

export default function ResultsPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const sessionId = params.sessionId as string;
    const userId = searchParams.get("userId");

    const [session, setSession] = useState<MatchSession | null>(null);
    const [matchedMovies, setMatchedMovies] = useState<Movie[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [waitingForPartner, setWaitingForPartner] = useState(false);

    useEffect(() => {
        if (!userId) {
            router.push("/match");
            return;
        }

        loadResults();
    }, [sessionId, userId]);

    const loadResults = async () => {
        const sessionData = await getSession(sessionId);
        if (!sessionData) {
            alert("Session not found!");
            router.push("/match");
            return;
        }

        setSession(sessionData);

        // Check if both users have completed
        if (sessionData.participants.length < 2) {
            setWaitingForPartner(true);
            setIsLoading(false);
            return;
        }

        const matchesData = await getMatches(sessionId);
        if (!matchesData) {
            setWaitingForPartner(true);
            setIsLoading(false);
            return;
        }

        // Calculate stats
        const sessionStats = calculateSessionStats(
            matchesData.user1Swipes,
            matchesData.user2Swipes
        );
        setStats(sessionStats);

        // Get matched movie IDs
        const matchedIds = getMatchedMovies(
            matchesData.user1Swipes,
            matchesData.user2Swipes
        );

        // Filter movies
        const matches = sessionData.movies.filter((movie) =>
            matchedIds.includes(movie.id)
        );
        setMatchedMovies(matches);
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-netflix-red mx-auto mb-4"></div>
                    <p className="text-xl text-gray-400">Loading results...</p>
                </div>
            </div>
        );
    }

    if (waitingForPartner) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar />
                <main className="min-h-[calc(100vh-90px)] flex items-center justify-center px-6">
                    <div className="max-w-2xl w-full bg-[#121212] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-12 text-center border border-white/5">
                        <div className="text-7xl mb-8 animate-pulse">⏳</div>
                        <h1 className="font-bebas text-6xl mb-6 text-white tracking-tight">
                            Waiting for Your Partner
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 font-light leading-relaxed">
                            Great taste takes two. Share the session link with your friend so they can swipe too!
                        </p>
                        <div className="bg-black/50 p-6 rounded-2xl mb-8 break-all text-sm font-mono text-netflix-red border border-white/5">
                            {typeof window !== "undefined" && window.location.origin}/match/session/{sessionId}
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `${window.location.origin}/match/session/${sessionId}`
                                );
                                alert("Link copied!");
                            }}
                            className="bg-netflix-red text-white font-black px-10 py-5 rounded-full text-xl hover:bg-netflix-red-dark transition-all duration-300 hover:scale-105 shadow-2xl uppercase tracking-tight"
                        >
                            📋 Copy Link
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="min-h-[calc(100vh-90px)] bg-gradient-to-b from-black via-[#080808] to-black py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20 animate-fade-in">
                        <div className="text-8xl mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">🎉</div>
                        <h1 className="font-bebas text-7xl md:text-9xl mb-4 text-white tracking-tighter drop-shadow-2xl">
                            IT&apos;S A <span className="text-netflix-red">MATCH!</span>
                        </h1>
                        <p className="text-2xl text-gray-400 font-light tracking-wide">
                            You both liked {matchedMovies.length} movie{matchedMovies.length !== 1 ? "s" : ""}!
                        </p>
                    </div>

                    {/* Stats */}
                    {stats && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                            {[
                                { label: "Match Rate", val: `${stats.matchPercentage}%`, color: "text-netflix-red" },
                                { label: "Matches", val: stats.matchCount, color: "text-green-500" },
                                { label: "Your Likes", val: stats.user1Likes, color: "text-blue-500" },
                                { label: "Partner Likes", val: stats.user2Likes, color: "text-purple-500" }
                            ].map((s, i) => (
                                <div key={i} className="bg-[#121212] border border-white/5 rounded-2xl p-8 text-center shadow-2xl transform hover:scale-105 transition-transform">
                                    <div className={`text-5xl font-black mb-2 ${s.color}`}>
                                        {s.val}
                                    </div>
                                    <div className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Matched Movies */}
                    {matchedMovies.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
                            {matchedMovies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="group bg-[#121212] rounded-2xl shadow-2xl overflow-hidden hover:shadow-netflix-red/10 border border-white/5 transition-all duration-300 hover:scale-105"
                                >
                                    <div className="relative aspect-[2/3] overflow-hidden">
                                        <Image
                                            src={getPosterUrl(movie.poster_path, "w500")}
                                            alt={movie.title}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bebas text-2xl text-white line-clamp-1 mb-2 tracking-wide">
                                            {movie.title}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-netflix-red font-black text-xs">⭐ {movie.vote_average.toFixed(1)}</span>
                                            <span className="text-gray-500 text-[10px] uppercase font-bold">{new Date(movie.release_date).getFullYear()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">😢</div>
                            <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                                No Matches Found
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                You and your partner didn&apos;t like any of the same movies. Try again with different preferences!
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            href="/match/create"
                            className="bg-netflix-red text-white font-black px-12 py-5 rounded-full text-xl hover:bg-netflix-red-dark transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(229,9,20,0.5)] uppercase tracking-tight text-center"
                        >
                            🎬 Start New Session
                        </Link>
                        <Link
                            href="/"
                            className="bg-white/5 border border-white/10 text-white font-bold px-12 py-5 rounded-full text-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 uppercase tracking-tight text-center"
                        >
                            🏠 Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
