"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useSWR from "swr";
import { Loader } from "../../(main)/components/Loader";
import { fetcher } from "../../lib/fetcher";
import { UsersData } from "../../models/users-data";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "email", headerName: "Email" },
  { field: "active", headerName: "Aktywny" },

];

export default function DataTable() {
  const { data } = useSWR<UsersData>("/api/admin/users", fetcher);

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
        onCellDoubleClick={(ev) => console.log(ev)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
        checkboxSelection
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
