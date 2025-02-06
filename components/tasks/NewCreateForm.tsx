import { TaskArrayType } from "@/types";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { array, date, object, string } from "yup";
import DynamicForm from "./DynamicForm";

export default function NewCreateForm() {
  const router = useRouter();
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
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        let id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
        response.tasks.forEach((task) => {
          tasks.push({ id: id++, ...task });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        router.push("/tasks");
      }}
    >
      <DynamicForm />
    </Formik>
  );
}
