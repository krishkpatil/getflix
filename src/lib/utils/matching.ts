import type { MatchResult, SessionStats, SwipeAction } from "../types/movie";

/**
 * Calculate match percentage between two users
 * @param user1Swipes - First user's swipes
 * @param user2Swipes - Second user's swipes
 * @returns Match percentage (0-100)
 */
export function calculateMatchPercentage(
    user1Swipes: Record<number, SwipeAction>,
    user2Swipes: Record<number, SwipeAction>
): number {
    const movieIds = Object.keys(user1Swipes).map(Number);
    if (movieIds.length === 0) return 0;

    const matches = movieIds.filter((id) => {
        const action1 = user1Swipes[id];
        const action2 = user2Swipes[id];
        return (
            action1 &&
            action2 &&
            (action1 === "like" || action1 === "superlike") &&
            (action2 === "like" || action2 === "superlike")
        );
    });

    return Math.round((matches.length / movieIds.length) * 100);
}

/**
 * Get matched movies from two users' swipes
 * @param user1Swipes - First user's swipes
 * @param user2Swipes - Second user's swipes
 * @returns Array of movie IDs that both users liked
 */
export function getMatches(
    user1Swipes: Record<number, SwipeAction>,
    user2Swipes: Record<number, SwipeAction>
): number[] {
    const movieIds = Object.keys(user1Swipes).map(Number);

    return movieIds.filter((id) => {
        const action1 = user1Swipes[id];
        const action2 = user2Swipes[id];
        return (
            action1 &&
            action2 &&
            (action1 === "like" || action1 === "superlike") &&
            (action2 === "like" || action2 === "superlike")
        );
    });
}

/**
 * Calculate session statistics
 * @param user1Swipes - First user's swipes
 * @param user2Swipes - Second user's swipes
 * @returns Session statistics
 */
export function calculateSessionStats(
    user1Swipes: Record<number, SwipeAction>,
    user2Swipes: Record<number, SwipeAction>
): SessionStats {
    const movieIds = Object.keys(user1Swipes).map(Number);
    const matches = getMatches(user1Swipes, user2Swipes);

    const user1Likes = movieIds.filter(
        (id) => user1Swipes[id] === "like" || user1Swipes[id] === "superlike"
    ).length;

    const user2Likes = movieIds.filter(
        (id) => user2Swipes[id] === "like" || user2Swipes[id] === "superlike"
    ).length;

    const user1SuperLikes = movieIds.filter(
        (id) => user1Swipes[id] === "superlike"
    ).length;

    const user2SuperLikes = movieIds.filter(
        (id) => user2Swipes[id] === "superlike"
    ).length;

    return {
        totalMovies: movieIds.length,
        matchCount: matches.length,
        matchPercentage: calculateMatchPercentage(user1Swipes, user2Swipes),
        user1Likes,
        user2Likes,
        user1SuperLikes,
        user2SuperLikes,
    };
}
