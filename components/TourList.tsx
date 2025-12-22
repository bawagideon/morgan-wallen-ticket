"use client";

import { MapPin, Calendar, ArrowRight, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type Show = {
    id: string;
    tour_id: string;
    venue: string;
    city: string;
    state: string;
    date: string;
    ticket_link: string | null;
    status: 'available' | 'sold_out' | 'low_qty';
};

export default function TourList({ onOpenModal }: { onOpenModal: () => void }) {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const res = await fetch("/api/shows");
                if (!res.ok) throw new Error(`API Error: ${res.status}`);
                const data = await res.json();
                if (data.shows) {
                    setShows(data.shows);
                }
            } catch (error) {
                console.error("Failed to fetch shows:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShows();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
            day: date.toLocaleDateString("en-US", { day: "2-digit" })
        };
    };

    return (
        <section id="tour-dates" className="bg-mw-black py-20 px-4">
            <div className="mx-auto max-w-5xl">
                <h2 className="mb-12 text-center text-4xl font-bold uppercase text-white tracking-tight">
                    Upcoming Dates
                </h2>

                {loading ? (
                    <div className="text-center text-mw-grey">Loading tour dates...</div>
                ) : (
                    <div className="space-y-4">
                        {shows.map((show) => {
                            const { month, day } = formatDate(show.date);
                            return (
                                <div
                                    key={show.id}
                                    className="group flex flex-col md:flex-row items-center justify-between gap-6 border-b border-mw-zinc bg-mw-dark/50 p-6 transition-all hover:bg-mw-zinc/50 hover:border-mw-amber/50"
                                >
                                    {/* Date */}
                                    <div className="flex w-full md:w-auto flex-row md:flex-col items-center md:items-start gap-4 md:gap-1">
                                        <span className="text-2xl font-black text-white">{day}</span>
                                        <span className="text-sm font-bold uppercase text-mw-amber">{month}</span>
                                    </div>

                                    {/* Venue Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                                            {show.city}, {show.state}
                                        </h3>
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mt-1">
                                            <MapPin size={16} />
                                            <span className="text-sm">{show.venue}</span>
                                        </div>
                                    </div>

                                    {/* Status/CTA */}
                                    <div className="w-full md:w-auto">
                                        <button
                                            onClick={onOpenModal}
                                            disabled={show.status === "sold_out"}
                                            className={`w-full md:w-auto px-6 py-3 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2
                            ${show.status === "sold_out"
                                                    ? "bg-mw-zinc text-gray-500 cursor-not-allowed hidden" // Hidden on mobile, grey button logic below
                                                    : "bg-white text-black hover:bg-mw-amber hover:text-white"
                                                }`}
                                            // Override hidden for actual implementation logic matching standard
                                            style={show.status === 'sold_out' ? { pointerEvents: 'none', opacity: 0.5, backgroundColor: '#27272a', color: '#6b7280' } : {}}
                                        >
                                            {show.status === "sold_out" ? (
                                                <>
                                                    Sold Out <XCircle size={18} />
                                                </>
                                            ) : (
                                                <>
                                                    Buy Tickets <ArrowRight size={18} />
                                                </>
                                            )}
                                        </button>
                                        {show.status === "low_qty" && (
                                            <p className="mt-2 text-center text-xs font-bold text-red-500 uppercase animate-pulse">
                                                Selling Fast!
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
