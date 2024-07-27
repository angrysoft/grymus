import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { MainSections } from "./components/templates/MainSections/MainSections";
import { Contact } from "./components/templates/contact/Contact";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5rem",
      }}
    >
      <Container maxWidth="xl" component="section">
        <Paper sx={{ paddingTop: "3rem" }} elevation={0}>
          <Header>Przedszkole Miejskie nr 16 Grymuś w Otwocku</Header>
        </Paper>
      </Container>
      <Background
        opacity={0.8}
        sx={{
          padding: "3rem",
        }}
      >
        <Container maxWidth="xl" component="section">
          <Box
            sx={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" },
              alignItems: "center",
            }}
          >
            <Card variant="elevation" component="article">
              <CardContent>
                <Typography variant="h3" component="h2">
                  Historia
                </Typography>
                <Typography>
                  Nasze przedszkole istnieje od 1981r. Opiekę nad dziećmi
                  sprawował 21-osobowy zespół pracowników pod czułym i sprawnym
                  nadzorem p. dyr. Aliny Żelazko. Przedszkolem od sierpnia
                  1991r. kierowała Alicja Karczewska. W celu zmniejszenia ilości
                  dzieci w poszczególnych grupach w 1996 roku placówka została
                  przekształcona w przedszkole 5-oddziałowe. Od września 2009r.
                  w naszym przedszkolu utworzono szósty oddział. Wszystkim
                  grupom nadaliśmy nazwy i od początku roku szkolnego dzieci
                  bawią się w salach : ,,Pszczółki", ,,Mrówki", ,,Żaby",
                  ,,Wieloryby", ,,Żyrafy" i ,,Koty". Od 2001r. przedszkole nosi
                  nazwę „Grymuś” ( od słów: gry muzyka, śpiew). 1 września
                  2004r. w drodze konkursu stanowisko dyrektora objęła mgr
                  Małgorzata Olszowa. W 2006r. uroczyście obchodziliśmy 25 –
                  lecie działalności naszego przedszkola. 1 września 2015r. w
                  drodze konkursu stanowisko dyrektora objęła mgr Dominika
                  Kudlicka.
                </Typography>
              </CardContent>
            </Card>
            <Image
              src={"/images/zespol.jpg"}
              alt={""}
              width={587}
              height={256}
              style={{
                height: "auto",
                width: "100%",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            />
          </Box>
        </Container>
      </Background>
      <Container maxWidth="lg" component="section">
        <Card variant="outlined" component="article">
          <CardContent>
            <Typography variant="h3" component="h2">
              Wizja przedszkola
            </Typography>
            <Typography>
              Naszym celem jest aby każde dziecko w przedszkolu czuło się
              bezpieczne, akceptowane, aby spędzało czas w życzliwej, dobrej
              atmosferze. Dążymy do tego, aby dzieci rozwijały swoją aktywność
              twórczą poprzez działalność plastyczną, taniec i śpiew. Aby były
              niezwykle pomysłowe, miały bogaty słownik. W całokształcie naszej
              pracy na pierwszym miejscu stawiamy dziecko – jego dobro, poznanie
              wychowanków i planowanie działań w danej grupie tak, aby każde
              dziecko mogło rozwijać się harmonijnie i osiągać sukcesy na miarę
              swoich możliwości rozwojowych.
            </Typography>
            <CardActions>
              <Button href="/strony/koncepcja-pracy-przedszkola" size="small">
                Czytaj wiecej
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Container>
      <Background opacity={0.8}>
        <MainSections />
      </Background>
      <Contact />
    </Box>
  );
}
