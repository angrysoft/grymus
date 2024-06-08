"use client";
import { Box, Container, Paper } from "@mui/material";
import useSWR from "swr";
import { Header } from "../../components/Header";
import { Loader } from "../../components/Loader";
import { fetcher } from "../../../lib/fetcher";
import { PageData } from "../../../models/page";

export default function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const { data } = useSWR<PageData>(`/api/pages/${params.slug}`, fetcher);
  if (!data) {
    return <Loader />;
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
        <Header title={data.title}>{data.title}</Header>
      </Box>
      <Container maxWidth="xl">
        <Paper
          sx={{
            padding: "2rem",
          }}
          component="section"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </Container>
    </Box>
  );
}
