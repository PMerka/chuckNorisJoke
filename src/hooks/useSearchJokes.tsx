import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import apiRoutes from "../constants/apiRoutes";
import type { SearchJokesResponse } from "../types/apiData";

const getRandomJokeFromResults = (data: SearchJokesResponse) => {
  if (data.total === 0)
    return { value: "No jokes found for this query. Try something else!", categories: [] };
  const randomIndex = Math.floor(Math.random() * data.total);
  return data.result[randomIndex];
};

// Minimum query length to trigger search required by the API
export const MINIMUM_TEXT_QUERY_LENGTH = 3;

export const useSearchJokes = (query: string) => {
  return useQuery({
    queryKey: ["search-jokes", query],
    queryFn: async () => {
      const response = await axiosInstance.get(apiRoutes.search, {
        params: {
          query: query,
        },
      });
      const data: SearchJokesResponse = response.data;
      const randomJoke = getRandomJokeFromResults(data);
      return randomJoke;
    },
    enabled: query.length >= MINIMUM_TEXT_QUERY_LENGTH,
  });
};
