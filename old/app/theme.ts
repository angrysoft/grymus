"use client";
import { purple, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Kalam, Love_Ya_Like_A_Sister, Sriracha } from "next/font/google";

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

declare module "@mui/material/" {
  interface TypeBackground {
    section: string,
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
  palette: {
    primary: {
      main: purple[500],
      contrastText: "#fff",
    },
    secondary: {
      main: "#f44336",
    },
    background: {
      section: purple[500],
    }
  },
});

const themeBiggerFont = createTheme({
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
    fontSize: 16,
    // htmlFontSize: 32,
  },
  palette: {
    primary: {
      main: purple[500],
      contrastText: "#fff",
    },
    secondary: {
      main: "#f44336",
    },
    background: {
      section: purple[500],
    }
  },
});

const contrastTheme = createTheme({
  palette: {
    primary: {
      main: "#FFFF00",
      contrastText: "#FFFF00",
    },
    secondary: {
      main: yellow[500],
    },
    background: {
      default: "black",
      paper: "black",
      section: "black",
    },
    text: {
      primary: "#FFFF00",
      secondary: "#FFFF00",
    },
  },
});

export { contrastTheme, themeBiggerFont };
export default theme;
