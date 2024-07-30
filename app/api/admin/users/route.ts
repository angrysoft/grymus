import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "../../lib/apiUtils";
import { prisma } from "../../lib/prisma";

export async function GET(request: NextRequest) {
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
  const data = await request.json();

  if (!data) {
    return;
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashPassword(data.password),
        active: data.active || false,
      },
    });

    console.log("user: ", user);

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
    //   console.error(e.message);
    } else {
      console.error(e.message);
      return NextResponse.json({ status: "error", error: e }, { status: 400 });
    }
  }
}
