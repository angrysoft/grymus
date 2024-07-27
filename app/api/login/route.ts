import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "../lib/apiUtils";
import { prisma } from "../lib/prisma";

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.credentials.username,
      password: hashPassword(data.credentials.password, process.env.SALT),
    },
  });

  if (!user) {
    return NextResponse.json(
      { status: "error", error: "wrong login / password" },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      data: { user: user },
      status: "success",
    },
    { status: 201 },
  );
}
