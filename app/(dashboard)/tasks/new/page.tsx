"use client";

import CreateForm from "@/components/tasks/CreateForm";
import { PageContainer } from "@toolpad/core";

export default function NewTask() {
  return (
    <PageContainer
      title="New Task"
      breadcrumbs={[
        { title: "Tasks", path: "/tasks" },
        { title: "Add New Task" },
      ]}
    >
      <section className="grid place-items-center">
        <CreateForm />
      </section>
    </PageContainer>
  );
}
