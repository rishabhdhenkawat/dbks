import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const firstName = String(body.firstName || "").trim();
  const lastName = String(body.lastName || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  await prisma.membershipInquiry.create({
    data: { firstName, lastName, email, message },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
