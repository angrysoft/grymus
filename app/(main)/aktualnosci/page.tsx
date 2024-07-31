"use client";
import { Box, Container } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { NewsData } from "../../models/news-data";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { NewsShort } from "./news";

export default function News() {
  const { data } = useSWR<NewsData>("/api/news", fetcher);
  if (!data) {
    return <Loader />;
  }

  console.log(data);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // gap: "1rem",
      }}
    >
      <Box
        component="section"
        sx={{
          backgroundColor: "rgb(98 89 149)",
          padding: "3rem",
        }}
      >
        <Header>Aktualności</Header>
      </Box>
      <Container maxWidth="lg" sx={{display:"grid", gap:"2rem", padding: "2rem 1rem"}}>
        {data?.result?.map((news) => {
          return (
            <NewsShort
              key={news.slug}
              title={news.title}
              short={news.short}
              slug={news.slug}
            />
          );
        })}
      </Container>
    </Box>
  );
}
