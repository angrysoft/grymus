"use client";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { SaveDelete } from "../components/SaveDelete";

interface IGalleryFromProps {
  id?: number;
  name?: string;
  slug?: string;
  items?: string;
}

export function GalleryForm(props: Readonly<IGalleryFromProps>) {
  const editorRef = useRef<any>(null);
  const [pageName, setPageName] = useState(props.name ?? "");
  const [error, setError] = useState("");
  const router = useRouter();
  const [working, setWorking] = useState(false);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setWorking(true);
    setError("");
    const form = new FormData(ev.target as HTMLFormElement);

      const galleryData = {
        name: form.get("name"),
        items: form.get("items")
      };

      let url = "/api/admin/gallery";
      let method = "POST";
      if (props.id) {
        url += `/${props.id}`;
        method = "PUT";
      }
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(galleryData),
      });

      if (res.ok) {
        router.push("/admin/gallery", { scroll: false });
      } else {
        setError("Nie udało się zapisać ");
      }
      setWorking(false);
  };

  const nameChange = (name: string) => {
    setPageName(name);
  };

  const deleteGallery = async (id: number | undefined) => {
    if (!id) return;
    setWorking(true);

    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/admin/gallery", { scroll: false });
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
        id="name"
        name="name"
        label="Nazwa Galerii"
        value={pageName}
        fullWidth
        required
        onChange={(ev) => nameChange(ev.target.value)}
      />
      <Divider />
      <SaveDelete id={props.id} delateAction={deleteGallery} working={working} />
    </Box>
  );
}
