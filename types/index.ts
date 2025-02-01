import { Dayjs } from "dayjs";

export type TaskType = {
  id: string;
  taskName: string;
  assignee: string;
  dueDate: Dayjs | null;
  priority: string;
  status: string;
  completed: boolean;
};

export type StatsCardType = {
  title: string;
  value: number;
  icon: React.ReactElement;
  color: string;
};
