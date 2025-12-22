"use client";

import { useEffect, useState } from "react";

export default function UrgencyBar() {
    const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({
        d: 0,
        h: 0,
        m: 0,
        s: 0,
    });

    useEffect(() => {
        // Set target date to 3 days from now for demo
        const target = new Date();
        target.setDate(target.getDate() + 3);

        const interval = setInterval(() => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                d: Math.floor(diff / (1000 * 60 * 60 * 24)),
                h: Math.floor((diff / (1000 * 60 * 60)) % 24),
                m: Math.floor((diff / 1000 / 60) % 60),
                s: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-mw-amber text-mw-black py-2 px-4 shadow-lg-up flex items-center justify-center gap-4 md:gap-8">
            <span className="font-bold uppercase tracking-widest text-xs md:text-sm hidden md:inline">
                Next Show: Indianapolis, IN
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
