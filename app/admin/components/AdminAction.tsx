import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

interface IAdminActionProps {
  name: string;
  url: string;
}
export function AdminAction(props: Readonly<IAdminActionProps>) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <ArrowForwardIosIcon />
        </ListItemIcon>
        <Link
          href={props.url}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <ListItemText
            primary={props.name}
            primaryTypographyProps={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              letterSpacing: 0,
            }}
          />
        </Link>
      </ListItemButton>
    </ListItem>
  );
}
