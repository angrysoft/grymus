"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useSWR from "swr";
import { Loader } from "../../(main)/components/Loader";
import { fetcher } from "../../lib/fetcher";
import { UsersData } from "../../models/users-data";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "active", headerName: "Aktywny", flex: 1, type: "boolean" },
];

export default function DataTable() {
  const { data } = useSWR<UsersData>("/api/admin/users", fetcher);
  const router = useRouter();

  if (!data) {
    return <Loader />;
  }

  return (
    <Box>
      <DataGrid
        rows={data.result}
        columns={columns}
        autoHeight
        disableColumnMenu
        disableColumnResize
        disableColumnFilter
        disableColumnSorting
        disableColumnSelector
        onRowDoubleClick={(ev) =>
          router.push(`/admin/users/edit/${ev.id}`, { scroll: false })
        }
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[50, 100]}
        // checkboxSelection
      />
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
        href="/admin/users/add"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}