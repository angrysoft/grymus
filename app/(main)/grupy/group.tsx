import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface IGroupProps {
  image: string;
  title: string;
  url: string;
  desc: string;
}

export function Group(props: Readonly<IGroupProps>) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Paper
      sx={{
        aspectRatio: "1/1",
        width: "400px",
      }}
    >
      <Stack>
        <Box
          component={"picture"}
          sx={{
            padding: "1rem",
          }}
          onClick={() => setExpanded((expanded) => !expanded)}
        >
          <source srcSet={props.url} />
          <img src={props.image} alt={props.title} style={{ width: "100%" }} />
        </Box>
        <Accordion expanded={expanded}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={props.title}
            id={props.title}
            onClick={() => setExpanded((expanded) => !expanded)}
          >
            <Typography variant="h3" textAlign={"center"}>
              {props.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              dangerouslySetInnerHTML={{ __html: props.desc }}
              sx={{
                fontSize: "1.2rem",
              }}
            ></Typography>
          </AccordionDetails>
        </Accordion>
        <Button href={props.url}>Galeria</Button>
      </Stack>
    </Paper>
  );
}
