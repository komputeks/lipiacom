import { NextRequest } from "next/server"

interface LipiaCallback {
  response: {
    Amount: number
    ExternalReference: string
    Phone: string
    MpesaReceiptNumber: string
    ResultDesc: string
    Status: string
    Metadata?: {
      order_id?: string
    }
  }
  status: boolean
}

export async function POST(req: NextRequest) {

  const payload: LipiaCallback = await req.json()

  console.log("Lipia Callback:", payload)

  const r = payload.response

  const normalized = {
    reference: r.ExternalReference,
    order_id: r.Metadata?.order_id || "",
    phone: r.Phone,
    amount: r.Amount,
    status: r.Status,
    receipt: r.MpesaReceiptNumber || "",
    result_desc: r.ResultDesc
  }

  try {

    await fetch(process.env.GAS_WEBHOOK!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(normalized)
    })

  } catch (err) {
    console.error("GAS write failed", err)
  }

  return new Response("ok", { status: 200 })
}