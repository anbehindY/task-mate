import { UpdateTaskPayloadType, UpdateTaskResponseType } from "@/types";
import endpoints from "@/utils/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function updateTaskMutation(
  payload: UpdateTaskPayloadType,
  id: string
): Promise<UpdateTaskResponseType> {
  const { data } = await axios.put<UpdateTaskResponseType>(
    `${endpoints.tasks}/${id}`,
    payload
  );
  return data;
}

export default function useUpdateTaskMutation(
  payload: UpdateTaskPayloadType,
  id: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateTaskMutation(payload, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "tasks" });
    },
  });
}
