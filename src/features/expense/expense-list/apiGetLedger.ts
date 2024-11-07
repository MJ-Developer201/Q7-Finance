import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_GATEWAY_URL;

export function useIncomeQuery(userId: string) {
  return useQuery({
    queryKey: ["incomeRecords", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const response = await axios.get(`${apiUrl}/ledger/${userId}`);
      return response.data;
    },
    enabled: !!userId, // Only run the query if userId is defined
  });
}
