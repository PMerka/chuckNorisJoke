import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CategorySelect from "./CategorySelect";

interface SearchControlsProps {}

const SearchControls = (props: SearchControlsProps) => {
  return (
    <Paper elevation={10} sx={{ marginTop: 4, padding: 2, width: "100%" }}>
      <Typography
        component="h1"
        variant="h1"
        sx={{ textAlign: "center", mb: 5, textWrap: "pretty" }}
      >
        Find random joke about Chuck Norris
      </Typography>

      <Stack spacing={2}>
        <Button variant="outlined">Get Random Joke From All Jokes</Button>

        <Stack direction="row" spacing={1}>
          <TextField fullWidth size="small" label="Search joke" />
          <Button variant="contained">Search</Button>
        </Stack>

        <CategorySelect />
      </Stack>
    </Paper>
  );
};

export default SearchControls;
