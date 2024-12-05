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
  { name: "Home", url: "/", scroll:false },
  { name: "Aktualności", url: "/aktualnosci", scroll:false },
  { name: "Strefa rodzica", url: "/strefa-rodzica", scroll:false },
  { name: "Grupy", url: "/grupy", scroll:false },
  { name: "O nas", url: "/o-nas", scroll:false },
  { name: "Kontakt", url: "/#kontakt", scroll:true },
];

function Menu(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center"}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding:"2rem 0",
          gap:"1rem",
        }}
      >
        {navItems.map((item) => (
          <MenuItem
            name={item.name}
            url={item.url}
            key={item.name}
            color={`hsl(${Math.floor(Math.random() * 360)} 100%, 50%)`}
            scroll={item.scroll}
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
                scroll={item.scroll}
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
