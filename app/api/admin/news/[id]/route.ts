import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { createSlug } from "../../../../lib/utils";
import { Prisma } from "@prisma/client";

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
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Access denied" }, { status: 401 });

  const data = await request.json();
  if (!data) {
    return;
  }

  try {
    const oldPage = await prisma.news.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    const page = await prisma.news.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title: data.title,
        slug: createSlug(data.title),
        short: data.short,
        content: data.content,
        enabled: Boolean(data.enabled) || false,
      },
    });
    return NextResponse.json({
      data: { added: page.id },
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
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Access denied" }, { status: 401 });

  const news = await prisma.news.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json({ success: true, result: news });
}
