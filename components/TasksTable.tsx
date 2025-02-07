"use client";

import { SnackbarContext } from "@/components/provider/SnackbarProvider";
import { TaskType } from "@/types";
import { DeleteOutline } from "@mui/icons-material";
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

export default function TasksTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const { showSnackbar } = useContext(SnackbarContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  const deleteHandler = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    showSnackbar("Task deleted successfully", <DeleteOutline />, "error");
  };

  const markCompletedHandler = (id: number) => {
    {
      const newTasks = tasks.map((t) => {
        if (t.id === id) {
          if (t.completed) {
            t.completed = false;
          } else {
            t.completed = true;
          }
        }
        return t;
      });
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
  };

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
                <TableRow key={task.id} className="!text-white">
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
                      href={`/tasks/${task.id}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteHandler(task.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant={task.completed ? "outlined" : "contained"}
                      color="success"
                      onClick={() => markCompletedHandler(task.id)}
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
