import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_GATEWAY_URL;

interface EditLedgerRecordParams {
  userId: string;
  recordId: number;
  title: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

const editLedgerRecord = async (record: EditLedgerRecordParams) => {
  const response = await axios.put(`${apiUrl}/ledger`, record);
  return response.data;
};

export function useEditLedgerRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editLedgerRecord,
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["incomeRecords", userId] });
    },
  });
}
