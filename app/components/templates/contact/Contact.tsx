import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import PlaceIcon from "@mui/icons-material/Place";
import ScheduleIcon from "@mui/icons-material/Schedule";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";

export function Contact() {
  return (
    <Box>
      <Container
        maxWidth="lg"
        component="section"
        sx={{
          // display: "flex",
          // justifyContent: "center",
          // flexWrap: "wrap",
          // padding: "3rem",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          gap: "3rem",
        }}
      >
        <Card>
          <CardContent>
            <Typography textAlign="center">
              <PlaceIcon color="primary" sx={{ fontSize: "6rem" }} />
            </Typography>
            <Typography variant="h4" textAlign="center">
              Adres
            </Typography>
            <Divider sx={{ margin: "1rem" }} />
            <Stack useFlexGap spacing={1} justifyContent="center">
              <Typography variant="h6" textAlign="center">Przedszkole Miejskie nr 16</Typography>
              <Typography textAlign="center">ul. Karczewska 27A</Typography>
              <Typography textAlign="center">05-400 Otwock</Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography textAlign="center">
              <LocalPhoneIcon color="primary" sx={{ fontSize: "6rem" }} />
            </Typography>
            <Typography variant="h4" textAlign="center">
              Kontakt
            </Typography>
            <Divider sx={{ margin: "1rem" }} />
            <Stack useFlexGap spacing={1} justifyContent="center">
              <Typography
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <LocalPhoneIcon />
                <Link
                  href="tel:227795411"
                  underline="none"
                  color={"text.primary"}
                >
                  {" "}
                  22-779-54-11
                </Link>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MailIcon />
                <Link
                  href="mailto:grymus16@wp.pl"
                  underline="none"
                  color={"text.primary"}
                >
                  {" "}
                  grymus16@wp.pl
                </Link>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography textAlign="center">
              <ScheduleIcon color="primary" sx={{ fontSize: "6rem" }} />
            </Typography>
            <Typography variant="h4" textAlign="center">
              Godziny Otwarcia
            </Typography>
            <Divider sx={{ margin: "1rem" }} />
            <Stack useFlexGap spacing={1} justifyContent="center">
              <Typography variant="h6" textAlign="center">
                6:30 - 17:00
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
      <Container
        maxWidth="lg"
        component="section"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap",
          padding: "3rem",
        }}
      >
        <Card
          sx={{
            width: "100%",
          }}
        >
          <CardContent>
            <iframe
              title="maps"
              width="100%"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
              src="https://maps.google.pl/maps?f=q&source=s_q&hl=pl&geocode=&q=Grymu%C5%9B.+Przedszkole+nr+16+ul.+Karczewska+27A+05-400+Otwock&aq=&sll=52.102472,21.264124&sspn=0.023171,0.065875&ie=UTF8&hq=Grymu%C5%9B.+Przedszkole+nr+16+ul.&hnear=Karczewska+27A,+Otwock,+otwocki,+mazowieckie&t=m&ll=52.10247,21.264128&spn=0.006295,0.006295&output=embed"
            ></iframe>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
