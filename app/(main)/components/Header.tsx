'use client'
import React, { ReactNode } from "react";
import { Typography } from "@mui/material";
import { Love_Ya_Like_A_Sister } from "next/font/google";

const logoFont = Love_Ya_Like_A_Sister({
  weight: ["400"],
  subsets: ["latin"],
});

interface IHeaderProps {
  title?: string;
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Header(props: Readonly<IHeaderProps>) {
  return (
    <>
      {props.title && <title>{props.title}</title>}
      <Typography
        variant={props.variant ?? "h1"}
        align="center"
        sx={{
          // background: "linear-gradient(in hsl longer hue 90deg, yellow 0 0)",
          background: "linear-gradient(to right, blue, lawnGreen,red,orange,yellow)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          // fontFamily: logoFont.style.fontFamily,
          fontSize: { xs: "2rem", sm: "4rem" },
        }}
      >
        {props.children}
      </Typography>
    </>
  );
}
