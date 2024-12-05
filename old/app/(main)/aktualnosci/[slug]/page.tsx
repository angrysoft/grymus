"use client";
import { Box, Container, Paper } from "@mui/material";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";
import { DefaultResponse } from "../../../models/default-response";
import { NewsDataItem } from "../../../models/news-data";
import { Header } from "../../components/Header";
import { Loader } from "../../components/Loader";

export default function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const { data } = useSWR<DefaultResponse<NewsDataItem>>(
    `/api/news/${params.slug}`,
    fetcher,
  );
  if (!data) {
    return <Loader />;
  }

  if (!data.success) {
    notFound();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Box
        component="section"
        sx={{
          backgroundColor: "rgb(98 89 149)",
          padding: "3rem",
        }}
      >
        <Header color="rgb(255 255 255 / 80)" title={data.result.title}>{data.result.title}</Header>
      </Box>
      <Container maxWidth="lg">
        <Paper
          sx={{
            padding: "2rem",
            margin: "2rem 0",
          }}
          component="section"
          dangerouslySetInnerHTML={{ __html: data.result.content }}
        />
      </Container>
    </Box>
  );
}
