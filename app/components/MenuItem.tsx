import { Button, Typography } from "@mui/material";

interface IMenuProps {
  name: string;
  url: string;
  color: string;
  variant?: "text" | "outlined" | "contained";
}

export function MenuItem(props: Readonly<IMenuProps>) {
  return (
    <Button
      sx={{
        fontSize: "1.2rem",
        color: props.color,
        textShadow:
          "-1px 1px 0 rgb(0 0 0 / 75%),1px 1px 0 rgb(0 0 0 / 75%),1px -1px 0 rgb(0 0 0 / 75%),-1px -1px 0 rgb(0 0 0 / 75%)",
      }}
      href={props.url}
      variant={props.variant ?? "text"}
    >
      <Typography variant="accents" sx={{ letterSpacing: "2px" }}>
        {props.name}
      </Typography>
    </Button>
  );
}
