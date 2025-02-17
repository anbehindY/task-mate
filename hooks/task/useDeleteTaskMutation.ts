import { DeleteTaskResponseType } from "@/types";
import endpoints from "@/utils/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function deleteTaskMutation(id: string): Promise<DeleteTaskResponseType> {
  const { data } = await axios.delete<DeleteTaskResponseType>(
    `${endpoints.tasks}/${id}`
  );
  return data;
}

export default function useDeleteTaskMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTaskMutation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "tasks" });
    },
  });
}
