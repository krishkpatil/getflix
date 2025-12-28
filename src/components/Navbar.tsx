"use client";

import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "./SearchBar";

export function Navbar() {
    return (
        <nav className="w-full h-[70px] md:h-[90px] bg-black/90 backdrop-blur-xl transition-all duration-300 sticky top-0 z-[100] border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between h-full px-4 md:px-12 text-white">
                {/* Logo */}
                <Link href="/" className="inline-block group relative">
                    <Image
                        src="https://i.ibb.co/rKKqZ2yt/getflix-logo.png"
                        alt="GETFLIX"
                        width={160}
                        height={50}
                        className="h-10 md:h-12 w-auto transform group-hover:scale-110 transition-transform duration-500"
                        priority
                    />
                </Link>

                {/* Right side - Menu and Search */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-sm font-black uppercase tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-300 relative group"
                        >
                            Discover
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-netflix-red transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="/match"
                            className="text-sm font-black uppercase tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-300 relative group"
                        >
                            Match
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-netflix-red transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <Link
                        href="/match"
                        className="md:hidden bg-netflix-red text-white font-black px-4 py-2 rounded-full text-xs uppercase tracking-tight hover:bg-netflix-red-dark transition-all"
                    >
                        Match
                    </Link>

                    {/* SearchBar - Desktop only */}
                    <div className="hidden lg:block w-64">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </nav>
    );
}
