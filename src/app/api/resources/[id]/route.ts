import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const resource = await prisma.resource.findUnique({ where: { id } });
  if (!resource) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.resource.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
