"use client";

import { MapPin, Calendar, ArrowRight } from "lucide-react";

const TOUR_DATES = [
    { id: 1, date: "APR 14", city: "Indianapolis, IN", venue: "Lucas Oil Stadium", status: "limited" },
    { id: 2, date: "APR 20", city: "Oxford, MS", venue: "Vaught-Hemingway Stadium", status: "sold-out" },
    { id: 3, date: "MAY 02", city: "Nashville, TN", venue: "Nissan Stadium", status: "available" },
    { id: 4, date: "MAY 03", city: "Nashville, TN", venue: "Nissan Stadium", status: "selling-fast" },
    { id: 5, date: "MAY 18", city: "East Rutherford, NJ", venue: "MetLife Stadium", status: "available" },
];

export default function TourList({ onOpenModal }: { onOpenModal: () => void }) {
    return (
        <section id="tour-dates" className="bg-mw-black py-20 px-4">
            <div className="mx-auto max-w-5xl">
                <h2 className="mb-12 text-center text-4xl font-bold uppercase text-white tracking-tight">
                    Upcoming Dates
                </h2>

                <div className="space-y-4">
                    {TOUR_DATES.map((show) => (
                        <div
                            key={show.id}
                            className="group flex flex-col md:flex-row items-center justify-between gap-6 border-b border-mw-zinc bg-mw-dark/50 p-6 transition-all hover:bg-mw-zinc/50 hover:border-mw-amber/50"
                        >
                            {/* Date */}
                            <div className="flex w-full md:w-auto flex-row md:flex-col items-center md:items-start gap-4 md:gap-1">
                                <span className="text-2xl font-black text-white">{show.date.split(" ")[1]}</span>
                                <span className="text-sm font-bold uppercase text-mw-amber">{show.date.split(" ")[0]}</span>
                            </div>

                            {/* Venue Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                                    {show.city}
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
                                    disabled={show.status === "sold-out"}
                                    className={`w-full md:w-auto px-6 py-3 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2
                    ${show.status === "sold-out"
                                            ? "bg-mw-zinc text-gray-500 cursor-not-allowed"
                                            : "bg-white text-black hover:bg-mw-amber hover:text-white"
                                        }`}
                                >
                                    {show.status === "sold-out" ? "Sold Out" : "Buy Tickets"}
                                    {show.status !== "sold-out" && <ArrowRight size={18} />}
                                </button>
                                {show.status === "selling-fast" && (
                                    <p className="mt-2 text-center text-xs font-bold text-red-500 uppercase animate-pulse">
                                        Selling Fast!
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
