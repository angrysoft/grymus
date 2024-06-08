"use client";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setError("");
    const formData = new FormData(ev.target as HTMLFormElement);
    const result = await signIn("credentials", {
      password: formData.get("password"),
      username: formData.get("username"),
      callbackUrl: "/admin",
      redirect: false,
    });
    if (result?.ok) {
      router.replace("/admin");
    } else {
      setError("Nieoprawny login lub hasło");
    }
  };
  return (
    <Container
      component={"main"}
      sx={{
        display: "grid",
        placeContent: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "2rem",
        }}
        component={"form"}
        onSubmit={login}
      >
        <Typography variant="h4">Logowanie</Typography>
        <TextField
          id="username"
          label="Login"
          name="username"
          error={error.length > 0}
          helperText={error}
          fullWidth
          required
        />
        <TextField
          id="password"
          label="Hasło"
          name="password"
          type="password"
          error={error.length > 0}
          helperText={error}
          fullWidth
          required
        />
        <Button variant="contained" type="submit">
          Zaloguj
        </Button>
      </Paper>
    </Container>
  );
}
