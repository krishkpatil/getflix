import { create } from "zustand";
import type { Movie, SwipeAction, MatchSession } from "../types/movie";

interface SessionStore {
    currentSession: MatchSession | null;
    currentMovieIndex: number;
    userSwipes: Record<number, SwipeAction>;
    isAnimating: boolean;
    swipeDirection: "left" | "right" | null;

    setSession: (session: MatchSession) => void;
    swipeMovie: (movieId: number, action: SwipeAction) => void;
    nextMovie: () => void;
    setAnimating: (animating: boolean) => void;
    setSwipeDirection: (direction: "left" | "right" | null) => void;
    resetSession: () => void;
    isSessionComplete: () => boolean;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
    currentSession: null,
    currentMovieIndex: 0,
    userSwipes: {},
    isAnimating: false,
    swipeDirection: null,

    setSession: (session) =>
        set({
            currentSession: session,
            currentMovieIndex: 0,
            userSwipes: {},
        }),

    swipeMovie: (movieId, action) =>
        set((state) => ({
            userSwipes: {
                ...state.userSwipes,
                [movieId]: action,
            },
        })),

    nextMovie: () =>
        set((state) => ({
            currentMovieIndex: state.currentMovieIndex + 1,
            swipeDirection: null,
        })),

    setAnimating: (animating) => set({ isAnimating: animating }),

    setSwipeDirection: (direction) => set({ swipeDirection: direction }),

    resetSession: () =>
        set({
            currentSession: null,
            currentMovieIndex: 0,
            userSwipes: {},
            isAnimating: false,
            swipeDirection: null,
        }),

    isSessionComplete: () => {
        const state = get();
        return (
            state.currentSession !== null &&
            state.currentMovieIndex >= state.currentSession.movies.length
        );
    },
}));
