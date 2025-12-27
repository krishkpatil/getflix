"use client";

import Link from "next/link";
import { SearchBar } from "./SearchBar";

export function Navbar() {
    return (
        <nav className="w-full h-[90px] bg-black/90 backdrop-blur-xl transition-all duration-300 sticky top-0 z-[100] border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center h-full px-4 md:px-12 text-white">
                {/* Logo */}
                <div className="flex-1 mt-1">
                    <Link href="/" className="inline-block group relative">
                        {/* Custom Arched Logo using SVG textPath */}
                        <svg width="180" height="45" viewBox="0 0 180 45" className="transform group-hover:scale-110 transition-transform duration-500">
                            <defs>
                                <path id="arch" d="M 0,40 Q 90,20 180,40" />
                            </defs>
                            <text className="font-bebas text-[38px] fill-netflix-red tracking-tight"
                                style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.8))" }}>
                                <textPath href="#arch" startOffset="50%" textAnchor="middle">
                                    GETFLIX
                                </textPath>
                            </text>
                        </svg>
                        <div className="absolute -bottom-1 left-0 w-full h-1 bg-netflix-red rounded-full blur-[2px] opacity-0 group-hover:opacity-40 transition-opacity"></div>
                    </Link>
                </div>

                {/* Menu */}
                <div className="hidden md:flex flex-[6] items-center gap-10">
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
                        Match Movies
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-netflix-red transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>

                {/* SearchBar */}
                <div className="flex-[2] hidden md:block">
                    <SearchBar />
                </div>
            </div>
        </nav>
    );
}
