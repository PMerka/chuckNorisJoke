import { useGetRandomJoke } from "./useGetRandomJoke";
import { useGetRandomJokeByCategory } from "./useGetRandomJokeByCategory";
import { useJokeDataSourceSettings } from "./useJokeDataSourceSettings";
import { useSearchJokes } from "./useSearchJokes";

/**
 * Hook for combining logic of fetch function (tanstack)
 * and useGetJokeCategories
 */
export const useJokesController = () => {
  const [settings, dispatchSettings] = useJokeDataSourceSettings();

  // Data fetching hooks
  const randomJokeQuery = useGetRandomJoke();
  const randomJokeByCategoryQuery = useGetRandomJokeByCategory(settings.category);
  const [randomJokeBySearchQuery, renewRandomSeed] = useSearchJokes(settings.searchString);

  const handleRefetchFullyRandomJoke = () => {
    dispatchSettings({ type: "SET_RANDOM" });
    randomJokeQuery.refetch();
  };

  const handleSearchJoke = (searchTerm: string) => {
    dispatchSettings({ type: "SET_SEARCH", payload: searchTerm });
    renewRandomSeed();
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

  return {
    settings,
    combinedFetchedData,
    handleRefetchFullyRandomJoke,
    handleSearchJoke,
    handleSelectCategory,
  };
};
