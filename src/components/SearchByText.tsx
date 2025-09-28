import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { MINIMUM_TEXT_QUERY_LENGTH } from "../hooks/useSearchJokes";

interface SearchByTextProps {
  handleSearchJoke: (searchTerm: string) => void;
}

const SearchByText = ({ handleSearchJoke }: SearchByTextProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const tooShortString = searchTerm.length < MINIMUM_TEXT_QUERY_LENGTH;

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        fullWidth
        size="small"
        label="Search joke"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => handleSearchJoke(searchTerm)}
        disabled={tooShortString}
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchByText;
