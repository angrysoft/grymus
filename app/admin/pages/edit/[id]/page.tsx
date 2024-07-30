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
import { BaseForm } from "../../../components/BaseForm";

export default function EditPage({
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
    <BaseForm backTo="/admin/pages" title="Dodaj Stronę">
      <PageFrom
        title={title}
        content={content}
        enabled={enabled}
        id={id}
        slug={slug}
      />
    </BaseForm>
  );
}
