import TasksTable from "@/components/TasksTable";
import { Button } from "@mui/material";
import { PageContainer } from "@toolpad/core";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <PageContainer breadcrumbs={[{ title: "" }]} className="relative">
      <Button
        variant="outlined"
        color="primary"
        className="w-32 h-12 !absolute right-4 top-4"
      >
        <Link href={"tasks/new"}>Add Task</Link>
      </Button>
      <TasksTable />
    </PageContainer>
  );
}
