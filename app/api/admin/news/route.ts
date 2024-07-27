import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { createSlug } from "../../../lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET(request: NextRequest) {
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
        title: true,
        enabled: true,
        updatedAt: true
      },
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
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Access denied" }, { status: 401 });
  
  const data = await request.json();

  if (!data) {
    return;
  }
  
  try {
    const news = await prisma.news.create({
      data: {
        title: data.title,
        slug: createSlug(data.title),
        short: data.short,
        content: data.content,
        enabled: data.enabled || false,
      },
    });
    return NextResponse.json(
      {
        data: { added: news.id },
        status: "success",
      },
      { status: 201 },
    );
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e);
      if (e.code === "P2002") {
        console.log("There is a unique constraint violation");
        return NextResponse.json({
          status: "error",
          error: "Taki tytuł już istnieje",
        });
      }
      // } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    } else {
      return NextResponse.json({ status: "error", error: e }, { status: 400 });
    }
  }
}
