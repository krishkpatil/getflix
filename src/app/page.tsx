import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MovieGrid } from "@/components/MovieGrid";
import { getPopularMovies, searchMovies } from "@/lib/tmdb";

interface HomeProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const searchQuery = params.search;

  // Fetch movies based on search or show popular movies
  const moviesData = searchQuery
    ? await searchMovies(searchQuery)
    : await getPopularMovies();

  return (
    <div className="min-h-screen bg-netflix-black transition-colors duration-300">
      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-netflix-black/60 to-netflix-black z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center scale-110 blur-[1px] opacity-40 animate-pulse-slow"></div>

          <div className="relative z-20 max-w-6xl mx-auto text-center px-6">
            <h1 className="font-bebas text-8xl md:text-[10rem] mb-2 tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-fade-in leading-none">
              GETFLIX
            </h1>
            <p className="text-xl md:text-3xl mb-12 text-gray-200 max-w-3xl mx-auto font-black uppercase tracking-[0.2em] drop-shadow-lg">
              Next-Gen Movie Matching
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link
                href="/match"
                className="bg-netflix-red text-white font-black px-14 py-6 rounded-full text-2xl hover:bg-netflix-red-dark transition-all duration-500 hover:scale-110 shadow-[0_0_50px_rgba(229,9,20,0.7)] uppercase tracking-tighter"
              >
                🎬 Start Matching
              </Link>
              <Link
                href="#trending"
                className="bg-white/5 backdrop-blur-xl text-white border border-white/20 font-black px-14 py-6 rounded-full text-2xl hover:bg-white/10 transition-all duration-500 uppercase tracking-tighter flex items-center justify-center"
              >
                Explore
              </Link>
            </div>
          </div>
        </section>

        {/* Movies Section Transition Overlay */}
        <div className="h-32 bg-gradient-to-t from-netflix-black to-transparent -mt-32 relative z-10"></div>

        {/* Movies Section */}
        <section id="trending" className="max-w-[1800px] mx-auto px-6 py-20 relative z-20 bg-netflix-black">
          {!searchQuery && (
            <div className="pb-12 text-center">
              <h2 className="text-6xl font-bebas tracking-tighter text-white mb-4">
                Trending Now
              </h2>
              <div className="w-24 h-2 bg-netflix-red mx-auto rounded-full shadow-[0_0_15px_rgba(229,9,20,0.8)]"></div>
            </div>
          )}
          <MovieGrid movies={moviesData.results} />
        </section>

        {/* CTA Section */}
        <section className="bg-[#080808] border-y border-white/5 text-white py-24 px-6 mt-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bebas text-5xl md:text-6xl mb-6 tracking-tight">
              Ready to find your match?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-400 font-light">
              Join thousands of others and find the perfect movie night. No more endless scrolling.
            </p>
            <Link
              href="/match"
              className="inline-block bg-white text-black font-black px-12 py-5 rounded-full text-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-2xl uppercase tracking-tight"
            >
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

