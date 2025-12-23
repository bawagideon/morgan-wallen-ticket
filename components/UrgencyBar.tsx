"use client";

import { useEffect, useState } from "react";

export default function UrgencyBar() {
    const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({
        d: 0,
        h: 0,
        m: 0,
        s: 0,
    });

    const [viewers, setViewers] = useState(420);

    useEffect(() => {
        // Randomize initial viewers between 420 and 550
        setViewers(Math.floor(Math.random() * (550 - 420 + 1)) + 420);

        const fetchNextShow = async () => {
            try {
                const res = await fetch("/api/shows/next");
                if (!res.ok) return;

                const data = await res.json();
                if (data.date) {
                    const showDate = new Date(data.date).getTime();

                    const interval = setInterval(() => {
                        const now = new Date().getTime();
                        const distance = showDate - now;

                        if (distance < 0) {
                            clearInterval(interval);
                            setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
                        } else {
                            setTimeLeft({
                                d: Math.floor(distance / (1000 * 60 * 60 * 24)),
                                h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                                m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                                s: Math.floor((distance % (1000 * 60)) / 1000),
                            });
                        }
                    }, 1000);

                    return () => clearInterval(interval);
                }
            } catch (error) {
                console.error("Failed to fetch next show for bar:", error);
            }
        };

        fetchNextShow();
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-mw-amber text-mw-black py-2 px-4 shadow-lg-up flex items-center justify-center gap-4 md:gap-8">
            <span className="font-bold uppercase tracking-widest text-xs md:text-sm hidden md:inline">
                Next Show: Indianapolis, IN
            </span>
            <span className="font-bold uppercase tracking-widest text-xs md:text-sm text-red-500 animate-pulse">
                High Demand: {viewers} people viewing
            </span>
            <div className="flex gap-4 font-mono font-bold text-lg md:text-xl">
                <div className="flex flex-col items-center leading-none">
                    <span>{String(timeLeft.d).padStart(2, "0")}</span>
                    <span className="text-[10px] uppercase font-sans opacity-60">Days</span>
                </div>
                <span className="opacity-50">:</span>
                <div className="flex flex-col items-center leading-none">
                    <span>{String(timeLeft.h).padStart(2, "0")}</span>
                    <span className="text-[10px] uppercase font-sans opacity-60">Hrs</span>
                </div>
                <span className="opacity-50">:</span>
                <div className="flex flex-col items-center leading-none">
                    <span>{String(timeLeft.m).padStart(2, "0")}</span>
                    <span className="text-[10px] uppercase font-sans opacity-60">Mins</span>
                </div>
                <span className="opacity-50">:</span>
                <div className="flex flex-col items-center leading-none">
                    <span>{String(timeLeft.s).padStart(2, "0")}</span>
                    <span className="text-[10px] uppercase font-sans opacity-60">Secs</span>
                </div>
            </div>
            <button className="bg-mw-black text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gray-900 transition-colors">
                View Info
            </button>
        </div>
    );
}
