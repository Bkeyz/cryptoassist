"use client"

import { useState } from "react"
import ComplaintsModal from "./complaints-modal"

const features = [
  { title: "Bitcoin Assistance", icon: "₿", description: "Get help with Bitcoin-related issues" },
  { title: "Ethereum Support", icon: "Ξ", description: "Ethereum wallet and transaction support" },
  { title: "Multi-Wallet Support", icon: "🔗", description: "Support for all major crypto wallets" },
  { title: "Instant Claiming", icon: "⚡", description: "Claim airdrops instantly and securely" },
  { title: "Secure Transactions", icon: "🔐", description: "Safe and encrypted transaction handling" },
  { title: "Ledger Integration", icon: "🛡️", description: "Full support for hardware wallets" },
  { title: "Real-time Tracking", icon: "📊", description: "Monitor your assets in real-time" },
  { title: "Low Gas Fees", icon: "💰", description: "Optimize transactions with minimal fees" },
  { title: "24/7 Support", icon: "✓", description: "Round-the-clock customer support" },
  { title: "Multiple Networks", icon: "🌐", description: "Access across all blockchain networks" },
  { title: "Instant Payouts", icon: "✓", description: "Quick and reliable payouts" },
]

export default function Features() {
  const [complaintsModalOpen, setComplaintsModalOpen] = useState(false)

  const handleFeatureClick = () => {
    setComplaintsModalOpen(true)
  }

  return (
    <>
      <section className="bg-blue-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-8">CryptoAssist Features</h2>

          <p className="text-blue-300 text-center max-w-3xl mx-auto mb-16">
            Get comprehensive crypto assistance with ease. CryptoAssist supports all major wallets and cryptocurrencies,
            ensuring you never miss out on crypto opportunities. Secure, fast, and transparent assistance with instant
            payouts to your wallet.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={handleFeatureClick}
                className="bg-blue-900 border border-blue-800 rounded-lg p-6 flex flex-col items-center gap-4 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition cursor-pointer text-left"
              >
                <div className="flex-shrink-0 w-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-blue-950 font-bold">
                    {feature.icon}
                  </div>
                </div>
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-blue-200 mt-2">{feature.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <ComplaintsModal open={complaintsModalOpen} onOpenChange={setComplaintsModalOpen} />
    </>
  )
}
