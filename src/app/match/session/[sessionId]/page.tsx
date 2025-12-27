"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { SwipeCard } from "@/components/match/SwipeCard";
import { SwipeButtons } from "@/components/match/SwipeButtons";
import { getSession, saveSwipe, getUserSwipes } from "@/lib/firebase/sessions";
import { getSessionUrl } from "@/lib/utils/session";
import type { MatchSession, SwipeAction } from "@/lib/types/movie";

export default function SwipeSessionPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const sessionId = params.sessionId as string;
    const userId = searchParams.get("userId");

    const [session, setSession] = useState<MatchSession | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showShareDialog, setShowShareDialog] = useState(false);

    useEffect(() => {
        const initializeUser = async () => {
            let currentUserId = userId;

            // 1. If no userId in URL, generate one and update URL
            if (!currentUserId) {
                const { nanoid } = await import("nanoid");
                currentUserId = nanoid(8);
                const newUrl = `${window.location.pathname}?userId=${currentUserId}`;
                window.history.replaceState({ path: newUrl }, "", newUrl);
            }

            // 2. Load session
            const data = await getSession(sessionId);
            if (!data) {
                alert("Session not found!");
                router.push("/match");
                return;
            }

            setSession(data);

            // 3. Add user to session if they are not already a participant
            if (!data.participants.includes(currentUserId)) {
                const { addUserToSession } = await import("@/lib/firebase/sessions");
                await addUserToSession(sessionId, currentUserId);
            }

            // 4. Check if user has already completed this session
            const swipes = await getUserSwipes(sessionId, currentUserId);
            if (swipes && swipes.completedAt) {
                router.push(`/match/results/${sessionId}?userId=${currentUserId}`);
            } else {
                setIsLoading(false);
            }
        };

        initializeUser();
    }, [sessionId, userId, router]);

    const handleSwipe = async (direction: "left" | "right", action?: SwipeAction) => {
        if (!session || !userId) return;

        const movie = session.movies[currentIndex];
        const swipeAction: SwipeAction = action || (direction === "right" ? "like" : "pass");

        // Save swipe
        await saveSwipe(sessionId, userId, movie.id, swipeAction);

        // Move to next movie
        if (currentIndex < session.movies.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Session complete
            router.push(`/match/results/${sessionId}?userId=${userId}`);
        }
    };

    const copyShareLink = () => {
        const link = getSessionUrl(sessionId);
        navigator.clipboard.writeText(link);
        alert("Link copied to clipboard!");
    };

    if (isLoading || !session) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-netflix-red mx-auto mb-4"></div>
                    <p className="text-xl text-gray-400">Loading session...</p>
                </div>
            </div>
        );
    }

    const progress = ((currentIndex + 1) / session.movies.length) * 100;
    const currentMovie = session.movies[currentIndex];
    const nextMovie = session.movies[currentIndex + 1];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="min-h-[calc(100vh-90px)] bg-gradient-to-b from-black via-[#080808] to-black py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Progress Bar */}
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-black uppercase tracking-widest text-netflix-red">
                                Movie {currentIndex + 1} of {session.movies.length}
                            </span>
                            <button
                                onClick={() => setShowShareDialog(true)}
                                className="text-xs font-bold bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10 transition-all uppercase tracking-tight flex items-center gap-2"
                            >
                                <span>📤</span> Share Session
                            </button>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
                            <div
                                className="bg-netflix-red h-full transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(229,9,20,0.5)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Swipe Cards */}
                    <div className="relative h-[600px] flex items-center justify-center mb-8">
                        {nextMovie && (
                            <SwipeCard
                                key={nextMovie.id}
                                movie={nextMovie}
                                onSwipe={() => { }}
                                isTop={false}
                            />
                        )}
                        <SwipeCard
                            key={currentMovie.id}
                            movie={currentMovie}
                            onSwipe={handleSwipe}
                            isTop={true}
                        />
                    </div>

                    {/* Swipe Buttons */}
                    <SwipeButtons
                        onPass={() => handleSwipe("left", "pass")}
                        onSuperLike={() => handleSwipe("right", "superlike")}
                        onLike={() => handleSwipe("right", "like")}
                    />

                    {/* Instructions */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-2">Swipe left to pass • Swipe right to like</p>
                        <p className="text-netflix-red/50 text-[10px] font-black uppercase tracking-[0.2em]">Premium Matching Active</p>
                    </div>
                </div>
            </main>

            {/* Share Dialog */}
            {showShareDialog && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-fade-in">
                    <div className="bg-[#121212] border border-white/10 rounded-3xl p-10 max-w-md w-full shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                        <h3 className="font-bebas text-5xl mb-6 text-white tracking-tight">
                            Share Session
                        </h3>
                        <p className="text-gray-400 mb-8 font-light leading-relaxed">
                            Send this link to your partner. Great movie nights start with a single click.
                        </p>
                        <div className="bg-black/50 p-5 rounded-2xl mb-10 break-all text-sm font-mono text-netflix-red border border-white/5">
                            {getSessionUrl(sessionId)}
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={copyShareLink}
                                className="flex-1 bg-netflix-red text-white font-black py-4 rounded-full hover:bg-netflix-red-dark transition-all duration-300 shadow-lg uppercase tracking-tight"
                            >
                                📋 Copy Link
                            </button>
                            <button
                                onClick={() => setShowShareDialog(false)}
                                className="flex-1 bg-white/5 text-white font-bold py-4 rounded-full hover:bg-white/10 transition-all duration-300 uppercase tracking-tight"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
