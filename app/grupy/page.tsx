"use client";
import { Box, Container, Typography } from "@mui/material";
import useSWR from "swr";
import { Header } from "../components/Header";
import { fetcher } from "../lib/fetcher";
import { GroupData } from "../models/groups";
import { Group } from "./group";

export default function Groups() {
  const { data } = useSWR<GroupData[]>("/api/groups", fetcher);
  if (!data) {
    return <Typography>Ładowanie ...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5rem",
      }}
    >
      <Box
        component="section"
        sx={{
          backgroundColor: "rgb(98 89 149)",
          padding: "3rem",
        }}
      >
        <Container maxWidth={false} sx={{
          display: "flex",
          flexDirection: "column",
          
          gap: "2rem"
        }}>
          <Header>Grupy</Header>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {data?.map((group) => {
              return (
                <Group
                  key={group.name}
                  image={group.image}
                  title={group.name}
                  url={""}
                  desc={group.desc} />
                  
              );
            })}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
