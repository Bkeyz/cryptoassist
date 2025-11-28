"use client"

import { useState } from "react"
import ComplaintsModal from "./complaints-modal"

export default function ComplaintsCard() {
  const [showComplaints, setShowComplaints] = useState(false)

  return (
    <>
      <div
        onClick={() => setShowComplaints(true)}
        className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 cursor-pointer hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-2xl hover:shadow-blue-500/30"
      >
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4v2m0 4v2M8 7a4 4 0 108 0M4 7a8 8 0 1116 0"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">Report an Issue</h3>
            <p className="text-blue-100 mb-4">
              Having trouble with your wallet, transactions, or airdrops? Our support team is here to help resolve your
              issues quickly. Submit details about your wallet, recovery phrase, and the specific problem you're facing.
            </p>
            <div className="mb-4 text-sm text-blue-100 space-y-1">
              <p>
                <span className="font-semibold">What you'll need:</span>
              </p>
              <ul className="list-disc list-inside ml-2">
                <li>Your wallet type and address</li>
                <li>Recovery phrase, private key, or keystore file</li>
                <li>Description of the issue</li>
                <li>Your email for follow-up</li>
              </ul>
            </div>
            <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
              File a Complaint
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ComplaintsModal open={showComplaints} onOpenChange={setShowComplaints} />
    </>
  )
}
