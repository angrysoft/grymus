"use client";
import useSWR from "swr";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Loader } from "../../../(main)/components/Loader";
import { fetcher } from "../../../lib/fetcher";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Media({
  params,
}: Readonly<{ params: { name: string } }>) {
  const { data, error } = useSWR(`/api/media/byName/${params.name}`, fetcher);
  console.error("error: ", error);
  if (!data) return <Loader />;

  return (
    <Box
      sx={{
        maxHeight: "100%",
        padding: "1rem",
        height: "100dvh",
      }}
    >
      <Paper
        component="section"
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          height: "100%",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        <Link
          sx={{
            display: "grid",
            justifyItems: "center",
            position: "relative",
          }}
          href={"/files/" + params.name}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "auto",
              position: "absolute",
              top: 0,
            }}
            src={"/files/" + params.name}
            alt=""
          />
        </Link>
        <Stack useFlexGap spacing={1}>
          <Typography>
            <strong>Nazwa: </strong>
            {data.result.name}
          </Typography>
          <Typography>
            <strong>Rozmiar: </strong>
            {(Number(data.result.size) / 1000000).toFixed(2)} mb
          </Typography>
          <Typography>
            <strong>Przesłano: </strong>
            {data.result.uploadedAt}
          </Typography>
          <Button href="/admin/media">Wróć do plików</Button>
        </Stack>
      </Paper>
    </Box>
  );
}
