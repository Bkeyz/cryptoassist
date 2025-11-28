"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import LiveSupport from "@/components/live-support"
import LiveChat from "@/components/live-chat"
import ComplaintsCard from "@/components/complaints-card"

export default function Home() {
  const [showSupport, setShowSupport] = useState(false)
  const [showChat, setShowChat] = useState(false)

  return (
    <main>
      <Header />
      <Hero />
      <Features />

      <section className="bg-blue-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ComplaintsCard />
        </div>
      </section>

      {/* Live Support Panel */}
      <LiveSupport open={showSupport} onOpenChange={setShowSupport} />

      {/* Live Chat Widget */}
      <LiveChat open={showChat} onOpenChange={setShowChat} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
        {/* Live Chat Button */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Open live chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>

        {/* Live Support Button */}
        <button
          onClick={() => setShowSupport(!showSupport)}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Open live support"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </main>
  )
}
