"use client";

import { useState } from "react";
import TourList from "@/components/TourList";
import TicketModal from "@/components/TicketModal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GetTicketsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-mw-black">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-mw-dark/95 backdrop-blur border-b border-mw-zinc py-4 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-mw-grey hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                    <span className="font-bold uppercase text-sm tracking-widest">Back</span>
                </Link>
                <h1 className="font-extrabold uppercase tracking-tighter text-white text-xl">
                    Tour Dates
                </h1>
                <div className="w-16" /> {/* Spacer */}
            </header>

            <div className="relative">
                {/* Reusing the background image as a subtle texture */}
                <div
                    className="absolute inset-0 z-0 opacity-10 pointer-events-none fixed"
                    style={{ backgroundImage: "url('/background-mw.png')" }}
                />

                <div className="relative z-10 pt-10 pb-20">
                    <TourList onOpenModal={() => setIsModalOpen(true)} />
                </div>
            </div>

            <TicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
