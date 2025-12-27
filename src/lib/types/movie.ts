export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    genre_ids: number[];
    popularity: number;
    adult: boolean;
    original_language: string;
    original_title: string;
    video: boolean;
}

export interface MovieDetails extends Movie {
    genres: Genre[];
    runtime: number;
    budget: number;
    revenue: number;
    status: string;
    tagline: string;
    homepage: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface TMDBResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

// Matching Feature Types
export type SwipeAction = "like" | "pass" | "superlike";

export interface UserSwipe {
    movieId: number;
    action: SwipeAction;
    timestamp: number;
}

export interface SessionFilters {
    genres: number[];
    yearRange: [number, number];
    minRating: number;
    movieCount: number;
}

export interface MatchSession {
    id: string;
    createdBy: string;
    createdAt: number;
    movies: Movie[];
    filters: SessionFilters;
    participants: string[];
    status: "active" | "completed";
}

export interface UserSwipes {
    userId: string;
    sessionId: string;
    swipes: Record<number, SwipeAction>; // movieId -> action
    completedAt?: number;
}

export interface MatchResult {
    movie: Movie;
    user1Action: SwipeAction;
    user2Action: SwipeAction;
    matchType: "both-like" | "one-superlike" | "both-superlike";
}

export interface SessionStats {
    totalMovies: number;
    matchCount: number;
    matchPercentage: number;
    user1Likes: number;
    user2Likes: number;
    user1SuperLikes: number;
    user2SuperLikes: number;
}

// UI State Types
export interface SwipeCardState {
    currentIndex: number;
    isAnimating: boolean;
    direction: "left" | "right" | null;
}

// Rating color helper type
export type RatingColor = "green" | "orange" | "red";
