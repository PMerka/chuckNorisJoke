import { Container } from "@mui/material";
import JokeCard from "./components/JokeCard";
import SearchControls from "./components/SearchControls";
import { useGetRandomJoke } from "./hooks/useGetRandomJoke";
import { useGetRandomJokeByCategory } from "./hooks/useGetRandomJokeByCategory";
import { useSearchJokes } from "./hooks/useSearchJokes";
import { useJokeDataSourceSettings } from "./hooks/useJokeDataSourceSettings";

function App() {
  const [settings, dispatchSettings] = useJokeDataSourceSettings();

  // Data fetching hooks
  const randomJokeQuery = useGetRandomJoke();
  const randomJokeByCategoryQuery = useGetRandomJokeByCategory(settings.category);
  const [randomJokeBySearchQuery, renewRandom] = useSearchJokes(settings.searchString);

  const handleRefetchFullyRandomJoke = () => {
    dispatchSettings({ type: "SET_RANDOM" });
    randomJokeQuery.refetch();
  };

  const handleSearchJoke = (searchTerm: string) => {
    dispatchSettings({ type: "SET_SEARCH", payload: searchTerm });
    renewRandom();
  };

  const handleSelectCategory = (newCategory: string) => {
    // If the same category is selected again, manually refetch.
    // If the category changes, TanStack Query will auto-refetch due to dependency change.
    if (newCategory === settings.category && !randomJokeByCategoryQuery.isFetching) {
      randomJokeByCategoryQuery.refetch();
    }
    dispatchSettings({ type: "SET_CATEGORY", payload: newCategory });
  };

  const combineFetchedData = () => {
    if (settings.dataSource === "random") {
      return randomJokeQuery;
    } else if (settings.dataSource === "categories") {
      return randomJokeByCategoryQuery;
    } else if (settings.dataSource === "search") {
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
        dataSource={settings.dataSource}
        handleSearchJoke={handleSearchJoke}
        handleRefetchFullyRandomJoke={handleRefetchFullyRandomJoke}
        setSearchCategory={handleSelectCategory}
      />

      <JokeCard
        dataSource={settings.dataSource}
        joke={combinedFetchedData?.data?.value}
        category={combinedFetchedData?.data?.categories}
        isLoading={combinedFetchedData?.isFetching}
        error={combinedFetchedData?.error || null}
      />
    </Container>
  );
}

export default App;
