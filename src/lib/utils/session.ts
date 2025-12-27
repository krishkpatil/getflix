import { nanoid } from "nanoid";

/**
 * Generate a unique session ID
 * @returns A URL-safe unique identifier
 */
export function generateSessionId(): string {
    return nanoid(12); // 12 characters for a good balance of uniqueness and brevity
}

/**
 * Generate a shareable session URL
 * @param sessionId - The session identifier
 * @returns Full URL to the session
 */
export function getSessionUrl(sessionId: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return `${baseUrl}/match/session/${sessionId}`;
}
