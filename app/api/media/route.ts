import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { prisma } from "../lib/prisma";

export async function GET(request: NextRequest) {
  const items: number = Number(request.nextUrl.searchParams.get("items") ?? 10);
  const offset: number = Number(
    request.nextUrl.searchParams.get("offset") ?? 0,
  );
  const transaction = await prisma.$transaction([
    prisma.media.count(),
    prisma.media.findMany({
      skip: offset,
      take: items,
      orderBy: [
        {
          uploadedAt: "desc",
        },
      ],
    }),
  ]);

  return NextResponse.json({
    success: true,
    total: transaction[0],
    result: transaction[1],
    currentOffset: offset,
  });
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }
  const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!acceptedTypes.includes(file.type)) {
    return NextResponse.json({
      error: "incorrect file type",
      success: false,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const icon = await saveFile(file.name, file.type, buffer);
  if (!icon) return NextResponse.json({ success: false }, { status: 400 });

  const media = await prisma.media.upsert({
    where: {
      name: file.name,
    },
    update: {
      name: file.name,
      size: file.size,
      type: file.type,
      icon: icon,
    },
    create: {
      name: file.name,
      size: file.size,
      type: file.type,
      icon: icon,
    },
  });
  console.log("media: ", media);
  return NextResponse.json({ success: true, created: media });
}

async function saveFile(fileName: string, fileType: string, buffer: Buffer) {
  let resize = false;
  let icon = null
  switch (fileType) {
    case "image/png":
    case "image/jpeg":
    case "image/webp":
      resize = true;
      icon = `small_${fileName}`;
      break;
    case "application/pdf":
      icon = "pdf_file"
      break;
    default:
      return null;
  }
  await writeFile(`${process.env.MEDIA_DIR}/${fileName}`, buffer);
  if (resize) {
    sharp(buffer)
      .resize({ width: 400 })
      .toFile(`${process.env.MEDIA_DIR}/small_${fileName}`, (err, info) =>
        console.log(err, info),
      );
  }
  return icon;
}
