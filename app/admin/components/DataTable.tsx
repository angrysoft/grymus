import AddIcon from "@mui/icons-material/Add";
import { Box, Fab } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Loader } from "../../(main)/components/Loader";
import { fetcher } from "../../lib/fetcher";

interface IDataTableProps {
  columns: GridColDef[];
  api: string;
  url: string;
}

export function DataTable(props: Readonly<IDataTableProps>) {
  const { data } = useSWR(props.api, fetcher);
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
        columns={props.columns}
        autoHeight
        disableColumnMenu
        disableColumnResize
        disableColumnFilter
        disableColumnSorting
        disableColumnSelector
        onRowDoubleClick={(ev) =>
          router.push(`${props.url}/edit/${ev.id}`, { scroll: false })
        }
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
      />
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
        href={`${props.url}/add`}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
