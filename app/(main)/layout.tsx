'use client'
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Container, Box, Toolbar, useTheme } from "@mui/material";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Accessibility } from "./components/Accessibility";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeSet = useTheme();
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            minHeight: "100dvh",
          }}
        >
          <Menu />
          <Box
            sx={{
              display: "grid",
              height: "100%",
              width: " 100%",
            }}
          >
            <Toolbar sx={{ height: "6rem" }} />
            <Accessibility
              handleFontNormal={() => {
                theme.typography.htmlFontSize = 1;
                console.log("click", themeSet.typography.fontSize)
              }}
              handleFontBigger={() => themeSet.typography.fontSize = 18}
            />
            {children}
          </Box>
          <Footer />
        </Container>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
