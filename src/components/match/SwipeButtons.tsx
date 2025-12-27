"use client";

interface SwipeButtonsProps {
    onPass: () => void;
    onLike: () => void;
    onSuperLike: () => void;
    disabled?: boolean;
}

export function SwipeButtons({
    onPass,
    onLike,
    onSuperLike,
    disabled = false,
}: SwipeButtonsProps) {
    return (
        <div className="flex items-center justify-center gap-6">
            {/* Pass Button */}
            <button
                onClick={onPass}
                disabled={disabled}
                className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center group"
                aria-label="Pass"
            >
                <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-red-500 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            {/* Super Like Button */}
            <button
                onClick={onSuperLike}
                disabled={disabled}
                className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center group"
                aria-label="Super Like"
            >
                <svg
                    className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </button>

            {/* Like Button */}
            <button
                onClick={onLike}
                disabled={disabled}
                className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center group"
                aria-label="Like"
            >
                <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-green-500 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            </button>
        </div>
    );
}
