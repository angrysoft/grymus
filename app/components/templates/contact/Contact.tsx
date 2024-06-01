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
  Typography,
} from "@mui/material";

export function Contact() {
  return (
    <Box>
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
        <Card>
          <CardContent>
            <Typography textAlign="center">
              <PlaceIcon color="primary" sx={{ fontSize: "6rem" }} />
            </Typography>
            <Typography variant="h4">Adres</Typography>
            <Divider />
            <Box
              sx={{
                padding: "1rem",
              }}
            >
              <Typography variant="h6">Przedszkole Miejskie nr 16</Typography>
              <Typography>ul. Karczewska 27A</Typography>
              <Typography>05-400 Otwock</Typography>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography textAlign="center">
              <LocalPhoneIcon color="primary" sx={{ fontSize: "6rem" }} />
            </Typography>
            <Typography variant="h4">Kontakt</Typography>
            <Divider />
            <Box
              sx={{
                padding: "1rem",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <LocalPhoneIcon />
                <Link href="tel:227795411" underline="none">
                  {" "}
                  22-779-54-11
                </Link>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <MailIcon />
                <Link href="mailto:grymus16@wp.pl" underline="none">
                  {" "}
                  grymus16@wp.pl
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography textAlign="center">
              <ScheduleIcon color="primary" sx={{ fontSize: "6rem" }} />
            </Typography>
            <Typography variant="h4">Godziny Otwarcia</Typography>
            <Divider />
            <Box
              sx={{
                padding: "1rem",
              }}
            >
              <Typography variant="h6">6:30 - 17:00</Typography>
            </Box>
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
