import { SnackbarContext } from "@/components/provider/SnackbarProvider";
import useCreateTasksMutation from "@/hooks/task/useCreateTasksMutation";
import { TaskArrayType } from "@/types";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { array, date, object, string } from "yup";
import DynamicForm from "./DynamicForm";

export default function NewCreateForm() {
  const router = useRouter();
  const { showSnackbar } = useContext(SnackbarContext);
  const CreateTaskMutation = useCreateTasksMutation();

  useEffect(() => {
    if (CreateTaskMutation.isSuccess) {
      showSnackbar("Tasks created successfully");
      router.push("/tasks");
    } else if (CreateTaskMutation.isPending) {
      showSnackbar("Creating tasks...", null, "info");
    } else if (CreateTaskMutation.isError) {
      showSnackbar("Error creating tasks", null, "error");
    }
  }, [
    CreateTaskMutation.isSuccess,
    CreateTaskMutation.isPending,
    CreateTaskMutation.isError,
  ]);

  const initialValues: TaskArrayType = {
    tasks: [
      {
        taskName: "",
        assignee: "",
        dueDate: null,
        priority: "",
        status: "",
        completed: false,
      },
    ],
  };

  const validationSchema = object().shape({
    tasks: array()
      .of(
        object().shape({
          taskName: string().required("Task name is required"),
          assignee: string().required("Assignee is required"),
          dueDate: date()
            .required("Due date is required")
            .test({
              test: (value) => value > new Date(),
              message: "Due date must be in the future",
            }),
          priority: string().required("Priority is required"),
          status: string().required("Status is required"),
        })
      )
      .min(1, "At least one task is required")
      .max(10, "Maximum of 10 tasks only"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(response) => {
        CreateTaskMutation.mutate(
          response.tasks.map((task) => {
            return {
              ...task,
              dueDate: task.dueDate!.toISOString(),
            };
          })
        );
      }}
    >
      <DynamicForm />
    </Formik>
  );
}
