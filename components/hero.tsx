"use client"

import { useState } from "react"
import WalletModal from "./wallet-modal"

export default function Hero() {
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  return (
    <section className="bg-gradient-to-b from-blue-950 to-blue-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Claim & Log with{" "}
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                CryptoAssist
              </span>
            </h1>
            <p className="text-blue-200 text-lg mb-8">
              Get comprehensive crypto assistance with ease. CryptoAssist supports{" "}
              <span className="font-semibold">50+ major wallets</span> and cryptocurrencies, ensuring you never miss out
              on crypto opportunities.
            </p>
            <div className="space-y-3">
              <p className="text-cyan-400 font-semibold text-sm">Available Airdrop: $1,000 - $10,000 Worth of Crypto</p>
              <button
                onClick={() => setWalletModalOpen(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-blue-950 px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg shadow-cyan-500/50"
              >
                Connect Wallet & Claim
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="bg-blue-800 rounded-lg p-12 flex items-center justify-center min-h-80">
            <svg className="w-64 h-64" viewBox="0 0 300 300" fill="none">
              {/* Network visualization */}
              <circle cx="150" cy="150" r="120" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
              <circle cx="150" cy="150" r="80" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
              <circle cx="150" cy="150" r="40" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.7" />

              {/* Center nodes */}
              <circle cx="150" cy="150" r="8" fill="#ffffff" />
              <circle cx="150" cy="100" r="6" fill="#22d3ee" />
              <circle cx="150" cy="200" r="6" fill="#22d3ee" />
              <circle cx="100" cy="150" r="6" fill="#22d3ee" />
              <circle cx="200" cy="150" r="6" fill="#22d3ee" />
              <circle cx="110" cy="110" r="6" fill="#06b6d4" />
              <circle cx="190" cy="110" r="6" fill="#06b6d4" />
              <circle cx="110" cy="190" r="6" fill="#06b6d4" />
              <circle cx="190" cy="190" r="6" fill="#06b6d4" />

              {/* Lines connecting nodes */}
              <line x1="150" y1="150" x2="150" y2="100" stroke="#22d3ee" strokeWidth="1.5" />
              <line x1="150" y1="150" x2="150" y2="200" stroke="#22d3ee" strokeWidth="1.5" />
              <line x1="150" y1="150" x2="100" y2="150" stroke="#22d3ee" strokeWidth="1.5" />
              <line x1="150" y1="150" x2="200" y2="150" stroke="#22d3ee" strokeWidth="1.5" />
              <line x1="150" y1="150" x2="110" y2="110" stroke="#22d3ee" strokeWidth="1.5" />
              <line x1="150" y1="150" x2="190" y2="110" stroke="#22d3ee" strokeWidth="1.5" />
              <line x1="150" y1="150" x2="110" y2="190" stroke="#22d3ee" strokeWidth="1.5" />
              <line x1="150" y1="150" x2="190" y2="190" stroke="#22d3ee" strokeWidth="1.5" />

              {/* Device icons */}
              <rect x="120" y="50" width="30" height="20" rx="2" fill="#22d3ee" />
              <rect x="150" y="70" width="35" height="25" rx="2" fill="#22d3ee" />
              <rect x="230" y="120" width="25" height="30" rx="2" fill="#22d3ee" />
              <rect x="45" y="140" width="25" height="30" rx="2" fill="#22d3ee" />
              <rect x="120" y="240" width="30" height="25" rx="2" fill="#22d3ee" />
            </svg>
          </div>
        </div>
      </div>

      <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
    </section>
  )
}
