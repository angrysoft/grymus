'use client'
import { Backdrop, CircularProgress } from "@mui/material";

export function Loader() {
  return (
    <Backdrop
      sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
