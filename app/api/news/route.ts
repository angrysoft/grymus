import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const items: number = Number(request.nextUrl.searchParams.get("items") ?? 50);
  const offset: number = Number(
    request.nextUrl.searchParams.get("offset") ?? 0,
  );
  const transaction = await prisma.$transaction([
    prisma.news.count(),
    prisma.news.findMany({
      skip: offset,
      take: items,
      select: {
        id: true,
        slug: true,
        title: true,
        enabled: true,
        pined: true,
        short: true,
        updatedAt: true,
      },
      where: {
        enabled: true,
      },
      orderBy: [
        {
          pined: "desc",
        },
        { updatedAt: "desc" },
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
