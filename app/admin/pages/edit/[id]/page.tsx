"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppBar, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import useSWR from "swr";
import { Loader } from "../../../../(main)/components/Loader";
import { PageFrom } from "../../PageFrom";
import { DefaultResponse } from "../../../../models/default-response";
import { PageData } from "../../../../models/page-data";
import { fetcher } from "../../../../lib/fetcher";

export default function AddPAge({
  params,
}: Readonly<{ params: { id: number } }>) {
  const { data } = useSWR<DefaultResponse<PageData>>(
    `/api/admin/pages/${params.id}`,
    fetcher,
  );

  if (!data) {
    return <Loader />;
  }

  const { title, content, enabled, id, slug } = { ...data.result };

  return (
    <Paper>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/admin/pages"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dodaj Strone
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <PageFrom
        title={title}
        content={content}
        enabled={enabled}
        id={id}
        slug={slug}
      />
    </Paper>
  );
}
