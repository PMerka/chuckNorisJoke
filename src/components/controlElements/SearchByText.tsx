import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { MINIMUM_TEXT_QUERY_LENGTH } from "src/hooks/useSearchJokes";

interface SearchByTextProps {
  handleSearchJoke: (searchTerm: string) => void;
  dataSource?: string;
}

const SearchByText = ({ handleSearchJoke, dataSource }: SearchByTextProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const tooShortString = searchTerm.length < MINIMUM_TEXT_QUERY_LENGTH;

  return (
    <>
      <Typography
        variant="h3"
        align="center"
        sx={dataSource === "search" ? { color: "primary.main", fontWeight: "bold" } : {}}
      >
        Get a Random Joke By Text
      </Typography>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          label="Search joke"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => handleSearchJoke(searchTerm)}
          disabled={tooShortString}
        >
          Search
        </Button>
      </Stack>
    </>
  );
};

export default SearchByText;
