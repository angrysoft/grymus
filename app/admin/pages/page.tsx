"use client";
import useSWR from "swr";
import { Loader } from "../../(main)/components/Loader";
import { fetcher } from "../../lib/fetcher";

import AddIcon from "@mui/icons-material/Add";
import { Box, Fab } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { PagesData } from "../../models/pages";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "Tytuł", flex: 1 },
  { field: "enabled", headerName: "Opublikowane", type: "boolean", flex: 1 },
];

export default function Pages() {
  const { data } = useSWR<PagesData>("/api/admin/pages", fetcher);
  const router = useRouter();

  if (!data) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
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
          router.push(`/admin/pages/edit/${ev.id}`, { scroll: false })
        }
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
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
        href="/admin/pages/add"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
