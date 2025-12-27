import { create } from "zustand";
import type { Movie } from "../types/movie";

interface MovieStore {
    movies: Movie[];
    searchResults: Movie[];
    isLoading: boolean;
    error: string | null;
    currentPage: number;
    setMovies: (movies: Movie[]) => void;
    addMovies: (movies: Movie[]) => void;
    setSearchResults: (results: Movie[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setPage: (page: number) => void;
    clearSearch: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
    movies: [],
    searchResults: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    setMovies: (movies) => set({ movies }),
    addMovies: (movies) => set((state) => ({ movies: [...state.movies, ...movies] })),
    setSearchResults: (results) => set({ searchResults: results }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    setPage: (page) => set({ currentPage: page }),
    clearSearch: () => set({ searchResults: [] }),
}));
