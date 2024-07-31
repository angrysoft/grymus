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
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { createSlug } from "../../lib/utils";
import { SaveDelete } from "../components/SaveDelete";

interface IPageFromProps {
  id?: number;
  title?: string;
  slug?: string;
  enabled?: boolean;
  short?: string;
  content?: string;
  pined?: boolean;
  updatedAt?: string;
}

export function NewsForm(props: Readonly<IPageFromProps>) {
  const shortRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const [pageTitle, setPageTitle] = useState(props.title ?? "");
  const [slug, setSlug] = useState(props.slug ?? "");
  const [enabled, setEnabled] = useState(props.enabled ?? false);
  const [pined, setPined] = useState(props.pined ?? false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [working, setWorking] = useState(false);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setWorking(true);
    setError("");
    const form = new FormData(ev.target as HTMLFormElement);

    if (contentRef.current && shortRef.current) {
      const newsData = {
        title: form.get("title"),
        enabled: form.get("enabled") === "on",
        content: contentRef.current.getContent(),
        short: shortRef.current.getContent(),
        pined: form.get("pined") === "on",
      };

      contentRef.current.setDirty(false);
      shortRef.current.setDirty(false);

      let url = "/api/admin/news";
      let method = "POST";
      if (props.id) {
        url += `/${props.id}`;
        method = "PUT";
      }
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(newsData),
      });

      if (res.ok) {
        router.push("/admin/news", { scroll: false });
      } else {
        setError("Nie udało się zapisać ");
      }
      setWorking(false);
    }
  };

  const titleChange = (title: string) => {
    setPageTitle(title);
    setSlug(createSlug(title));
  };

  const deletePage = async (id: number | undefined) => {
    if (!id) return;
    setWorking(true);

    const res = await fetch(`/api/admin/news/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/admin/news", { scroll: false });
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
      {props.id && (
        <>
          <Typography variant="h5">
            Ostatnia Aktualizacja: {new Date(props.updatedAt ?? "").toLocaleString()}
          </Typography>
          <Divider />
        </>
      )}
      <TextField
        id="title"
        name="title"
        label="Tytuł Newsa"
        value={pageTitle}
        fullWidth
        required
        onChange={(ev) => titleChange(ev.target.value)}
      />
      <Divider />
      <Typography variant="h6">Skrót</Typography>
      <Editor
        id="short"
        apiKey="ajul7zksmk772je0mygzjbkk63ivqdvxlqf0fw2r1r2cwz5y"
        init={{
          plugins:
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
          imagetools_toolbar: "editimage imageoptions",
          menubar: "file edit view insert format tools table help",
          toolbar:
            "undo redo | accordion accordionremove | blocks fontsize | bold italic underline strikethrough | align numlist bullist | link anchor image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | preview",
          tinycomments_mode: "embedded",
          height: 400,
          language: "pl",
        }}
        onInit={(evt, editor) => (shortRef.current = editor)}
        initialValue={props.short}
      />
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
              name="enabled"
              checked={enabled}
              onChange={(ev: any) => setEnabled(ev.target.checked)}
            />
          }
          label="Opublikowana"
        />
        <FormHelperText id="my-helper-text">
          Zaznacz aby strona była widoczna.
        </FormHelperText>
      </FormControl>
      <FormControl
        variant="outlined"
        sx={{
          width: "fit-content",
        }}
      >
        <FormControlLabel
          control={
            <Switch
              name="pined"
              checked={pined}
              onChange={(ev: any) => setPined(ev.target.checked)}
            />
          }
          label="Przypiety"
        />

        <FormHelperText id="my-helper-text">
          Zaznacz aby news był przypiety na gorze strony.
        </FormHelperText>
      </FormControl>
      {enabled && (
        <Typography sx={{ color: "primary" }}>
          <strong>Link do Strony:</strong>{" "}
          {`${window.location.origin}/strony/${slug}`}
        </Typography>
      )}
      <Divider />
      <Typography variant="h6">Treść</Typography>
      <Editor
        id="content"
        apiKey="ajul7zksmk772je0mygzjbkk63ivqdvxlqf0fw2r1r2cwz5y"
        init={{
          plugins:
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
          imagetools_toolbar: "editimage imageoptions",
          menubar: "file edit view insert format tools table help",
          toolbar:
            "undo redo | accordion accordionremove | blocks fontsize | bold italic underline strikethrough | align numlist bullist | link anchor image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | preview",
          tinycomments_mode: "embedded",
          height: 800,
          language: "pl",
        }}
        onInit={(evt, editor) => (contentRef.current = editor)}
        initialValue={props.content}
      />
      <Divider />
      <SaveDelete id={props.id} delateAction={deletePage} working={working} />
    </Box>
  );
}
