import { Box, Button } from "@mui/material";
import ConfirmDialog from "./Confirm";
import { useState } from "react";

interface ISaveDeleteProps {
  delateAction: (id: number | undefined) => void;
  id?: number;
  working?: boolean;
}

export function SaveDelete(props: Readonly<ISaveDeleteProps>) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Button
        variant="contained"
        type="submit"
        sx={{
          width: "fit-content",
        }}
        disabled={props.working}
      >
        Zapisz
      </Button>
      {props.id && (
        <>
          <ConfirmDialog
            agreeAction={() => props.delateAction(props.id)}
            msg={"Czy na pewno chcesz usunąć jest to operacja nieodwracalna ?"}
            open={confirmOpen}
            closeHandler={setConfirmOpen}
            title="Uwaga !"
            color="error"
          />
          <Button
            variant="contained"
            type="button"
            sx={{
              width: "fit-content",
            }}
            color="secondary"
            onClick={() => setConfirmOpen(true)}
            disabled={props.working}
          >
            Usuń
          </Button>
        </>
      )}
    </Box>
  );
}
