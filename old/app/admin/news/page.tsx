"use client";

import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../components/DataTable";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "Tytuł", flex: 1 },
  { field: "enabled", headerName: "Opublikowane", type: "boolean", flex: 1 },
  { field: "pined", headerName: "Przypięte", type: "boolean", flex: 1 },
];

export default function News() {
  
  return (
    <DataTable columns={columns} api="/api/admin/news" url="/admin/news" />
  );
}
