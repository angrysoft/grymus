"use client";
import { Love_Ya_Like_A_Sister, Sriracha, Kalam } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const sriracha = Sriracha({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const headerFont = Love_Ya_Like_A_Sister({
  weight: ["400"],
  subsets: ["latin"],
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    accents: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    accents?: React.CSSProperties;
    headers?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    accents: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: kalam.style.fontFamily,
    accents: {
      fontFamily: sriracha.style.fontFamily,
    },
    h1: {
      fontFamily: headerFont.style.fontFamily,
    },
    h2: {
      fontFamily: headerFont.style.fontFamily,
    },
    h3: {
      fontFamily: headerFont.style.fontFamily,
    },
    h4: {
      fontFamily: headerFont.style.fontFamily,
    },
  },
});

export default theme;
