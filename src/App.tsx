import { Container } from "@mui/material";
import JokeCard from "./components/JokeCard";
import SearchControls from "./components/SearchControls";
import { useJokesController } from "./hooks/useJokesController";

function App() {
  const {
    settings,
    combinedFetchedData,
    handleRefetchFullyRandomJoke,
    handleSearchJoke,
    handleSelectCategory,
  } = useJokesController();

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
