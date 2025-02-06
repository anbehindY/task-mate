"use client";

import { TaskType } from "@/types";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import CustomTextField from "../shared/CustomTextField";

const taskSchema = Yup.object().shape({
  assignee: Yup.string().required("Assignee is required"),
  dueDate: Yup.date().required("Due date is required"),
  priority: Yup.string().required("Priority is required"),
  status: Yup.string().required("Status is required"),
});

const validateTaskName = (value: string): string | undefined => {
  if (!value) {
    return "This field is required";
  }
  return undefined;
};

export default function EditForm() {
  const router = useRouter();
  const params = useParams();
  const [initialValues, setInitialValues] = useState<Omit<
    TaskType,
    "id"
  > | null>(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const { id, dueDate, ...task } = storedTasks.find(
      (task: TaskType) => task.id === Number(params.id)
    );
    setInitialValues({ dueDate: dayjs(dueDate), ...task });
  }, [params.id]);

  if (!initialValues) {
    return (
      <Container sx={{ display: "grid", placeItems: "center", height: "80vh" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Formik
      initialValues={
        initialValues || {
          taskName: "",
          assignee: "",
          dueDate: null,
          priority: "",
          status: "",
          completed: false,
        }
      }
      enableReinitialize
      validationSchema={taskSchema}
      onSubmit={(response) => {
        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks = tasks.map((task: TaskType) =>
          task.id === Number(params.id) ? { id: task.id, ...response } : task
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
        router.push("/tasks");
      }}
    >
      {({
        values,
        setFieldValue,
        handleChange,
        handleBlur,
        touched,
        errors,
      }) => (
        <Form className="flex flex-col gap-8 w-full max-w-md">
          <CustomTextField
            id="taskName"
            label="Task Name"
            name="taskName"
            validator={validateTaskName}
          />
          <TextField
            fullWidth
            id="assignee"
            name="assignee"
            label="Assignee"
            value={values.assignee}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.assignee && Boolean(errors.assignee)}
            helperText={
              touched.assignee && typeof errors.assignee === "string"
                ? errors.assignee
                : undefined
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              name="dueDate"
              value={values.dueDate}
              label="Due Date"
              format="DD/MM/YYYY HH:mm"
              onChange={(date) => setFieldValue("dueDate", date, true)}
              slotProps={{
                textField: {
                  error: touched.dueDate && Boolean(errors.dueDate),
                  helperText:
                    touched.dueDate && typeof errors.dueDate === "string"
                      ? errors.dueDate
                      : undefined,
                },
              }}
            />
          </LocalizationProvider>
          <FormControl error={touched.priority && Boolean(errors.priority)}>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority"
              name="priority"
              defaultValue="Medium"
              value={values.priority}
              label="Priority"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.priority && Boolean(errors.priority)}
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
            <FormHelperText>
              {touched.priority && typeof errors.priority === "string"
                ? errors.priority
                : undefined}
            </FormHelperText>
          </FormControl>
          <FormControl error={touched.status && Boolean(errors.status)}>
            <FormLabel id="status-radio-group-label">Status</FormLabel>
            <RadioGroup
              aria-labelledby="status-radio-group-label"
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              row={true}
            >
              <FormControlLabel
                value="To Do"
                control={<Radio />}
                label="To Do"
              />
              <FormControlLabel
                value="In Progress"
                control={<Radio />}
                label="In Progress"
              />
              <FormControlLabel
                value="In Review"
                control={<Radio />}
                label="In Review"
              />
            </RadioGroup>
            <FormHelperText>
              {touched.status && typeof errors.status === "string"
                ? errors.status
                : undefined}
            </FormHelperText>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
