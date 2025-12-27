import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function MatchPage() {
    return (
        <div className="min-h-screen bg-gray-200 dark:bg-background">
            <Navbar />

            <main className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-netflix-red via-netflix-red-dark to-black">
                <div className="max-w-6xl mx-auto px-6 py-20">
                    {/* Hero Section */}
                    <div className="text-center text-white mb-16">
                        <h1 className="font-bebas text-6xl md:text-8xl mb-6 tracking-wide">
                            Movie Matching
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                            Swipe through movies with a friend and discover what you both want to watch!
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white hover:bg-white/20 transition-all duration-300">
                            <div className="text-5xl mb-4">🎬</div>
                            <h3 className="font-bebas text-2xl mb-3">Create Session</h3>
                            <p className="opacity-90">
                                Choose your favorite genres and filters to create a personalized movie list
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white hover:bg-white/20 transition-all duration-300">
                            <div className="text-5xl mb-4">👆</div>
                            <h3 className="font-bebas text-2xl mb-3">Swipe Together</h3>
                            <p className="opacity-90">
                                Share the link with a friend and both swipe on the same movies
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white hover:bg-white/20 transition-all duration-300">
                            <div className="text-5xl mb-4">🎉</div>
                            <h3 className="font-bebas text-2xl mb-3">Find Matches</h3>
                            <p className="opacity-90">
                                See which movies you both liked and start watching together!
                            </p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            href="/match/create"
                            className="bg-white text-netflix-red font-bold px-10 py-5 rounded-full text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl w-full sm:w-auto text-center"
                        >
                            🚀 Create New Session
                        </Link>

                        <div className="text-white text-lg">or</div>

                        <div className="w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Enter session code..."
                                className="bg-white/20 backdrop-blur-lg border-2 border-white/30 text-white placeholder:text-white/60 px-6 py-4 rounded-full text-lg focus:outline-none focus:border-white/60 transition-all w-full"
                            />
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="mt-20 bg-white/5 backdrop-blur-lg rounded-2xl p-10 text-white">
                        <h2 className="font-bebas text-4xl mb-8 text-center">How It Works</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    1
                                </div>
                                <p className="font-semibold mb-2">Select Genres</p>
                                <p className="text-sm opacity-80">Choose movie categories you like</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    2
                                </div>
                                <p className="font-semibold mb-2">Share Link</p>
                                <p className="text-sm opacity-80">Send the session to your friend</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    3
                                </div>
                                <p className="font-semibold mb-2">Swipe Movies</p>
                                <p className="text-sm opacity-80">Both swipe left or right on movies</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    4
                                </div>
                                <p className="font-semibold mb-2">View Matches</p>
                                <p className="text-sm opacity-80">See movies you both liked!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
