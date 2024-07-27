import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { createSlug } from "../../../../lib/utils";
import { Prisma } from "@prisma/client";
import { hashPassword } from "../../../../lib/apiUtils";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const result = await prisma.news.findUnique({
    where: {
      id: Number(params.id),
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
    const oldUser = await prisma.user.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!oldUser) {
      console.error("User not exist");
      return NextResponse.json({
        status: "error",
        error: "Nie ma takiego użytkownika",
      });
    }
    const user = await prisma.user.update({
      where: {
        id: Number(params.id),
      },
      data: {
        email: data.email,
        password: hashPassword(data.password, process.env.SALT),
        active: data.active,
      },
    });
    return NextResponse.json({
      data: { added: user.id },
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
  const user = await prisma.user.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json({ success: true, result: user });
}
