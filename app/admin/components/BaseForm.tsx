import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppBar, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IBaseForm {
  backTo: string;
  title: string;
  children: ReactNode;
}

export function BaseForm(props: Readonly<IBaseForm>) {
  return (
    <Paper>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href={props.backTo}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {props.children}
    </Paper>
  );
}
