import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetJokeCategories } from "../hooks/useGetJokeCategories";

interface CategorySelectProps {
  setSearchCategory: (category: string) => void;
}

const CategorySelect = ({ setSearchCategory }: CategorySelectProps) => {
  const jokeCategoriesQuery = useGetJokeCategories();
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{jokeCategoriesQuery.isLoading ? "Loading..." : "Category"}</InputLabel>
      <Select
        label="Category"
        onChange={(e) => setSearchCategory(e.target.value as string)}
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
    </FormControl>
  );
};

export default CategorySelect;
