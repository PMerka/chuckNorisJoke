import { useQuery } from "@tanstack/react-query";
import apiRoutes from "../constants/apiRoutes";
import axiosInstance from "../utils/axios";

export const useGetJokeCategories = () => {
  return useQuery<string[]>({
    queryKey: ["joke-categories"],
    queryFn: async () => {
      const response = await axiosInstance.get(apiRoutes.categories);
      const data = response.data;
      return data;
    },
  });
};
