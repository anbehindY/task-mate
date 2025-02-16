"use client";

import NewCreateForm from "@/components/tasks/NewCreateForm";
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
      <section className="grid place-items-center pb-12">
        <NewCreateForm />
      </section>
    </PageContainer>
  );
}
