import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import BackspaceIcon from '@mui/icons-material/Backspace';

interface ISearchProps {
  onSearch: (q:string) => void;
}

export function SearchFrom(props: Readonly<ISearchProps>) {
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
          gridTemplateColumns: { sm: "1fr", lg: "1fr auto auto" },
          width: "100%",
        }}
        onSubmit={(ev) => {
          ev.preventDefault();
          console.log(ev.target);
          const formData = new FormData(ev.target as HTMLFormElement);
          const query:string = formData.get("search")?.toString() ?? "";
          if (query.length > 3)
            props.onSearch(query);
        }}
      >
        <TextField
          autoComplete="off"
          id="search"
          name="search"
          type="search"
          required
        />
        <IconButton aria-label="search" size="large" type="submit">
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="search" size="large" onClick={(ev) => {
          props.onSearch("");
        }}>
          <BackspaceIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
