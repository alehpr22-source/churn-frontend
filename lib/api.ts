import type { ClienteInput, RecomendarResponse } from "./types"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""

export async function recomendar(data: ClienteInput): Promise<RecomendarResponse> {
  const res = await fetch(`${API_BASE}/api/recomendar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}`)
  }
  return res.json()
}
