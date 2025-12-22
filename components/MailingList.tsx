"use client";

import { useState } from "react";
import { joinMailingList } from "@/app/actions";

export default function MailingList() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(formData: FormData) {
        setStatus("submitting");
        setMessage("");

        const result = await joinMailingList(formData);

        if (result.success) {
            setStatus("success");
            setMessage("You're on the list!");
        } else {
            setStatus("error");
            setMessage(result.error || "Something went wrong.");
        }
    }

    return (
        <section className="relative w-full py-32 overflow-hidden flex items-center justify-center">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="https://videos.pexels.com/video-files/2061386/2061386-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-mw-black/60" />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-4 text-center">
                <h2 className="mb-12 text-3xl md:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-2xl font-saira">
                    Join Big Loud's Mailing List
                </h2>

                {status === "success" ? (
                    <div className="bg-mw-dark/80 backdrop-blur-md p-8 border border-mw-amber inline-block">
                        <h3 className="text-2xl font-bold text-mw-amber mb-2">Welcome to the Family</h3>
                        <p className="text-white">{message}</p>
                    </div>
                ) : (
                    <form action={handleSubmit} className="flex flex-col items-center gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                            <input
                                name="firstName"
                                required
                                placeholder="FIRST NAME"
                                className="bg-transparent border border-white p-4 text-white placeholder-gray-400 focus:outline-none focus:border-mw-amber transition-colors uppercase font-bold tracking-wide"
                            />
                            <input
                                name="lastName"
                                required
                                placeholder="LAST NAME"
                                className="bg-transparent border border-white p-4 text-white placeholder-gray-400 focus:outline-none focus:border-mw-amber transition-colors uppercase font-bold tracking-wide"
                            />
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="EMAIL"
                                className="bg-transparent border border-white p-4 text-white placeholder-gray-400 focus:outline-none focus:border-mw-amber transition-colors uppercase font-bold tracking-wide"
                            />
                            <input
                                name="zipCode"
                                required
                                placeholder="ZIP / POSTAL CODE"
                                className="bg-transparent border border-white p-4 text-white placeholder-gray-400 focus:outline-none focus:border-mw-amber transition-colors uppercase font-bold tracking-wide"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="mt-8 px-12 py-3 border-2 border-white text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-50 text-lg"
                        >
                            {status === "submitting" ? "Joining..." : "Submit"}
                        </button>

                        {status === "error" && (
                            <p className="text-red-500 font-bold uppercase tracking-wide mt-2">{message}</p>
                        )}

                        <button type="button" className="mt-4 text-gray-400 text-xs hover:text-white underline uppercase tracking-wider">
                            Looking for our press list? Click here to join.
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
