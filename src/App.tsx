import { Container } from "@mui/material";
import JokeCard from "./components/JokeCard";
import SearchControls from "./components/SearchControls";
import { useGetRandomJoke } from "./hooks/useGetRandomJoke";
import { useState } from "react";
import { useGetRandomJokeByCategory } from "./hooks/useGetRandomJokeByCategory";
import { useSearchJokes } from "./hooks/useSearchJokes";

function App() {
  const [dataSource, setDataSource] = useState("random"); // "random", "search", "categories"
  const [category, setCategory] = useState<string | null>(null);
  const [searchString, setSearchString] = useState<string>("");

  // Data fetching hooks
  const randomJokeQuery = useGetRandomJoke();
  const randomJokeByCategoryQuery = useGetRandomJokeByCategory(category);
  const randomJokeBySearchQuery = useSearchJokes(searchString); // Implement search functionality when ready

  const handleRefetchFullyRandomJoke = () => {
    setDataSource("random");
    randomJokeQuery.refetch();
  };

  const handleSearchJoke = (searchTerm: string) => {
    setDataSource("search");
    setSearchString(searchTerm);
    if (searchTerm === searchString) {
      randomJokeBySearchQuery.refetch();
    }
  };

  const handleSelectCategory = (category: string) => {
    setDataSource("categories");
    setCategory(category);
  };

  const combineFetchedData = () => {
    if (dataSource === "random") {
      return randomJokeQuery;
    } else if (dataSource === "categories") {
      return randomJokeByCategoryQuery;
    } else if (dataSource === "search") {
      return randomJokeBySearchQuery;
    }
    return null;
  };

  const combinedFetchedData = combineFetchedData();

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          minHeight: "80dvh",
        }}
      >
        <SearchControls
          handleSearchJoke={handleSearchJoke}
          handleRefetchFullyRandomJoke={handleRefetchFullyRandomJoke}
          setSearchCategory={handleSelectCategory}
        />

        <div>{dataSource}</div>
        <div>{category}</div>

        <JokeCard
          dataSource={dataSource}
          joke={combinedFetchedData?.data?.value}
          category={combinedFetchedData?.data?.categories}
          isLoading={combinedFetchedData?.isFetching}
        />
      </Container>
    </>
  );
}

export default App;
