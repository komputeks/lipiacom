import { LipiaSTKRequest } from "./types"

const BASE = "https://lipia-api.kreativelabske.com/api/v2"

const headers = {
  Authorization: `Bearer ${process.env.LIPIA_API_KEY}`,
  "Content-Type": "application/json",
}

export async function initiateSTK(data: LipiaSTKRequest) {
  const res = await fetch(`${BASE}/payments/stk-push`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })

  return res.json()
}

export async function checkStatus(reference: string) {
  const res = await fetch(
    `${BASE}/payments/status?reference=${reference}`,
    {
      headers,
      method: "GET",
    }
  )

  return res.json()
}