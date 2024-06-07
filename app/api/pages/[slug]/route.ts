export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  return Response.json({
    title: "test",
    body: "lfjdlfjakjf djlfdla jf ljf laj;lfjjfja dlkf fj;laja jld ;j",
    slug: params.slug,
  });
}
