import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Hamma maydonlar tekshirilib, bo‘sh bo‘lsa 400 qaytaramiz
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ message: 'Invalid order data' }, { status: 400 })
    }

    // Saqlash
    await sql`
      INSERT INTO orders (items, name, phone, address, total_price)
      VALUES (
        ${JSON.stringify(body.items)},
        ${body.name || ''},
        ${body.phone || ''},
        ${body.address || ''},
        ${body.totalPrice || 0}
      )
    `

    return NextResponse.json({ message: 'Order saved' })
  } catch (err) {
    console.error("❌ Order save failed:", err)
    return NextResponse.json({ message: 'Failed to submit order' }, { status: 500 })
  }
}
