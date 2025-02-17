import { GetTasksResponseType } from "@/types";
import endpoints from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getTasksQuery() {
  const { data } = await axios.get<GetTasksResponseType>(`${endpoints.tasks}`);
  return data;
}

export default function useGetTasksQuery() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksQuery,
  });
}
