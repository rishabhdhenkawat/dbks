import { randomUUID } from "crypto";
import path from "path";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      filename: true,
      mimeType: true,
      size: true,
      createdAt: true,
    },
  });

  return NextResponse.json(resources);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const titleInput = formData.get("title");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "A file is required" }, { status: 400 });
  }

  // Keep uploads reasonable for DB-backed storage on Heroku
  const maxBytes = 10 * 1024 * 1024;
  if (file.size > maxBytes) {
    return NextResponse.json(
      { error: "File too large (max 10 MB)" },
      { status: 400 },
    );
  }

  const title =
    typeof titleInput === "string" && titleInput.trim()
      ? titleInput.trim()
      : file.name;

  const ext = path.extname(file.name);
  const storageName = `${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const resource = await prisma.resource.create({
    data: {
      title,
      filename: file.name,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
      storagePath: storageName,
      data: buffer,
      uploadedById: session.user.id,
    },
  });

  return NextResponse.json(
    {
      id: resource.id,
      title: resource.title,
      filename: resource.filename,
      mimeType: resource.mimeType,
      size: resource.size,
      createdAt: resource.createdAt,
    },
    { status: 201 },
  );
}
