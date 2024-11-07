import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_GATEWAY_URL || "";

// Define the type for the new record
interface LedgerRecord {
  userId: string;
  recordId: number;
  title: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  createdAt: string;
}

const postLedgerRecord = async (newRecord: LedgerRecord) => {
  // const { userId, recordId } = newRecord;
  const response = await axios.post(`${apiUrl}/ledger`, newRecord);
  return response.data;
};

export function usePostIncomeRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLedgerRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomeRecords"] });
    },
  });
}
