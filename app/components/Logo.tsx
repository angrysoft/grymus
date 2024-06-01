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
        margin: {xs:"auto", md:"0"},
        padding: "1rem",
      }}
    >
      <Link href="https://grymus.przedszkola.net.pl/">
        <Image
          src={"/images/grymus_logo_500.png"}
          alt={""}
          width={500}
          height={126}
          style={{
            height: "auto",
            maxWidth: "100%"
          }}
        />
      </Link>
    </Box>
  );
}
