import type { Movie, Genre, TMDBResponse, MovieDetails } from "./types/movie";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
export const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

if (!API_KEY || !BASE_URL) {
    throw new Error("TMDB API configuration is missing");
}

/**
 * Fetch popular movies
 */
export async function getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    const url = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`;
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
        throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Search for movies
 */
export async function searchMovies(query: string, page: number = 1): Promise<TMDBResponse<Movie>> {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
        throw new Error(`Failed to search movies: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Get movies by genre
 */
export async function getMoviesByGenre(
    genreIds: number[],
    page: number = 1,
    yearRange?: [number, number],
    minRating?: number,
    language?: string,
    region?: string
): Promise<TMDBResponse<Movie>> {
    const params = new URLSearchParams({
        api_key: API_KEY!,
        with_genres: genreIds.length > 0 ? genreIds.join(",") : "",
        sort_by: "popularity.desc",
        page: page.toString(),
    });

    if (yearRange) {
        params.append("primary_release_date.gte", `${yearRange[0]}-01-01`);
        params.append("primary_release_date.lte", `${yearRange[1]}-12-31`);
    }

    if (minRating) {
        params.append("vote_average.gte", minRating.toString());
        params.append("vote_count.gte", "100");
    }

    if (language) {
        params.append("with_original_language", language);
    }

    if (region) {
        params.append("region", region);
    }

    const url = `${BASE_URL}/discover/movie?${params.toString()}`;
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Get all available genres
 */
export async function getGenres(): Promise<Genre[]> {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache for 24 hours

    if (!response.ok) {
        throw new Error(`Failed to fetch genres: ${response.statusText}`);
    }

    const data = await response.json();
    return data.genres;
}

/**
 * Get movie details by ID
 */
export async function getMovieDetails(movieId: number | string): Promise<MovieDetails> {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
        throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Get poster URL for a movie
 */
export function getPosterUrl(posterPath: string | null, size: "w500" | "w780" | "original" = "w500"): string {
    if (!posterPath) {
        return "/placeholder-movie.png"; // We'll create a placeholder
    }
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}

/**
 * Get backdrop URL for a movie
 */
export function getBackdropUrl(backdropPath: string | null, size: "w780" | "w1280" | "original" = "w1280"): string {
    if (!backdropPath) {
        return "/placeholder-backdrop.png";
    }
    return `https://image.tmdb.org/t/p/${size}${backdropPath}`;
}
