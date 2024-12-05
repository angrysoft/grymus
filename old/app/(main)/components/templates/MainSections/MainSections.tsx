import {
  Container
} from "@mui/material";
import { SectionItem } from "./SectionItem";

export function MainSections() {
  return (
    <Container
      maxWidth="lg"
      component="section"
      sx={{
        display: "flex",
        // justifyContent: "space-between",
        gap: "3rem",
        flexWrap: "wrap",
        padding: "3rem 0",
      }}
    >
      <SectionItem
        title="Jadłospis"
        url="/strony/jadlospis"
        image="/images/sections/jadlospis.jpg"
      />

      <SectionItem
        title="Opłaty"
        url="/strony/oplaty"
        image="/images/sections/oplaty.jpg"
      />

      <SectionItem
        title="Galeria"
        url="/strony/galeria"
        image="/images/sections/galeria.jpg"
      />

      <SectionItem
        title="Rekrutacje"
        url="/strony/rekrutacje"
        image="/images/sections/rekrutacje.jpg"
      />
    </Container>
  );
}
