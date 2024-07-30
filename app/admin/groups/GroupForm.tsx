"use client";
import {
  Box,
  Divider,
  TextField,
  Typography
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { SaveDelete } from "../components/SaveDelete";

interface IPageFromProps {
  id?: number;
  name?: string;
  image?: string;
  desc?: string;
  sort?: number;
}

export function GroupForm(props: Readonly<IPageFromProps>) {
  const editorRef = useRef<any>(null);

  const [error, setError] = useState("");
  const router = useRouter();
  const [working, setWorking] = useState(false);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setWorking(true);
    setError("");
    const form = new FormData(ev.target as HTMLFormElement);
    if (editorRef.current) {
      const groupData = {
        name: form.get("name"),
        desc: editorRef.current.getContent(),
        image: form.get("image"),
        sort: form.get("sort"),
      };


      editorRef.current.setDirty(false);
      let url = "/api/admin/groups";
      let method = "POST";
      if (props.id) {
        url += `/${props.id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(groupData),
      });

      if (res.ok) {
        router.push("/admin/groups", { scroll: false });
      } else {
        setError("Nie udało się zapisać ");
      }
    }
    setWorking(false);
  };

  const deleteUser = async (id: number | undefined) => {
    if (!id) return;
    setWorking(true);
    const res = await fetch(`/api/admin/groups/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/admin/groups", { scroll: false });
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
        label="Nazwa"
        defaultValue={props.name}
        required
      />
      <TextField
        id="image"
        name="image"
        label="Url Obrazka"
        defaultValue={props.image}
        required
      />
      <TextField
        id="sort"
        name="sort"
        label="Sort"
        type="number"
        defaultValue={props.sort ?? 0}
        required
      />
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
        initialValue={props.desc}
      />

      <Divider />

      <SaveDelete id={props.id} delateAction={deleteUser} working={working} />
    </Box>
  );
}
