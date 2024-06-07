"use client";
import { Link, Paper, Typography, alpha } from "@mui/material";
import theme from "../../../../theme";

interface ISectionProps {
  image: string;
  title: string;
  url: string;
}

export function SectionItem(props: Readonly<ISectionProps>) {
  return (
    <Paper
      // variant="outlined"
      component="article"
      sx={{
        width: "18rem",
        height: "18rem",
        aspectRatio: "1/1",
        backgroundImage: `url(${props.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1rem",
        margin: "auto",
      }}
    >
      <Link
        href={props.url}
        underline="none"
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "end",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "primary.contrastText",
            textShadow: "1px 1px 2px rgb(0,0,0, 40%)",
            padding: "0.5rem",
            borderRadius: "0.3rem",
            backgroundColor: alpha(theme.palette.secondary.main, 0.5),
          }}
        >
          {props.title}
        </Typography>
      </Link>
    </Paper>
  );
}
