import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        margin: "5rem auto"
      }}
    >
      <Paper sx={{ padding: "2rem" }}>
        <Typography component="h2" variant="h2">
          Strona nie istnieje
        </Typography>
        <Typography textAlign={"center"}>
          Nie udało się znaleźć strony<br/>
          <Link href="/">Powrót do Strony głównej</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
