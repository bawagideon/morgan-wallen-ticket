"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import TourList from "@/components/TourList";
import MailingList from "@/components/MailingList";
import TicketModal from "@/components/TicketModal";
import FAQ from "@/components/FAQ";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen pb-16">
      <Hero />
      <TourList onOpenModal={() => setIsModalOpen(true)} />
      <FAQ />
      <MailingList />

      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
