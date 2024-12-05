import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IConfirmDialogProps {
  agreeAction: (arg: any) => void;
  closeHandler: (arg: boolean) => void;
  msg: string;
  title?: string;
  open: boolean;
  color?:string;
}

export default function ConfirmDialog(props: Readonly<IConfirmDialogProps>) {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.closeHandler(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" color={props.color ?? ""}>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" color={props.color ?? ""}>
          {props.msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.closeHandler(false)}>Anuluj</Button>
        <Button onClick={props.agreeAction} autoFocus>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
