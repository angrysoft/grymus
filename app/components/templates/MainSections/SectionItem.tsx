import { Link, Paper, Typography } from "@mui/material";

interface ISectionProps {
  image: string;
  title: string;
  url: string;
}

export function SectionItem(props: Readonly<ISectionProps>) {
  return (
    <Paper
      variant="outlined"
      component="article"
      sx={{
        width: "18rem",
        height: "18rem",
        aspectRatio: "1/1",
        backgroundImage: `url(${props.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1rem",
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
            color: "white",
            textShadow: "1px 1px 2px rgb(0,0,0, 40%)",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            backgroundColor: "primary.main",
          }}
        >
          {props.title}
        </Typography>
      </Link>
    </Paper>
  );
}
