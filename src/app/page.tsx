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
        <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-netflix-black/20 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center scale-105 blur-[3px] opacity-30"></div>

          <div className="relative z-20 max-w-6xl mx-auto text-center px-6">
            <h1 className="font-bebas text-7xl md:text-9xl mb-4 tracking-tighter text-white drop-shadow-2xl animate-fade-in">
              BIGGER. BETTER. <span className="text-netflix-red">GETFLIX.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
              The future of movie matching is here. Connect, swipe, and find your next obsession in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/match"
                className="bg-netflix-red text-white font-black px-12 py-5 rounded-full text-xl hover:bg-netflix-red-dark transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(229,9,20,0.6)] uppercase tracking-tight"
              >
                🎬 Start Matching
              </Link>
              <Link
                href="#trending"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-12 py-5 rounded-full text-xl hover:bg-white/20 transition-all duration-300 uppercase tracking-tight flex items-center justify-center"
              >
                Explore Movies
              </Link>
            </div>
          </div>
        </section>

        {/* Movies Section */}
        <section id="trending" className="max-w-[1800px] mx-auto px-6 py-12 relative z-20 -mt-20">
          {!searchQuery && (
            <div className="pb-8">
              <h2 className="text-4xl font-bebas tracking-wide text-white mb-2">
                Trending Now
              </h2>
              <div className="w-24 h-1.5 bg-netflix-red rounded-full"></div>
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

