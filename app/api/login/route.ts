import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../lib/prisma";

export async function POST(request: NextRequest) {
  console.log("login", request);
  const data = await request.json();

  if (!data) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.credentials.username,
    },
  });

  console.log(data, user);

  if (! user?.active) {
    return NextResponse.json(
      { status: "error", error: "Wrong login / password" },
      { status: 400 },
    );
  }

  bcrypt.compare(data.credentials.password, user?.password, (err, result) => {
    if (err) throw Error(err.message);

    if (result) {
      return NextResponse.json(
        {
          data: {
            user: {
              id: user.id,
              active: user.active,
              email: user.email,
            },
          },
          status: "success",
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { status: "error", error: "Wrong login / password" },
        { status: 400 },
      );
    }
  });
}
