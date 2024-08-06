import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search"

export function SearchFrom() {
  return (
    <Box
      sx={{
        position: "relative",
        padding: "1rem",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: { sm: "1fr", lg: "1fr auto" },
          width: "100%",
        }}
      >
        <TextField autoComplete="off" id="search" name="search" type="search" required />
        <IconButton aria-label="search" size="large"><SearchIcon /></IconButton>
      </Box>
    </Box>
  );
}
