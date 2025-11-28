import type { Metadata } from "next"
import ImportWalletClient from "./ImportWalletClient"

export const metadata: Metadata = {
  title: "Import Wallet & Claim Airdrop - CryptoAssist",
  description: "Import your wallet and claim your cryptocurrency airdrop. Available airdrops: $1,000 - $10,000",
}

export default function ImportWalletPage() {
  return <ImportWalletClient />
}
