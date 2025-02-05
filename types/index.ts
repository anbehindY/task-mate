import { Dayjs } from "dayjs";

export type TaskType = {
  id: number;
  taskName: string;
  assignee: string;
  dueDate: Dayjs | null;
  priority: string;
  status: string;
  completed: boolean;
};

export type TaskArrayType = { tasks: Omit<TaskType, "id">[] };

export type StatsCardType = {
  title: string;
  value: number;
  icon: React.ReactElement;
  color: string;
};
