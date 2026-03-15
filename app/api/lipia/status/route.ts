import { NextRequest, NextResponse } from "next/server"
import { checkStatus } from "@/lib/lipia"

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference")

  if (!reference)
    return NextResponse.json({ error: "reference required" }, { status: 400 })

  const status = await checkStatus(reference)

  return NextResponse.json(status)
}