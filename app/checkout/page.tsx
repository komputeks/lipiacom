"use client"

import { useState } from "react"

export default function Checkout() {

  const [phone, setPhone] = useState("")
  const [reference, setReference] = useState("")
  const [status, setStatus] = useState("")

  async function pay() {

    const res = await fetch("/api/lipia/stk", {
      method: "POST",
      body: JSON.stringify({
        phone_number: phone,
        amount: 100,
        external_reference: `order_${Date.now()}`,
      }),
    })

    const data = await res.json()

    if (data.success) {
      setReference(data.data.TransactionReference)
      poll(data.data.TransactionReference)
    }
  }

  async function poll(ref: string) {

    const interval = setInterval(async () => {

      const res = await fetch(`/api/lipia/status?reference=${ref}`)
      const data = await res.json()

      const s = data.data.response.Status

      setStatus(s)

      if (s === "SUCCESS" || s === "FAILED")
        clearInterval(interval)

    }, 5000)
  }

  return (
    <div style={{ padding: 40 }}>

      <h2>M-Pesa Checkout</h2>

      <input
        placeholder="0712345678"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={pay}>
        Pay 100 KES
      </button>

      {reference && (
        <p>Transaction: {reference}</p>
      )}

      {status && (
        <p>Status: {status}</p>
      )}

    </div>
  )
}