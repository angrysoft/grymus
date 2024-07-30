import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createSlug } from "../../../lib/utils";
import { prisma } from "../../lib/prisma";

export async function GET(request: NextRequest) {
  const items: number = Number(request.nextUrl.searchParams.get("items") ?? 50);
  const offset: number = Number(
    request.nextUrl.searchParams.get("offset") ?? 0,
  );
  const transaction = await prisma.$transaction([
    prisma.page.count(),
    prisma.page.findMany({
      skip: offset,
      take: items,
      select: {
        id: true,
        slug: true,
        title: true,
        enabled: true,
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

  const data = await request.json();

  if (!data) {
    return;
  }
  try {
    const page = await prisma.page.create({
      data: {
        title: data.title,
        slug: createSlug(data.title),
        content: data.content,
        enabled: data.enabled || false,
      },
    });
    return NextResponse.json(
      {
        data: { added: page.id },
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
