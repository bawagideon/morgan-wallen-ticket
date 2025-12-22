import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1974&auto=format&fit=crop"
          alt="Morgan Wallen Concert Crowd"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mw-black via-mw-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <h2 className="mb-2 text-xl font-bold tracking-widest text-mw-amber uppercase md:text-2xl">
          The 2025 Tour
        </h2>
        <h1 className="mb-6 text-5xl font-extrabold uppercase tracking-tighter text-white sm:text-7xl md:text-9xl drop-shadow-xl">
          One Night <br /> At A Time
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-300 md:text-xl font-medium">
          Experience the biggest country music event of the year. Live in your city.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => document.getElementById("tour-dates")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden rounded-none border-2 border-mw-amber bg-transparent px-8 py-4 text-lg font-bold uppercase tracking-widest text-mw-amber transition-all hover:bg-mw-amber hover:text-white"
          >
            <span className="relative z-10">Get Tickets</span>
          </button>
          <Link
            href="/meet-and-greet"
            className="group relative overflow-hidden rounded-none border-2 border-white bg-transparent px-8 py-4 text-lg font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
          >
            <span className="relative z-10">Meet & Greet</span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400">
        <ArrowDown size={32} />
      </div>
    </div>
  );
}
