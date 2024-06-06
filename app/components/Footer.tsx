import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
  Theme,
} from "@mui/material";

export function Footer() {
  return (
    <Box
      component={"footer"}
      sx={{
        // background:
        //   "linear-gradient(90deg, rgb(34,36,50) 0%, rgb(38,49,70) 50%,rgb(11,20,36)  100%)",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        padding: "2rem",
        marginTop: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Box
          component={"footer"}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            // color: ""
          }}
        >
          <Stack useFlexGap spacing={2}>
            <Typography variant="h4">Numery Kont</Typography>
            <Divider color={"secondary.main"}/>
            <Typography>
              Opłatę za wyżywienie
              <br />
              92 8001 0005 2001 0008 0129 0001
            </Typography>
            <Typography>
              Opłata za każdą godzinę ponad wymiar bezpłatnej opieki
              <br />
              65 8001 0005 2001 0008 0129 0002
            </Typography>
          </Stack>
          <Stack useFlexGap spacing={2}>
            <Typography variant="h4">Kontakt</Typography>
            <Divider color={"secondary.main"} />
            <Typography>
              Przedszkole Miejskie nr 16 ul.
              <br />
              Karczewska 27A
              <br />
              05-400 Otwock
            </Typography>
            <Typography>Telefon: 22-779-54-11</Typography>
            <Typography>Email: grymus16@wp.pl</Typography>
          </Stack>
          <Stack useFlexGap spacing={2}>
            <Typography variant="h4">Informacje</Typography>
            <Divider color={"secondary.main"} />
            <Link underline="none" href="/rodo" color={"primary.contrastText"}>
              RODO
            </Link>
            <Link
              underline="none"
              href="/deklaracja-dostepnosci"
              color={"primary.contrastText"}
            >
              Deklaracja Dostępności
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
