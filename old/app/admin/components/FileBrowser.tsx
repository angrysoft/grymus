"use client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ChangeEvent, use, useEffect, useState } from "react";
import useSWR from "swr";
import { Loader } from "../../(main)/components/Loader";
import { fetcher } from "../../lib/fetcher";
import { FilesData, FilesDataItem } from "../../models/files-data";
import { FileContext } from "../media/FileContext";
import { SearchFrom } from "../media/SearchFrom";
import ConfirmDialog from "./Confirm";

interface ImageItem {
  id: number;
  name: string;
  miniature: string;
  size: number;
}

interface IFileBrowserProps {
  typeFilter?: string;
}

export function FileBrowser(props: Readonly<IFileBrowserProps>) {
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [fileId, setFileId] = useState(-1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ctx = use(FileContext);

  const { data, mutate } = useSWR<FilesData>(
    `/api/admin/media?items=${pageSize}&offset=${offset}&q=${query}`,
    fetcher,
  );

  useEffect(() => {
    if (data?.total && (data?.total ?? 0) > 0) {
      setPageCount(Math.ceil(data.total / pageSize));
    }
  }, [data]);

  useEffect(() => {
    if (ctx?.needRefresh) {
      mutate();
      ctx.setNeedRefresh(false);
    }
  }, [ctx?.needRefresh]);

  if (!data) return <Loader />;

  const handlePaginationChange = (ev: ChangeEvent<unknown>, page: number) => {
    const calculatedOffset = Number(page) * Number(pageSize) - pageSize;
    setPage(page);
    setOffset(calculatedOffset);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setMsg("Adres został skopiowany do schowka");
    setInfoOpen(true);
  };

  const deletePhoto = async () => {
    if (fileId < 0) return;
    const resp = await fetch(`/api/admin/media/${fileId}`, {
      method: "DELETE",
    });
    if (resp.ok) {
      setMsg("Plik został skasowany");
      setInfoOpen(true);
      setFileId(-1);
    }
    setInfoOpen(false);
    setConfirmOpen(false);
    ctx?.setNeedRefresh(true);
  };

  const fileList = data.result?.map((item: FilesDataItem) => {
    return (
      <Card sx={{ width: 300 }} key={item.id}>
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
          <IconButton color="primary" href={"/admin/media/" + item.name}>
            <VisibilityIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setFileId(item.id);
              setConfirmOpen(true);
            }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => copyToClipboard(["/files", item.icon].join("/"))}
            color="primary"
          >
            <ContentCopyIcon />
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
      <SearchFrom onSearch={setQuery} />
      <Stack
        direction="row"
        useFlexGap
        spacing={2}
        sx={{
          padding: "1rem",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={infoOpen}
        autoHideDuration={2000}
        onClose={() => {
          setInfoOpen(false);
          setMsg("");
        }}
        message={msg}
      />
      <ConfirmDialog
        agreeAction={deletePhoto}
        msg={"Czy na pewno usunąć"}
        open={confirmOpen}
        closeHandler={() => setConfirmOpen(false)}
      />
    </Box>
  );
}
