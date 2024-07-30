import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(request: NextRequest) {
  const transaction = await prisma.$transaction([
    prisma.groups.count(),
    prisma.groups.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        desc: true,
        sort: true,
      },
      orderBy: {
        sort: "asc",
      },
    }),
  ]);

  return NextResponse.json({
    success: true,
    total: transaction[0],
    result: transaction[1],
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data) {
    return;
  }

  try {
    const groups = await prisma.groups.create({
      data: {
        name: data.name,
        image: data.image,
        desc: data.desc,
        sort: Number(data.sort),
      },
    });


    return NextResponse.json(
      {
        data: { added: groups.id },
        status: "success",
      },
      { status: 201 },
    );
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e);
      if (e.code === "P2002") {
        console.log("There is a unique constraint violation");
        return NextResponse.json(
          {
            status: "error",
            error: "Taka grupa już istnieje",
          },
          { status: 400 },
        );
      }
    } else {
      console.error(e.message);
      return NextResponse.json({ status: "error", error: e }, { status: 400 });
    }
  }
}
