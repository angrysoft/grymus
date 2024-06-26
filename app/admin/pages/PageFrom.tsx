"use client";
import {
  Box,
  Button,
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

interface IPageFromProps {
  id?: number;
  title?: string;
  content?: string;
  enabled?: boolean;
}

export function PageFrom(props: Readonly<IPageFromProps>) {
  const editorRef = useRef<any>(null);
  const [pageTitle, setPageTitle] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
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

      console.log(pagesData, res);

      if (!res.ok) {
        setError("Nie udało się zapisać ");
        return;
      }
      const result = await res.json();
      if (result.status === "error") {
        setError(result.error);
        return;
      }
      router.push("/admin/pages");
    }
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
        id="title"
        name="title"
        label="Tytuł Strony"
        defaultValue={null}
        fullWidth
        required
        onChange={(ev) => setPageTitle(ev.target.value)}
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
              defaultChecked={props.enabled}
              onChange={(ev: any) => setEnabled(ev.target.value)}
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
          {`${window.location.origin}/strony/${createSlug(pageTitle)}`}
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
        }}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={props.content}
      />
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
