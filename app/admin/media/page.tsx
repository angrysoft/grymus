import Box from "@mui/material/Box";
import { FileProvider } from "./FileContext";
import { UploadForm } from "./UploadForm";
import { SearchFrom } from "./SearchFrom";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { FileBrowser } from "./FileBrowser";

export default function Media() {
  return (
    <Box>
      <Paper
        sx={{
          display: "grid",
          padding: "1rem",
          overflow: "auto",
          gridAutoRows: "max-content",
        }}
      >
        <FileProvider>
          <UploadForm />
          <Divider />
          <SearchFrom />
          <FileBrowser />
        </FileProvider>
      </Paper>
    </Box>
  );
}
