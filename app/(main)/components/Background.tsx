"use client";
import { Box, alpha } from "@mui/material";
import { ReactNode } from "react";
import theme from "../../theme";

interface IBackgroundProps {
  color?: string;
  children: ReactNode;
  opacity?: number;
  sx?: any;
}

export function Background(props: Readonly<IBackgroundProps>) {
  const color = alpha(
    props.color ?? theme.palette.primary.main,
    props.opacity ?? 1,
  );
  const sx = {
    backgroundColor: color,
    ...props.sx ?? {},
  };

  return <Box sx={sx}>{props.children}</Box>;
}
