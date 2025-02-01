import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import * as React from "react";

export default function Layout(props: { children: React.ReactNode }) {
  return <DashboardLayout>{props.children}</DashboardLayout>;
}
