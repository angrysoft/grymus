import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const result = await prisma.news.findUnique({
    where: {
      slug: params.slug,
      enabled: true,
    },
  });
  if (!result) return NextResponse.json({ success: false, result: {} });
  return NextResponse.json({ success: true, result: result });
}
