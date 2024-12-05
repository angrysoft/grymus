"use client";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../components/DataTable";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Nazwa", flex: 1 },
  { field: "sort", headerName: "Sort", flex: 1 },
];

export default function GroupTable() {
  return (
    <DataTable columns={columns} api="/api/admin/groups" url="/admin/groups" />
  );
}
