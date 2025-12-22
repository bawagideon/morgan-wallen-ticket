"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const fetchNextShow = async () => {
      try {
        const res = await fetch("/api/shows/next");
        if (!res.ok) {
          console.error("API Error: ", res.status, res.statusText);
          return;
        }
        const data = await res.json();
        if (data.date) {
          const showDate = new Date(data.date).getTime();

          const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = showDate - now;

            if (distance < 0) {
              clearInterval(interval);
              setTimeLeft(null);
            } else {
              setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
              });
            }
          }, 1000);

          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error("Failed to fetch next show:", error);
      }
    };

    fetchNextShow();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden pb-16 md:pb-0">
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
          The 2026 Tour
        </h2>
        <h1 className="mb-6 text-5xl font-extrabold uppercase tracking-tighter text-white sm:text-7xl md:text-9xl drop-shadow-xl">
          One Night <br /> At A Time
        </h1>

        {timeLeft && (
          <div className="mb-8 flex gap-4 md:gap-8 text-white">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-black font-mono text-mw-amber">{timeLeft.days}</span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-gray-400">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-black font-mono text-mw-amber">{timeLeft.hours}</span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-gray-400">Hrs</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-black font-mono text-mw-amber">{timeLeft.minutes}</span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-gray-400">Mins</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-black font-mono text-mw-amber">{timeLeft.seconds}</span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-gray-400">Secs</span>
            </div>
          </div>
        )}

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
