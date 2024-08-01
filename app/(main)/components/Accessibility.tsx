'use client'
import { Box, Paper, Stack } from "@mui/material";

interface IAccessibilityProps {
  handleFontNormal?: ()=> void;
  handleFontBigger?: ()=> void;
  handleHightContrast?: ()=> void;
}

export function Accessibility(props: IAccessibilityProps) {
  return (
    <Paper
      sx={{
        position: "fixed",
        top: "7rem",
        right: "0.5rem",
        padding: "0.2rem",
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            cursor: "pointer",
            padding: "0.5rem",
            border: "1px solid black",
            borderRadius: "0.5rem",
            fontSize: "1rem"
          }}
          onClick={props.handleFontNormal}
        >
          A
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            padding: "0.5rem",
            border: "1px solid black",
            borderRadius: "0.5rem",
            fontSize: "1.1rem"
          }}
          onClick={props.handleFontBigger}
        >
          A
        </Box>
        <Box
          sx={{
            backgroundColor: "yellow",
            cursor: "pointer",
            padding: "0.5rem",
            border: "1px solid black",
            borderRadius: "0.5rem",
            fontSize: "1rem"
          }}
          onClick={props.handleHightContrast}
        >
          A
        </Box>
      </Stack>
    </Paper>
  );
}
