import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } },
) {
  const result = await prisma.media.findUnique({
    where: {
      name: params.name,
    },
  });
  return NextResponse.json({ success: true, result: result });
}
