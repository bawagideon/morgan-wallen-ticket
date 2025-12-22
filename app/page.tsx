"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import TourList from "@/components/TourList";
import TicketModal from "@/components/TicketModal";
import UrgencyBar from "@/components/UrgencyBar";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen pb-16">
      <Hero />
      <TourList onOpenModal={() => setIsModalOpen(true)} />

      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <UrgencyBar />
    </main>
  );
}
