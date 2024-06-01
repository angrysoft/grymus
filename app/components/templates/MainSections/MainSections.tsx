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
        justifyContent: "center",
        gap: "3rem",
        flexWrap: "wrap",
        padding: "3rem",
      }}
    >
      <SectionItem
        title="Jadłospis"
        url="/pages/jadlospis"
        image="/images/sections/jadlospis.jpg"
      />

      <SectionItem
        title="Opłaty"
        url="/pages/oplaty"
        image="/images/sections/oplaty.jpg"
      />

      <SectionItem
        title="Galeria"
        url="/pages/galeria"
        image="/images/sections/galeria.jpg"
      />

      <SectionItem
        title="Rekrutacje"
        url="/pages/rekrutacje"
        image="/images/sections/rekrutacje.jpg"
      />
    </Container>
  );
}
