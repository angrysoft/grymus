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

interface IGroupProps {
  image: string;
  title: string;
  url: string;
  desc: string;
}

export function Group(props: Readonly<IGroupProps>) {
  return (
    <Paper
      sx={{
        aspectRatio: "1/1",
      }}
    >
      <Stack>
        <Box
          component={"picture"}
          sx={{
            padding: "1rem",
          }}
        >
          <source srcSet={props.url} />
          <img src={props.image} alt={props.title} style={{ width: "100%" }} />
        </Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h3" textAlign={"center"}>
              {props.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails >
            <Typography dangerouslySetInnerHTML={{ __html: props.desc }} sx={{
            fontSize: "1.2rem",
          }}></Typography>
          </AccordionDetails>
        </Accordion>
        <Button href={props.url}>Galeria</Button>
      </Stack>
    </Paper>
  );
}
