import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import apiRoutes from "../constants/apiRoutes";
import type { SearchJokesResponse } from "../types/apiData";
import { useState } from "react";

const getRandomJokeFromResults = (data: SearchJokesResponse | undefined, randomSeed: number) => {
  if (!data || data.total === 0)
    return { value: "No jokes found for this query. Try something else!", categories: [] };
  const randomIndex = Math.floor(randomSeed * data.total);
  return data.result[randomIndex];
};

// Minimum query length to trigger search required by the API
export const MINIMUM_TEXT_QUERY_LENGTH = 3;

/**
 * Fetches
 * @param queryString
 * @returns query with single random joke with searched string
 */
export const useSearchJokes = (queryString: string) => {
  const [randomSeed, setRandomSeed] = useState(Math.random());

  const updateRandomSeed = () => {
    setRandomSeed(Math.random());
  };

  const query = useQuery({
    queryKey: ["search-jokes", queryString],
    queryFn: async () => {
      const response = await axiosInstance.get(apiRoutes.search, {
        params: {
          query: queryString,
        },
      });
      const data: SearchJokesResponse = response.data;
      return data;
    },
    enabled: queryString.length >= MINIMUM_TEXT_QUERY_LENGTH,
  });

  return [
    { ...query, data: getRandomJokeFromResults(query?.data, randomSeed) },
    updateRandomSeed,
  ] as const;
};
