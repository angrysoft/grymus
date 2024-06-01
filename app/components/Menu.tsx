"use client";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import * as React from "react";
import { Logo } from "./Logo";
import { MenuItem } from "./MenuItem";

interface Props {}

const drawerWidth = 240;
const navItems = [
  { name: "Aktualności", url: "/aktualnosci" },
  { name: "Strefa rodzica", url: "/strefa-rodzica" },
  { name: "Grupy", url: "/grupy" },
  { name: "O nas", url: "/o-nas" },
  { name: "Kontakt", url: "kontakt" },
];

function Menu(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {navItems.map((item) => (
          <MenuItem
            name={item.name}
            url={item.url}
            key={item.name}
            color={`hsl(${Math.floor(Math.random() * 360)} 100%, 50%)`}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        component="nav"
        color="inherit"
        // elevation={0}
        sx={{
          height: "6rem",
          borderBottom: "2px solid rgba(118,118,118,0.3)",
        }}
        position="fixed"
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: "none" },
              stroke: "white",
              fontSize: "2rem",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Logo />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            {navItems.map((item) => (
              <MenuItem
                name={item.name}
                url={item.url}
                key={item.name}
                color={`hsl(${Math.floor(Math.random() * 360)} 100%, 50%)`}
                variant="text"
              />
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export { Menu };
