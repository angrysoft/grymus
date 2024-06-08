"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppBar, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { PageFrom } from "../PageFrom";

export default function AddPAge() {


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
            href="/admin/pages"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dodaj Strone
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <PageFrom />
    </Paper>
  );
}
