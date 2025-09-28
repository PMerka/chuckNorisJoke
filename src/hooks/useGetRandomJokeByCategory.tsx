import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import apiRoutes from "../constants/apiRoutes";
import type { JokeItem } from "../types/apiData";

export const useGetRandomJokeByCategory = (category: string | null) => {
  return useQuery({
    queryKey: ["random-joke", category],
    queryFn: async () => {
      const response = await axiosInstance.get(apiRoutes.random, {
        params: { category },
      });
      const data: JokeItem = response.data;
      return data;
    },
    enabled: !!category && category.length >= 3,
  });
};
