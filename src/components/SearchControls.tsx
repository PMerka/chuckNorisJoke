import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import CategorySelect from "./CategorySelect";
import SearchByText from "./SearchByText";

interface SearchControlsProps {
  handleRefetchFullyRandomJoke: () => void;
  setSearchCategory: (category: string) => void;
  handleSearchJoke: (searchTerm: string) => void;
}

const SearchControls = ({
  handleRefetchFullyRandomJoke,
  setSearchCategory,
  handleSearchJoke,
}: SearchControlsProps) => {
  return (
    <Paper elevation={10} sx={{ marginTop: 4, padding: 2, width: "100%" }}>
      <Typography
        component="h1"
        variant="h1"
        sx={{ textAlign: "center", mb: 5, textWrap: "pretty" }}
      >
        Chuck Norris Jokes
      </Typography>

      <Stack spacing={2}>
        <Button variant="outlined" onClick={handleRefetchFullyRandomJoke}>
          Get Random Joke From All Jokes
        </Button>

        <Divider textAlign="center">or</Divider>

        <SearchByText handleSearchJoke={handleSearchJoke} />

        <Divider textAlign="center">or</Divider>

        <CategorySelect setSearchCategory={setSearchCategory} />
      </Stack>
    </Paper>
  );
};

export default SearchControls;
