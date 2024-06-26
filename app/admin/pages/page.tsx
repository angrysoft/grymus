"use client";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { Loader } from "../../(main)/components/Loader";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PagesData } from "../../models/pages";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, IconButton } from "@mui/material";

export default function Pages() {
  const { data } = useSWR<PagesData>("/api/admin/pages", fetcher);

  if (!data) {
    return <Loader />;
  }
  console.log("pages", data);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">Tytuł</TableCell>
              <TableCell align="right">Opublikowane</TableCell>
              <TableCell align="right">Usuń</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.result.map((page) => (
              <TableRow
                key={page.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {page.id}
                </TableCell>
                <TableCell align="right">{page.title}</TableCell>
                <TableCell align="right">
                  {page.enabled ? (
                    <CheckCircleIcon sx={{ color: "primary.main" }} />
                  ) : (
                    <CheckCircleIcon sx={{ color: "black" }} />
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
