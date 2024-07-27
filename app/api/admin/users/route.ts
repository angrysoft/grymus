import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { createSlug } from "../../../lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { hashPassword } from "../../../lib/apiUtils";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Access denied" }, { status: 401 });

  const items: number = Number(request.nextUrl.searchParams.get("items") ?? 50);
  const offset: number = Number(
    request.nextUrl.searchParams.get("offset") ?? 0,
  );
  const transaction = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      skip: offset,
      take: items,
      select: {
        id: true,
        email: true,
        active: true,
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
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashPassword(data.password, process.env.SALT),
        active: data.active || false,
      },
    });
    return NextResponse.json(
      {
        data: { added: user.id },
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
