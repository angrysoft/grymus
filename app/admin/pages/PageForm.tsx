"use client";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
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
  content?: string;
  enabled?: boolean;
}

export function PageFrom(props: Readonly<IPageFromProps>) {
  const editorRef = useRef<any>(null);
  const [pageTitle, setPageTitle] = useState(props.title ?? "");
  const [slug, setSlug] = useState(props.slug ?? "");
  const [enabled, setEnabled] = useState(props.enabled ?? false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [working, setWorking] = useState(false);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setWorking(true);
    setError("");
    const form = new FormData(ev.target as HTMLFormElement);

    if (editorRef.current) {
      const pagesData = {
        title: form.get("title"),
        enabled: form.get("enabled") === "on",
        content: editorRef.current.getContent(),
      };
      editorRef.current.setDirty(false);
      let url = "/api/admin/pages";
      let method = "POST";
      if (props.id) {
        url += `/${props.id}`;
        method = "PUT";
      }
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(pagesData),
      });

      if (res.ok) {
        router.push("/admin/pages", { scroll: false });
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

    const res = await fetch(`/api/admin/pages/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/admin/pages", { scroll: false });
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
        id="title"
        name="title"
        label="Tytuł Strony"
        value={pageTitle}
        fullWidth
        required
        onChange={(ev) => titleChange(ev.target.value)}
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
      {enabled && (
        <Typography sx={{ color: "primary" }}>
          <strong>Link do Strony:</strong>{" "}
          {`${window.location.origin}/strony/${slug}`}
        </Typography>
      )}
      <Divider />
      <Editor
        id="editor"
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
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={props.content}
      />
      <Divider />
      <SaveDelete id={props.id} delateAction={deletePage} working={working} />
    </Box>
  );
}
