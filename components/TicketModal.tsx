"use client";

import { X, Minus, Plus, AlertCircle, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TicketTier = {
    id: string;
    name: string;
    price: number;
    perks: string[];
    status: "available" | "limited" | "sold-out";
};

const TIERS: TicketTier[] = [
    {
        id: "pit",
        name: "Pit / GA Front",
        price: 350,
        perks: ["Closest to stage", "Early entry", "VIP Lanyard"],
        status: "limited",
    },
    {
        id: "vip",
        name: "VIP Seated",
        price: 275,
        perks: ["Premium seat", "Lounge access", "Exclusive merch"],
        status: "available",
    },
    {
        id: "ga",
        name: "General Admission",
        price: 125,
        perks: ["Lawn access", "First come first serve"],
        status: "available",
    },
];

export default function TicketModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [quantities, setQuantities] = useState<Record<string, number>>({
        pit: 0,
        vip: 0,
        ga: 0,
    });

    const updateQuantity = (id: string, delta: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta),
        }));
    };

    const total = TIERS.reduce(
        (acc, tier) => acc + tier.price * (quantities[tier.id] || 0),
        0
    );

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="pointer-events-auto w-full max-w-lg bg-mw-zinc border border-mw-amber/20 shadow-2xl rounded-none md:rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
                            {/* Header */}
                            <div className="bg-mw-dark p-6 flex items-center justify-between border-b border-white/10">
                                <div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Select Tickets</h3>
                                    <p className="text-xs text-mw-grey">Nissan Stadium, Nashville, TN</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Tiers List */}
                            <div className="overflow-y-auto p-6 space-y-4 flex-1">
                                {TIERS.map((tier) => (
                                    <div
                                        key={tier.id}
                                        className={`p-4 border ${tier.status === "sold-out"
                                                ? "border-white/5 bg-white/5 opacity-60"
                                                : quantities[tier.id] > 0
                                                    ? "border-mw-amber bg-mw-amber/10"
                                                    : "border-white/10 bg-white/5"
                                            } transition-all`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-white uppercase">{tier.name}</h4>
                                                <span className="text-mw-amber font-mono text-lg">${tier.price}</span>
                                            </div>
                                            {tier.status === "limited" && (
                                                <span className="bg-red-900/50 text-red-400 text-xs px-2 py-1 uppercase font-bold tracking-wider rounded flex items-center gap-1">
                                                    <AlertCircle size={10} /> Low Qty
                                                </span>
                                            )}
                                        </div>

                                        <ul className="mb-4 space-y-1">
                                            {tier.perks.map((perk, i) => (
                                                <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                                                    <Check size={10} className="text-mw-grey" /> {perk}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-4">
                                            <span className="text-sm text-gray-500 font-medium">Quantity</span>
                                            <div className="flex items-center gap-4 bg-black/40 p-1 rounded">
                                                <button
                                                    onClick={() => updateQuantity(tier.id, -1)}
                                                    disabled={quantities[tier.id] === 0 || tier.status === "sold-out"}
                                                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-4 text-center text-white font-mono font-bold">
                                                    {quantities[tier.id] || 0}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(tier.id, 1)}
                                                    disabled={tier.status === "sold-out"}
                                                    className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="bg-mw-dark p-6 border-t border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-400 uppercase tracking-widest text-sm">Total</span>
                                    <span className="text-2xl font-bold text-white font-mono">${total}</span>
                                </div>
                                <button
                                    disabled={total === 0}
                                    className="w-full bg-mw-amber text-white font-bold uppercase py-4 tracking-widest hover:bg-mw-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
