import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "fs";
import { prisma } from "../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const result = await prisma.media.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json({ success: true, result: result });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const photo = await prisma.media.delete({
    where: {
      id: Number(params.id),
    },
  });
  await deletePhotos(photo.name);
  return NextResponse.json({ success: true, result: photo });
}

async function deletePhotos(fileName: string) {
  await unlink(`${process.env.MEDIA_DIR}/${fileName}`);
  if (existsSync(`${process.env.MEDIA_DIR}/small_${fileName}`))
    await unlink(`${process.env.MEDIA_DIR}/small_${fileName}`);
}
