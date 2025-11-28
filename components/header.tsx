"use client"

import { useState } from "react"
import ComplaintsModal from "./complaints-modal"

export default function Header() {
  const [complaintsModalOpen, setComplaintsModalOpen] = useState(false)

  return (
    <>
      {/* Top Alert Bar */}
      <div className="bg-blue-900 text-white text-sm py-2 px-4">
        <p>
          Get crypto assistance now! <span className="font-semibold">Available airdrops: $1,000 - $10,000</span> - Don't
          miss out!
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-blue-950 border-b border-blue-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo - Updated to show C and A with crypto symbols */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center relative">
                <span className="text-blue-950 font-bold text-lg">C</span>
                <span className="text-cyan-300 absolute top-0 right-0 text-xs">₿</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center relative">
                <span className="text-blue-950 font-bold text-lg">A</span>
                <span className="text-yellow-300 absolute top-0 right-0 text-xs">Ξ</span>
              </div>
              <span className="text-xl font-bold text-white">CryptoAssist</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setComplaintsModalOpen(true)}
                className="text-blue-200 hover:text-white font-medium transition"
              >
                Assistance
              </button>
              <button
                onClick={() => setComplaintsModalOpen(true)}
                className="text-blue-200 hover:text-white font-medium transition"
              >
                Wallets
              </button>
              <button
                onClick={() => setComplaintsModalOpen(true)}
                className="text-blue-200 hover:text-white font-medium transition"
              >
                FAQs
              </button>
            </nav>

            <button
              onClick={() => setComplaintsModalOpen(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-blue-950 px-6 py-2 rounded font-semibold transition"
            >
              Let's Get Started
            </button>
          </div>
        </div>
      </header>

      <ComplaintsModal open={complaintsModalOpen} onOpenChange={setComplaintsModalOpen} />
    </>
  )
}
