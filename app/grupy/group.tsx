import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface IGroupProps {
  children: React.ReactNode;
  image: string;
  title: string;
  url: string;
}

export function Group(props: Readonly<IGroupProps>) {
  return (
    <Card
      sx={{
        minWidth: "18rem",
      }}
    >
      <CardMedia
        image={props.image}
        sx={{
          height: "50%",
        }}
      />
      <CardContent>
        <Typography variant="h3">{props.title}</Typography>
        {props.children}
      </CardContent>
      <CardActions>
        <Button href={props.url}>Galeria</Button>
      </CardActions>
    </Card>
  );
}
