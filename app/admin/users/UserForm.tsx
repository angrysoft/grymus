"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

interface IPageFromProps {
  id?: number;
  email?: string;
  active?: boolean;
}

export function UserFrom(props: Readonly<IPageFromProps>) {
  const editorRef = useRef<any>(null);
  const [active, setActive] = useState(props.active ?? false);
  const [error, setError] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwd2, setPasswd2] = useState("");
  const [passwdErr, setPasswdErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (passwd !== passwd2) return;
    
    setError("");
    const form = new FormData(ev.target as HTMLFormElement);

    if (editorRef.current) {
      const userData = {
        email: form.get("email"),
        active: form.get("active") === "on",
        password: form.get("password"),
        password2: form.get("password2"),
      };

      editorRef.current.setDirty(false);
      let url = "/api/admin/users";
      let method = "POST";
      if (props.id) {
        url += `/${props.id}`;
        method = "PUT";
      }
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        setError("Nie udało się zapisać ");
        return;
      }
      const result = await res.json();
      if (result.status === "error") {
        setError(result.error);
        return;
      }
      router.push("/admin/users", { scroll: false });
    }
  };

  const changePasswd = (ev: any) => {
    setPasswd(ev.target.value);
    if (passwd != passwd2) {
      setPasswdErr(true);
    }
    setPasswdErr(false);
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
      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        defaultValue={props.email}
        required
      />
      <Divider />
      <FormGroup sx={{ display: "flex", gap: "1rem" }}>
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          defaultValue=""
          error={passwdErr}
          onChange={changePasswd}
        />
        <TextField
          id="password2"
          name="password2"
          label="Password2"
          type="password"
          defaultValue=""
          error={passwdErr}
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

      <Button
        variant="contained"
        type="submit"
        sx={{
          width: "fit-content",
        }}
      >
        Zapisz
      </Button>
    </Box>
  );
}
