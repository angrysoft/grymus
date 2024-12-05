"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { signOut } from "next-auth/react";

export function AdminBar({ drawerWidth }: Readonly<{ drawerWidth: number }>) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h6" component="div">
          Panel Administracyjny Grymuś.
        </Typography>
        <IconButton onClick={() => signOut()}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
