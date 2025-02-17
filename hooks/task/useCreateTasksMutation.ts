import { CreateTaskPayloadType, CreateTaskResponseType } from "@/types";
import endpoints from "@/utils/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function createTasksMutation(
  payload: CreateTaskPayloadType
): Promise<CreateTaskResponseType> {
  const { data } = await axios.post<CreateTaskResponseType>(
    `${endpoints.tasks}`,
    payload
  );
  return data;
}

export default function useCreateTasksMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: (payload: CreateTaskPayloadType) =>
      createTasksMutation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
