import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    collection,
    query,
    where,
    getDocs,
    serverTimestamp
} from "firebase/firestore";
import { db } from "./config";
import type { MatchSession, UserSwipes, SwipeAction } from "../types/movie";
import { generateSessionId } from "../utils/session";

/**
 * Create a new matching session
 */
export async function createSession(session: Omit<MatchSession, "id">): Promise<MatchSession> {
    const id = generateSessionId();
    const sessionData: MatchSession = {
        ...session,
        id,
    };

    const docRef = doc(db, "sessions", id);
    await setDoc(docRef, {
        ...sessionData,
        createdAt: serverTimestamp(),
    });

    return sessionData;
}

/**
 * Get a session by ID
 */
export async function getSession(sessionId: string): Promise<MatchSession | null> {
    const docRef = doc(db, "sessions", sessionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        // Convert Firestore timestamp to number if needed
        return {
            ...data,
            createdAt: data.createdAt?.toMillis?.() || data.createdAt || Date.now(),
        } as MatchSession;
    }

    return null;
}

/**
 * Add a user to a session
 */
export async function addUserToSession(sessionId: string, userId: string): Promise<void> {
    const docRef = doc(db, "sessions", sessionId);
    await updateDoc(docRef, {
        participants: arrayUnion(userId),
    });
}

/**
 * Save a user's swipe
 */
export async function saveSwipe(
    sessionId: string,
    userId: string,
    movieId: number,
    action: SwipeAction
): Promise<void> {
    const swipeId = `${sessionId}_${userId}`;
    const docRef = doc(db, "swipes", swipeId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        await updateDoc(docRef, {
            [`swipes.${movieId}`]: action,
        });
    } else {
        await setDoc(docRef, {
            userId,
            sessionId,
            swipes: {
                [movieId]: action,
            },
        });
    }
}

/**
 * Get user swipes for a session
 */
export async function getUserSwipes(sessionId: string, userId: string): Promise<UserSwipes | null> {
    const swipeId = `${sessionId}_${userId}`;
    const docRef = doc(db, "swipes", swipeId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as UserSwipes;
    }

    return null;
}

/**
 * Mark session as completed
 */
export async function completeSession(sessionId: string): Promise<void> {
    const docRef = doc(db, "sessions", sessionId);
    await updateDoc(docRef, {
        status: "completed",
    });
}

/**
 * Get matches for a session
 */
export async function getMatches(sessionId: string): Promise<{
    user1Swipes: Record<number, SwipeAction>;
    user2Swipes: Record<number, SwipeAction>;
} | null> {
    const session = await getSession(sessionId);
    if (!session || session.participants.length < 2) {
        return null;
    }

    const user1Swipes = await getUserSwipes(sessionId, session.participants[0]);
    const user2Swipes = await getUserSwipes(sessionId, session.participants[1]);

    if (!user1Swipes || !user2Swipes) {
        return null;
    }

    return {
        user1Swipes: user1Swipes.swipes,
        user2Swipes: user2Swipes.swipes,
    };
}
