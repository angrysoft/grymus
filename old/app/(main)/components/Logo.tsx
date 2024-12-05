import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        width: "16rem",
        margin: { xs: "auto", md: "0" },
        padding: "1rem",
      }}
    >
      <Link href="https://grymus.przedszkola.net.pl/">
        <Image
          src={"/images/grymus_logo_250.webp"}
          alt={""}
          width={250}
          height={63}
          style={{
            height: "auto",
            maxWidth: "100%",
          }}
          priority={false}
        />
      </Link>
    </Box>
  );
}
