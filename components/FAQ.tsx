"use client";

import { ChevronDown } from "lucide-react";

export default function FAQ() {
    const faqs = [
        {
            question: "Is this event All Ages?",
            answer: "Yes, this event is open to all ages. All guests must have a valid ticket."
        },
        {
            question: "When will I receive my tickets?",
            answer: "Digital tickets are sent to your email instantly after purchase. You can also view them in the 'My Tickets' portal."
        },
        {
            question: "Can I transfer my tickets?",
            answer: "Yes, you can transfer your digital tickets securely via the 'My Tickets' feature."
        }
    ];

    return (
        <section className="py-24 bg-mw-zinc">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-12 text-center">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details
                            key={i}
                            className="group bg-mw-black border border-white/10 rounded-lg overflow-hidden"
                        >
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                <span className="font-bold text-lg md:text-xl text-white uppercase tracking-wide">
                                    {faq.question}
                                </span>
                                <ChevronDown className="text-mw-amber transition-transform duration-300 group-open:rotate-180" />
                            </summary>
                            <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
