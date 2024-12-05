import { prisma } from "../lib/prisma";

export async function GET() {
  const groups = await prisma.groups.findMany({
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
  });
  return Response.json(groups);
}
