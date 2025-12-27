import type { RatingColor } from "../types/movie";

/**
 * Get color class based on movie rating
 * @param rating - Movie rating (0-10)
 * @returns Color identifier for styling
 */
export function getRatingColor(rating: number): RatingColor {
    if (rating >= 8) return "green";
    if (rating >= 5) return "orange";
    return "red";
}

/**
 * Format rating for display
 * @param rating - Movie rating
 * @returns Formatted rating string
 */
export function formatRating(rating: number): string {
    return rating.toFixed(1);
}
