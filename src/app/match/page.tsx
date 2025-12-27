import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function MatchPage() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            <main className="min-h-[calc(100vh-90px)]">
                {/* Hero Section with Cinematic Background */}
                <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-netflix-red/20 to-black z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070')] bg-cover bg-center opacity-20 scale-110 blur-sm"></div>

                    <div className="relative z-20 max-w-5xl mx-auto text-center px-6">
                        <h1 className="font-bebas text-7xl md:text-9xl mb-6 tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-none">
                            MOVIE MATCHING
                        </h1>
                        <p className="text-xl md:text-3xl text-gray-200 max-w-3xl mx-auto font-light mb-12 leading-relaxed">
                            Swipe. Match. Watch together. The future of choosing movies with friends.
                        </p>
                        <Link
                            href="/match/create"
                            className="inline-block bg-netflix-red text-white font-black px-16 py-6 rounded-full text-2xl hover:bg-netflix-red-dark transition-all duration-500 hover:scale-110 shadow-[0_0_50px_rgba(229,9,20,0.7)] uppercase tracking-tighter"
                        >
                            🎬 Start Matching
                        </Link>
                    </div>
                </section>

                {/* Transition */}
                <div className="h-32 bg-gradient-to-t from-black to-transparent -mt-32 relative z-10"></div>

                {/* Features Section */}
                <section className="bg-black py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-bebas text-6xl text-center text-white mb-20 tracking-tighter">
                            How It <span className="text-netflix-red">Works</span>
                        </h2>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                {
                                    icon: "🎯",
                                    title: "Create Session",
                                    desc: "Choose genres, timeframe, and region. We'll curate the perfect movie list for you."
                                },
                                {
                                    icon: "💫",
                                    title: "Swipe Together",
                                    desc: "Share the link. Both swipe on the same movies. Like Tinder, but for films."
                                },
                                {
                                    icon: "🎉",
                                    title: "Instant Matches",
                                    desc: "See what you both loved. No more endless debates. Just pure cinema."
                                }
                            ].map((feature, i) => (
                                <div key={i} className="group bg-[#121212] border border-white/5 rounded-3xl p-10 hover:border-netflix-red/50 transition-all duration-500 hover:scale-105">
                                    <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                                    <h3 className="font-bebas text-4xl text-white mb-4 tracking-tight">{feature.title}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed font-light">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-gradient-to-b from-black via-[#080808] to-black py-24 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { num: "10K+", label: "Movies" },
                                { num: "500+", label: "Sessions" },
                                { num: "95%", label: "Match Rate" },
                                { num: "< 2min", label: "Avg Time" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="font-bebas text-5xl md:text-6xl text-netflix-red mb-2">{stat.num}</div>
                                    <div className="text-gray-500 uppercase text-xs tracking-[0.3em] font-black">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-black py-32 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-bebas text-7xl md:text-8xl text-white mb-8 tracking-tighter leading-none">
                            Ready to Find Your <span className="text-netflix-red">Perfect Match?</span>
                        </h2>
                        <p className="text-2xl text-gray-400 mb-16 font-light">
                            No more scrolling for hours. Start matching in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link
                                href="/match/create"
                                className="bg-netflix-red text-white font-black px-14 py-6 rounded-full text-2xl hover:bg-netflix-red-dark transition-all duration-500 hover:scale-110 shadow-[0_0_50px_rgba(229,9,20,0.7)] uppercase tracking-tighter"
                            >
                                Create Session
                            </Link>
                            <Link
                                href="/"
                                className="bg-white/5 border border-white/10 text-white font-black px-14 py-6 rounded-full text-2xl hover:bg-white/10 transition-all duration-500 uppercase tracking-tighter"
                            >
                                Browse Movies
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
