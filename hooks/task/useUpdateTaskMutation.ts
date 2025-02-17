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

export default function useUpdateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: ({
      payload,
      id,
    }: {
      payload: UpdateTaskPayloadType;
      id: string;
    }) => updateTaskMutation(payload, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
