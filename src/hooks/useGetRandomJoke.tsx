import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import apiRoutes from "../constants/apiRoutes";
import type { JokeItem } from "../types/apiData";

export const useGetRandomJoke = () => {
  return useQuery({
    queryKey: ["random-joke"],
    queryFn: async () => {
      const response = await axiosInstance.get(apiRoutes.random);
      const data: JokeItem = response.data;
      return data;
    },
    meta: {
      query: "random-joke",
    },
  });
};
