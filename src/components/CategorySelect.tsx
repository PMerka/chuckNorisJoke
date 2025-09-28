import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useGetJokeCategories } from "../hooks/useGetJokeCategories";
import { useState } from "react";

interface CategorySelectProps {
  setSearchCategory: (category: string) => void;
}

const CategorySelect = ({ setSearchCategory }: CategorySelectProps) => {
  const jokeCategoriesQuery = useGetJokeCategories();
  const [category, setCategory] = useState<string>("");

  return (
    <>
      <Typography variant="h3" align="center">
        Get a Random Joke From Category
      </Typography>
      <FormControl fullWidth size="small">
        <InputLabel>{jokeCategoriesQuery.isLoading ? "Loading..." : "Category"}</InputLabel>
        <Select
          label="Category"
          onChange={(e) => setCategory(e.target.value as string)}
          value={category}
          disabled={jokeCategoriesQuery.isLoading}
        >
          {jokeCategoriesQuery.data?.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        {jokeCategoriesQuery.isError && (
          <FormHelperText error>
            Sorry, server was too afraid of Chuck Norris. Failed to load categories. Error detail:{" "}
            {jokeCategoriesQuery.error?.message || "Unknown error"}
          </FormHelperText>
        )}
        <Button
          variant="outlined"
          onClick={() => setSearchCategory(category)}
          disabled={!category}
          sx={{ mt: 2 }}
        >
          {category ? `Get Joke About ${category}` : "Please select category"}
        </Button>
      </FormControl>
    </>
  );
};

export default CategorySelect;
