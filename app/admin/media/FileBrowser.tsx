"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { Loader } from "../../(main)/components/Loader";
import { fetcher } from "../../lib/fetcher";
import { FilesData, FilesDataItem } from "../../models/files-data";

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
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent> */}
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
      // className="flex flex-wrap justify-around gap-y-2 gap-x-1 p-1 bg-surface text-onSurface rounded-lg relative"
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
