import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import theme from "../theme";
import { AdminAction } from "./components/AdminAction";
import { IconButton } from "@mui/material";
import { signOut } from "next-auth/react";
import { AdminBar } from "./components/AdminBar";

export const metadata = {
  title: "Admin",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const drawerWidth = 240;

  return (
    <html lang="pl">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <AdminBar drawerWidth={drawerWidth} />
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                variant="permanent"
                anchor="left"
              >
                <List>
                  <AdminAction name="Strony" url="/admin/pages" />
                </List>
              </Drawer>
              <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
              >
                <Toolbar />
                {children}
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
