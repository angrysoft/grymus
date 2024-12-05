"use client";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SaveDelete } from "../components/SaveDelete";

interface IPageFromProps {
  id?: number;
  email?: string;
  active?: boolean;
}

export function UserFrom(props: Readonly<IPageFromProps>) {
  const [active, setActive] = useState(props.active ?? false);
  const [error, setError] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwd2, setPasswd2] = useState("");
  const router = useRouter();
  const [working, setWorking] = useState(false);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (passwd !== passwd2) return;
    setWorking(true);
    setError("");
    const form = new FormData(ev.target as HTMLFormElement);

    const userData = {
      email: form.get("username"),
      active: form.get("active") === "on",
      password: form.get("password"),
      password2: form.get("password2"),
    };

    let url = "/api/admin/users";
    let method = "POST";
    if (props.id) {
      url += `/${props.id}`;
      method = "PUT";
    } else if (!userData.password) {
      setError("Brak hasła");
      setWorking(false);
      return;
    }

    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      router.push("/admin/users", { scroll: false });
    } else {
      setError("Nie udało się zapisać ");
    }
    setWorking(false);
  };

  const deleteUser = async (id: number | undefined) => {
    if (!id) return;
    setWorking(true);
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/admin/users", { scroll: false });
    } else {
      setError("Nie udało się usunąć");
    }
    setWorking(false);
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
      }}
    >
      <Typography color={"error"} variant="h5">
        {error}
      </Typography>
      <TextField
        id="email"
        name="username"
        label="Email"
        type="email"
        defaultValue={props.email}
        required
      />
      <Divider />
      <FormGroup sx={{ display: "flex", gap: "1rem" }}>
        {passwd !== passwd2 && (
          <Typography color={"error"}>Hasła się różnią</Typography>
        )}
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={passwd}
          onChange={(ev) => setPasswd(ev.target.value)}
        />
        <TextField
          id="password2"
          name="password2"
          label="Password2"
          type="password"
          value={passwd2}
          onChange={(ev) => setPasswd2(ev.target.value)}
        />
      </FormGroup>
      <Divider />
      <FormControl
        variant="outlined"
        sx={{
          width: "fit-content",
        }}
      >
        <FormControlLabel
          control={
            <Switch
              name="active"
              checked={active}
              onChange={(ev: any) => setActive(ev.target.checked)}
            />
          }
          label="Aktywny"
        />

        <FormHelperText id="my-helper-text">
          Zaznacz aby użytkownik mogł się logować.
        </FormHelperText>
      </FormControl>
      <Divider />

      <SaveDelete id={props.id} delateAction={deleteUser} working={working} />
    </Box>
  );
}
