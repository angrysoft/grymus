"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { Loader } from "../../(main)/components/Loader";
import { fetcher } from "../../lib/fetcher";
import { FilesData, FilesDataItem } from "../../models/files-data";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface ImageItem {
  id: number;
  name: string;
  miniature: string;
  size: number;
}

export function FileBrowser() {
  const pageSize = 20;
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const { data } = useSWR<FilesData>(
    `/api/media?items=${pageSize}&offset=${offset}`,
    fetcher,
  );

  useEffect(() => {
    if (data?.total && (data?.total ?? 0) > 0) {
      setPageCount(Math.ceil(data.total / pageSize));
    }
  }, [data]);

  if (!data) return <Loader />;

  const handlePaginationChange = (ev: ChangeEvent<unknown>, page: number) => {
    const calculatedOffset = Number(page) * Number(pageSize);
    setPage(page);
    setOffset(calculatedOffset);
  };

  const fileList = data.result?.map((item: FilesDataItem) => {
    return (
      <Card sx={{ maxWidth: 300 }} key={item.id}>
        <CardMedia
          sx={{ height: 300 }}
          image={["/files", item.icon].join("/")}
          title={item.name}
        />
        <CardContent>
          <Stack useFlexGap spacing={1}>
            <Typography>
              <strong>Nazwa: </strong>
              {item.name}
            </Typography>
            <Typography>
              <strong>Rozmiar: </strong>
              {(Number(item.size) / 1000000).toFixed(2)} mb
            </Typography>
            <Typography>
              <strong>Przesłano: </strong>
              {item.uploadedAt}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href={"/admin/media/" + item.name}
            variant="contained"
          >
            Pokaż
          </Button>
          <IconButton onClick={() => console.log(item.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  });

  return (
    <Box
      component="section"
      sx={{
        padding: "1rem",
      }}
    >
      <Stack
        direction="column"
        useFlexGap
        spacing={1}
        sx={{
          padding: "1rem",
        }}
      >
        {fileList}
      </Stack>
      <Divider />
      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePaginationChange}
        />
      )}
    </Box>
  );
}
