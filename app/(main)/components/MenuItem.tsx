"use client";
import { Button, Typography, styled } from "@mui/material";
import Link from "next/link";

interface IMenuProps {
  name: string;
  url: string;
  color: string;
  variant?: "text" | "outlined" | "contained";
  scroll?: boolean;
}

// const MenuButton = styled('div')(({ theme }) => ({
//   color: theme.palette.primary.contrastText,
//   backgroundColor: theme.palette.primary.main,
//   padding: theme.spacing(1),
//   borderRadius: theme.shape.borderRadius,
// }));

export function MenuItem(props: Readonly<IMenuProps>) {
  // FIXME button console log error
  return (
    <Button
      sx={{
        fontSize: "1.2rem",
        color: props.color,
        textShadow:
          "-1px 1px 0 rgb(0 0 0 / 75%),1px 1px 0 rgb(0 0 0 / 75%),1px -1px 0 rgb(0 0 0 / 75%),-1px -1px 0 rgb(0 0 0 / 75%)",
      }}
      variant={props.variant ?? "text"}
    >
      <Link
        href={props.url}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        scroll
      >
        <Typography variant="accents" sx={{ letterSpacing: "2px" }}>
          {props.name}
        </Typography>
      </Link>
    </Button>
  );
}
