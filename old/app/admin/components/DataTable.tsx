import AddIcon from "@mui/icons-material/Add";
import { Box, Fab } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Loader } from "../../(main)/components/Loader";
import { fetcher } from "../../lib/fetcher";
import { SetStateAction, useState } from "react";

interface IDataTableProps {
  columns: GridColDef[];
  api: string;
  url: string;
}

export function DataTable(props: Readonly<IDataTableProps>) {
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const { data } = useSWR(
    `${props.api}?items=${pageSize}&offset=${offset}`,
    fetcher,
  );
  const router = useRouter();

  if (!data) {
    return <Loader />;
  }

  const handlePaginationChange = (info: {
    page: SetStateAction<number>;
    pageSize: SetStateAction<number>;
  }) => {
    const calculatedOffset = Number(info.page) * Number(info.pageSize);
    setPage(info.page);
    setPageSize(info.pageSize);
    setOffset(calculatedOffset);
  };

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
        disableRowSelectionOnClick
        paginationMode="server"
        rowCount={data.total}
        onPaginationModelChange={handlePaginationChange}
        onPaginationMetaChange={(ev) => console.log(ev)}
        onRowDoubleClick={(ev) =>
          router.push(`${props.url}/edit/${ev.id}`, { scroll: false })
        }
        initialState={{
          pagination: {
            paginationModel: { page: page, pageSize: pageSize },
          },
        }}
        pageSizeOptions={[20, 30, 50]}
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
