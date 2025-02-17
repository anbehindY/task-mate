"use client";

import { SnackbarContext } from "@/components/provider/SnackbarProvider";
import useDeleteTaskMutation from "@/hooks/task/useDeleteTaskMutation";
import useGetTasksQuery from "@/hooks/task/useGetTasksQuery";
import useUpdateTaskMutation from "@/hooks/task/useUpdateTaskMutation";
import { TaskType } from "@/types";
import { ErrorOutline } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import Loading from "./shared/Loading";

export default function TasksTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const { showSnackbar } = useContext(SnackbarContext);
  const GetAllTasksQuery = useGetTasksQuery();
  const DeleteTaskMutation = useDeleteTaskMutation();
  const UpdateTaskMutation = useUpdateTaskMutation();

  useEffect(() => {
    if (GetAllTasksQuery.isSuccess) {
      setTasks(GetAllTasksQuery.data.tasks);
    } else if (GetAllTasksQuery.isPending) {
      showSnackbar("Fetching tasks...", null, "info");
    } else if (GetAllTasksQuery.isError) {
      showSnackbar("Error fetching tasks", <ErrorOutline />, "error");
    }
  }, [
    GetAllTasksQuery.isSuccess,
    GetAllTasksQuery.isPending,
    GetAllTasksQuery.isError,
    GetAllTasksQuery.data,
  ]);

  useEffect(() => {
    if (DeleteTaskMutation.isSuccess) {
      showSnackbar(DeleteTaskMutation.data.message);
    } else if (DeleteTaskMutation.isPending) {
      showSnackbar("Deleting task...", null, "info");
    } else if (DeleteTaskMutation.isError) {
      showSnackbar("Error deleting task", <ErrorOutline />, "error");
    }
  }, [
    DeleteTaskMutation.isSuccess,
    DeleteTaskMutation.isPending,
    DeleteTaskMutation.isError,
    DeleteTaskMutation.data,
  ]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteHandler = (id: string) => {
    DeleteTaskMutation.mutate(id);
  };

  const markCompletedHandler = (id: string) => {
    {
      const newTasks = tasks.map((t) => {
        if (t._id === id) {
          if (t.completed) {
            t.completed = false;
          } else {
            t.completed = true;
          }
        }
        UpdateTaskMutation.mutate({ payload: { completed: t.completed }, id });
        return t;
      });
      setTasks(newTasks);
    }
  };

  if (GetAllTasksQuery.isPending) return <Loading />;

  if (tasks.length === 0) {
    return (
      <Box className="grid place-items-center">
        <h1>No tasks available</h1>
      </Box>
    );
  }

  return (
    <Container className="grid place-items-center">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((task) => (
                <TableRow key={task._id} className="!text-white">
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.assignee}</TableCell>

                  <TableCell>
                    {dayjs(task.dueDate).format("MM/DD/YYYY hh:mm A")}
                  </TableCell>

                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell className="!space-x-2">
                    <Button
                      variant="contained"
                      color="primary"
                      href={`/tasks/${task._id}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteHandler(task._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant={task.completed ? "outlined" : "contained"}
                      color="success"
                      onClick={() => markCompletedHandler(task._id)}
                    >
                      {task.completed ? (
                        <Typography variant="button">
                          Completed <CheckIcon />
                        </Typography>
                      ) : (
                        <Typography variant="button">Mark Complete</Typography>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
