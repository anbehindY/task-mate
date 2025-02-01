import EditForm from "@/components/tasks/EditForm";
import { Container } from "@mui/material";
import { PageContainer } from "@toolpad/core";

export default function TaskEditPage() {
  return (
    <PageContainer
      title="Edit Task"
      breadcrumbs={[{ title: "Tasks", path: "/tasks" }, { title: "Edit Task" }]}
    >
      <Container className="grid place-items-center">
        <EditForm />
      </Container>
    </PageContainer>
  );
}
