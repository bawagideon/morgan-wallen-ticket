"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";
import { ArrowLeft, Ticket as TicketIcon } from "lucide-react";

type Ticket = {
    id: string;
    created_at: string;
    tier_id: string;
    ticket_tiers: {
        name: string;
        price: number;
    };
};

export default function MyTicketsPage() {
    const [email, setEmail] = useState("");
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setHasSearched(true);
        try {
            const res = await fetch("/api/tickets/my-tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (data.tickets) {
                setTickets(data.tickets);
            } else {
                setTickets([]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-mw-zinc text-white pt-20 pb-12 px-4">
            <div className="max-w-md mx-auto">
                <Link href="/" className="inline-flex items-center text-mw-amber mb-8 hover:underline">
                    <ArrowLeft size={16} className="mr-2" /> Back to Home
                </Link>

                <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">My Tickets</h1>
                <p className="text-gray-400 mb-8">Enter your email to view your purchased tickets.</p>

                <form onSubmit={handleSearch} className="mb-12">
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-mw-black border border-white/10 rounded p-4 text-white focus:outline-none focus:border-mw-amber"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-mw-amber text-black font-bold uppercase tracking-wider px-6 rounded hover:bg-mw-orange transition-colors disabled:opacity-50"
                        >
                            {loading ? "..." : "Find"}
                        </button>
                    </div>
                </form>

                {loading ? (
                    <div className="text-center animate-pulse text-gray-500">Searching...</div>
                ) : hasSearched && tickets.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-lg border border-dashed border-white/10">
                        <TicketIcon size={48} className="mx-auto text-gray-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-300">No Tickets Found</h3>
                        <p className="text-gray-500">We couldn't find any tickets linked to {email}.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className="bg-mw-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                                {/* Ticket Header */}
                                <div className="bg-mw-amber p-4">
                                    <h3 className="text-mw-black font-black uppercase tracking-tighter text-xl">
                                        Morgan Wallen
                                    </h3>
                                    <p className="text-mw-black/80 font-bold text-xs uppercase tracking-widest">
                                        One Night At A Time 2026
                                    </p>
                                </div>

                                {/* Body */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Section</p>
                                            <p className="font-bold text-xl text-white">{ticket.ticket_tiers.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date</p>
                                            <p className="font-bold text-white">May 02, 2026</p>
                                        </div>
                                    </div>

                                    {/* QR Code */}
                                    <div className="bg-white p-4 rounded-xl mx-auto w-fit mb-4">
                                        <QRCode value={ticket.id} size={150} />
                                    </div>
                                    <p className="text-center text-xs text-gray-500 font-mono">{ticket.id.split('-')[0]}</p>
                                </div>

                                {/* Tear-off line visual */}
                                <div className="absolute top-1/3 w-full border-t-2 border-dashed border-mw-zinc/50 flex justify-between -ml-2 -mr-2">
                                    <div className="w-4 h-4 bg-mw-zinc rounded-full translate-y-[-50%]" />
                                    <div className="w-4 h-4 bg-mw-zinc rounded-full translate-y-[-50%]" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
