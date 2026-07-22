import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const resource = await prisma.resource.findUnique({ where: { id } });
  if (!resource || !resource.data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const url = new URL(request.url);
  const forceDownload = url.searchParams.get("download") === "1";
  const disposition = forceDownload ? "attachment" : "inline";

  const headers = new Headers();
  headers.set("Content-Type", resource.mimeType);
  headers.set("Content-Length", String(resource.size));
  headers.set(
    "Content-Disposition",
    `${disposition}; filename="${encodeURIComponent(resource.filename)}"`,
  );

  return new NextResponse(new Uint8Array(resource.data), { headers });
}
