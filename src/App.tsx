import { Container } from "@mui/material";
import JokeCard from "./components/JokeCard";
import SearchControls from "./components/SearchControls";
import { useGetRandomJoke } from "./hooks/useGetRandomJoke";
import { useGetRandomJokeByCategory } from "./hooks/useGetRandomJokeByCategory";
import { useSearchJokes } from "./hooks/useSearchJokes";
import { useJokeDataSourceSettings } from "./hooks/useJokeDataSourceSettings";

function App() {
  const [state, dispatch] = useJokeDataSourceSettings();

  // Data fetching hooks
  const randomJokeQuery = useGetRandomJoke();
  const randomJokeByCategoryQuery = useGetRandomJokeByCategory(state.category);
  const [randomJokeBySearchQuery, renewRandom] = useSearchJokes(state.searchString);

  const handleRefetchFullyRandomJoke = () => {
    dispatch({ type: "SET_RANDOM" });
    randomJokeQuery.refetch();
  };

  const handleSearchJoke = (searchTerm: string) => {
    dispatch({ type: "SET_SEARCH", payload: searchTerm });
    renewRandom();
  };

  const handleSelectCategory = (newCategory: string) => {
    if (newCategory === state.category && !randomJokeByCategoryQuery.isFetching) {
      randomJokeByCategoryQuery.refetch();
    }
    dispatch({ type: "SET_CATEGORY", payload: newCategory });
  };

  const combineFetchedData = () => {
    if (state.dataSource === "random") {
      return randomJokeQuery;
    } else if (state.dataSource === "categories") {
      return randomJokeByCategoryQuery;
    } else if (state.dataSource === "search") {
      return randomJokeBySearchQuery;
    }
    return null;
  };

  const combinedFetchedData = combineFetchedData();

  return (
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
        dataSource={state.dataSource}
        handleSearchJoke={handleSearchJoke}
        handleRefetchFullyRandomJoke={handleRefetchFullyRandomJoke}
        setSearchCategory={handleSelectCategory}
      />

      <JokeCard
        dataSource={state.dataSource}
        joke={combinedFetchedData?.data?.value}
        category={combinedFetchedData?.data?.categories}
        isLoading={combinedFetchedData?.isFetching}
        error={combinedFetchedData?.error || null}
      />
    </Container>
  );
}

export default App;
