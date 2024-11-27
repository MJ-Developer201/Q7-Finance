import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_GATEWAY_URL;

interface DeleteLedgerRecordParams {
  userId: string;
  recordId: number;
}

const deleteLedgerRecord = async ({
  userId,
  recordId,
}: DeleteLedgerRecordParams) => {
  const response = await axios.delete(
    `${apiUrl}/ledger/object/${userId}/${recordId}`
  );
  return response.data;
};

export function useDeleteLedgerRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLedgerRecord,
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["incomeRecords", userId] });
    },
  });
}
