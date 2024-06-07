import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import theme from "../theme";
import { Container, Box, Toolbar } from "@mui/material";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "Grymuś",
  description: "Przedszkole Miejskie nr 16 Grymuś w Otwocku",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        scrollBehavior: "smooth",
      }}
    >
      <body
        style={{
          backgroundImage: "url(/images/bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
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
                {children}
              </Box>
              <Footer />
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
