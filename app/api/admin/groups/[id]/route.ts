import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "../../../lib/apiUtils";
import { prisma } from "../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const result = await prisma.groups.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      id: true,
      name: true,
      image: true,
      desc: true,
      sort: true,
    },
  });

  return NextResponse.json({ success: true, result: result });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const data = await request.json();
  if (!data) {
    return;
  }

  try {
    const oldGroups = await prisma.groups.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!oldGroups) {
      console.error("groups not exist");
      return NextResponse.json({
        status: "error",
        error: "Nie ma takiego użytkownika",
      });
    }

    const groups = await prisma.groups.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: data.name,
        image: data.image,
        sort: Number(data.sort),
        desc: data.desc,
      },
    });

    return NextResponse.json({
      data: { added: groups.id },
      status: "success",
    });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e);
      if (e.code === "P2002") {
        console.log("There is a unique constraint violation");
        return NextResponse.json({
          status: "error",
          error: "Taki tytuł już istnieje",
        });
      }
      // } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    } else {
      return NextResponse.json({ status: "error", error: e });
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const groups = await prisma.groups.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json({ success: true, result: groups });
}
