import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import CategorySelect from "./CategorySelect";
import SearchByText from "./SearchByText";

interface SearchControlsProps {
  handleRefetchFullyRandomJoke: () => void;
  setSearchCategory: (category: string) => void;
  handleSearchJoke: (searchTerm: string) => void;
  dataSource: string;
}

const SearchControls = ({
  handleRefetchFullyRandomJoke,
  setSearchCategory,
  handleSearchJoke,
  dataSource,
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
        <Divider textAlign="center" />
        <Typography
          variant="h3"
          align="center"
          sx={dataSource === "random" ? { color: "primary.main", fontWeight: "bold" } : {}}
        >
          Get a Fully Random Joke
        </Typography>
        <Button variant="outlined" onClick={handleRefetchFullyRandomJoke}>
          Get Random Joke From All Jokes
        </Button>
        <Divider textAlign="center">
          <Typography variant="body2">or</Typography>
        </Divider>
        <SearchByText handleSearchJoke={handleSearchJoke} dataSource={dataSource} />
        <Divider textAlign="center">
          <Typography variant="body2">or</Typography>
        </Divider>
        <CategorySelect setSearchCategory={setSearchCategory} dataSource={dataSource} />
      </Stack>
    </Paper>
  );
};

export default SearchControls;
