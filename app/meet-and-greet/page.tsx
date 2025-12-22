"use client";

import { useState } from "react";
import { registerForMeetAndGreet } from "../actions";
import { Home } from "lucide-react";
import Link from "next/link";

export default function MeetAndGreetPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    async function handleSubmit(formData: FormData) {
        setStatus("submitting");
        const result = await registerForMeetAndGreet(formData);
        if (result.success) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    }

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

                {status === "success" ? (
                    <div className="text-center py-12">
                        <h3 className="text-2xl font-bold text-white mb-4">Registration Complete!</h3>
                        <p className="text-gray-400 mb-8">We'll be in touch with selection details shortly.</p>
                        <Link
                            href="/"
                            className="inline-block bg-mw-amber text-black font-bold uppercase py-3 px-8 hover:bg-white transition-colors"
                        >
                            Return Home
                        </Link>
                    </div>
                ) : (
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

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-mw-grey tracking-wider">Select Tier</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="cursor-pointer group">
                                    <input type="radio" name="tier" value="Normal" className="peer hidden" defaultChecked />
                                    <div className="border border-mw-zinc p-4 peer-checked:border-mw-amber peer-checked:bg-mw-amber/10 transition-all text-center">
                                        <span className="block font-bold text-white uppercase mb-1">Normal</span>
                                        <span className="text-sm text-gray-400 group-hover:text-white">$150 - Photo Op</span>
                                    </div>
                                </label>
                                <label className="cursor-pointer group">
                                    <input type="radio" name="tier" value="Basic" className="peer hidden" />
                                    <div className="border border-mw-zinc p-4 peer-checked:border-mw-amber peer-checked:bg-mw-amber/10 transition-all text-center">
                                        <span className="block font-bold text-white uppercase mb-1">Basic</span>
                                        <span className="text-sm text-gray-400 group-hover:text-white">$75 - Signed Poster</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-mw-grey tracking-wider">Location Preference</label>
                            <select
                                name="state"
                                required
                                defaultValue=""
                                className="w-full bg-black/50 border border-mw-zinc p-4 text-white focus:border-mw-amber focus:outline-none appearance-none"
                            >
                                <option value="" disabled>Select a State</option>
                                <option value="TN">Tennessee</option>
                                <option value="IN">Indiana</option>
                                <option value="MS">Mississippi</option>
                                <option value="NJ">New Jersey</option>
                                <option value="IL">Illinois</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full bg-white text-black font-extrabold uppercase py-4 tracking-widest hover:bg-mw-amber hover:text-white transition-all disabled:opacity-50"
                        >
                            {status === "submitting" ? "Registering..." : "Register Now"}
                        </button>

                        {status === "error" && (
                            <p className="text-center text-red-500 font-bold text-sm">Something went wrong. Please try again.</p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
