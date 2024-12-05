import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createSlug } from "../../../../lib/utils";
import { prisma } from "../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const result = await prisma.gallery.findUnique({
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
    const oldGallery = await prisma.gallery.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    const gallery = await prisma.gallery.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: data.title,
        slug: createSlug(data.title),
        items: data.items,
      },
    });
    return NextResponse.json({
      data: { added: gallery.id },
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
 
  const result = await prisma.gallery.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json({ success: true, result: result });
}
