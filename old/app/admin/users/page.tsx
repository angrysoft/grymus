"use client";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../components/DataTable";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "active", headerName: "Aktywny", flex: 1, type: "boolean" },
];

export default function UserTable() {

  return (
    <DataTable columns={columns} api="/api/admin/users" url="/admin/users" />
  );
}
