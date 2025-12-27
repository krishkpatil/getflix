import type { Metadata } from "next";
import { Poppins, Bebas_Neue } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Getflix - Discover & Match Movies",
  description: "Discover popular movies and find perfect matches with friends using our Tinder-style movie matching feature",
  keywords: ["movies", "TMDB", "movie discovery", "movie matching", "watch together"],
  authors: [{ name: "Getflix" }],
  openGraph: {
    title: "Getflix - Discover & Match Movies",
    description: "Find your next movie to watch with friends",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

