import { Dayjs } from "dayjs";

export type TaskType = {
  id: string;
  taskName: string;
  assignee: string;
  dueDate: string | Dayjs | null;
  priority: string;
  status: string;
  completed: boolean;
  __v: number;
};

export type TaskArrayType = { tasks: Omit<TaskType, "id">[] };

export type StatsCardType = {
  title: string;
  value: number;
  icon: React.ReactElement;
  color: string;
};

export type CreateTaskResponseType = {
  message: string;
  newTasks: TaskType[];
};

export type GetTasksResponseType = {
  tasks: TaskType[];
};

export type UpdateTaskResponseType = {
  message: string;
  task: TaskType;
};

export type DeleteTaskResponseType = {
  message: string;
};

type TaskPayloadType = {
  taskName: string;
  assignee: string;
  dueDate: string;
  priority: string;
  status: string;
  completed: boolean;
};

export type CreateTaskPayloadType = TaskPayloadType;

export type UpdateTaskPayloadType = Partial<TaskPayloadType>;
