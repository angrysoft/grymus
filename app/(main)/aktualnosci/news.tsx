import { Box, Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";

interface INewsShortProps {
  title:string;
  short:string;
  slug:string;
}
export function NewsShort(props: INewsShortProps) {
  return (
    <Card elevation={5}>
      <CardHeader title={props.title}/>
      <CardContent dangerouslySetInnerHTML={{ __html:props.short }} />
      <CardActions><Button href={`/aktualnosci/${props.slug}`}>Czytaj wiecej</Button></CardActions>
    </Card>
  )
}