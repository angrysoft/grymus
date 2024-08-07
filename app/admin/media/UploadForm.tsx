"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useContext, useRef, useState } from "react";
import { FileContext } from "./FileContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function UploadForm() {
  const ctx = useContext(FileContext);
  const [file, setFile] = useState<File>();
  const formRef = useRef<HTMLInputElement>(null);
  const [uploadReady, setUploadReady] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/media", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        const result = await res.json();
        console.log(result.created);
        ctx?.setNeedRefresh(true);
      } else {
        throw new Error(await res.text());
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setUploadReady(false);
    }
  };

  const handleFileChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const fileData = e.target as HTMLFormElement;
    setFile(fileData.files[0]);
    setUploadReady(true);
    console.log(fileData.files[0]);
  };

  const resetForm = () => {
    setUploadReady(false);
    if (formRef.current) formRef.current.value = "";
    setFile(undefined);
  };

  return (
    <Box
      sx={{
        position: "relative",
        padding: "1rem",
      }}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          gap: "1rem",
          width: "100%",
        }}
      >
        <Typography variant="h4" component="h4">
          Dodaj nowe pliki
        </Typography>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          disabled={uploadReady ?? false}
        >
          Dodaj nowe
          <VisuallyHiddenInput
            accept="image/*|application/pdf"
            name="file"
            type="file"
            ref={formRef}
            onChange={handleFileChange}
          />
        </Button>
        {uploadReady && (
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <span>{file?.name}</span>
            <Button variant="contained" type="reset" onClick={resetForm}>
              Anuluj
            </Button>
            <Button variant="contained" type="submit">
              Wyślij
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
