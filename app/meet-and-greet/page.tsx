"use client";

import { useEffect, useState } from "react";
import { registerForMeetAndGreet } from "../actions";
import { Home } from "lucide-react";
import Link from "next/link";

type Show = {
    id: string;
    venue: string;
    city: string;
    state: string;
    date: string;
};

export default function MeetAndGreetPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [shows, setShows] = useState<Show[]>([]);
    const [loadingShows, setLoadingShows] = useState(true);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const res = await fetch("/api/shows");
                const data = await res.json();
                if (data.shows) {
                    setShows(data.shows);
                }
            } catch (error) {
                console.error("Failed to fetch shows:", error);
            } finally {
                setLoadingShows(false);
            }
        };
        fetchShows();
    }, []);

    async function handleSubmit(formData: FormData) {
        setStatus("submitting");
        const result = await registerForMeetAndGreet(formData);
        if (result.success && result.url) {
            window.location.href = result.url;
        } else {
            console.error(result.error);
            setStatus("error");
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4">
            {/* Background with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/background-mw.png')" }}
            >
                <div className="absolute inset-0 bg-mw-black/80 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 w-full max-w-2xl bg-mw-dark/90 border border-mw-zinc p-8 md:p-12 shadow-2xl">
                <Link href="/" className="absolute top-4 left-4 text-mw-grey hover:text-mw-amber transition-colors">
                    <Home size={24} />
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tighter text-white mb-2">
                        Meet & Greet
                    </h1>
                    <p className="text-mw-amber font-bold tracking-widest uppercase">
                        Exclusive Backstage Access
                    </p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-mw-grey tracking-wider">Full Name</label>
                            <input
                                name="name"
                                required
                                className="w-full bg-black/50 border border-mw-zinc p-4 text-white focus:border-mw-amber focus:outline-none transition-colors"
                                placeholder="Create Wallen"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-mw-grey tracking-wider">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-black/50 border border-mw-zinc p-4 text-white focus:border-mw-amber focus:outline-none transition-colors"
                                placeholder="email@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-mw-grey tracking-wider">Phone Number</label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                className="w-full bg-black/50 border border-mw-zinc p-4 text-white focus:border-mw-amber focus:outline-none transition-colors"
                                placeholder="(555) 555-5555"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-mw-grey tracking-wider">Date of Birth</label>
                            <input
                                name="dob"
                                type="date"
                                required
                                className="w-full bg-black/50 border border-mw-zinc p-4 text-white focus:border-mw-amber focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-mw-grey tracking-wider">Instagram Handle <span className="text-gray-600 normal-case">(Optional)</span></label>
                        <input
                            name="instagram"
                            className="w-full bg-black/50 border border-mw-zinc p-4 text-white focus:border-mw-amber focus:outline-none transition-colors"
                            placeholder="@morganwallen"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-mw-grey tracking-wider">Select Show</label>
                        <select
                            name="show_id"
                            required
                            defaultValue=""
                            disabled={loadingShows}
                            className="w-full bg-black/50 border border-mw-zinc p-4 text-white focus:border-mw-amber focus:outline-none appearance-none"
                        >
                            <option value="" disabled>
                                {loadingShows ? "Loading shows..." : "Select a Show"}
                            </option>
                            {shows.map((show) => (
                                <option key={show.id} value={show.id}>
                                    {formatDate(show.date)} - {show.city}, {show.state} @ {show.venue}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4">
                        <div className="flex justify-between items-center mb-4 border-b border-mw-zinc pb-4">
                            <span className="text-white font-bold uppercase">Total</span>
                            <span className="text-2xl text-mw-amber font-mono font-bold">$150.00</span>
                        </div>
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full bg-white text-black font-extrabold uppercase py-4 tracking-widest hover:bg-mw-amber hover:text-white transition-all disabled:opacity-50"
                        >
                            {status === "submitting" ? "Processing..." : "Pay & Register"}
                        </button>
                    </div>

                    {status === "error" && (
                        <p className="text-center text-red-500 font-bold text-sm">Something went wrong. Please try again.</p>
                    )}
                </form>
            </div>
        </div>
    );
}
