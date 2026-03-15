import { NextRequest, NextResponse } from "next/server"

interface STKBody {
  phone_number: string
  amount: number
  external_reference?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: STKBody = await req.json()

    const response = await fetch(
      "https://lipia-api.kreativelabske.com/api/v2/payments/stk-push",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.LIPIA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/lipia/callback`,
        }),
      }
    )

    const data = await response.json()

    return NextResponse.json(data)

  } catch (err) {

    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    )
  }
}