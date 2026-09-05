"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyLeadBar } from "./StickyLeadBar";
import { Modal } from "../ui/modal";
import { LeadForm } from "../public/LeadForm";

export function PublicLayoutShell({ children }: { children: React.ReactNode }) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />
      
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>

      <Footer />

      <StickyLeadBar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Global Consultation Modal */}
      <Modal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        maxWidth="lg"
      >
        <LeadForm
          variant="plain"
          onSuccess={() => {
            // keep open to see celebratory message
          }}
        />
      </Modal>
    </div>
  );
}
