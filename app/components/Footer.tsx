import { Box } from "@mui/material";

export function Footer() {
  return (
    <Box
      component={"footer"}
      sx={{
        display: "flex",
        background:
          "linear-gradient(90deg, rgb(34,36,50) 0%, rgb(38,49,70) 50%,rgb(11,20,36)  100%)",
        color: "white",
        padding: "2rem",
        marginTop: "auto"
      }}
    >
      footer
    </Box>
  );
}
