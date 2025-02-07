import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import LinearProgress from "@mui/material/LinearProgress";
import type { Navigation } from "@toolpad/core/AppProvider";
import { NextAppProvider } from "@toolpad/core/nextjs";
import Image from "next/image";
import * as React from "react";
import "./globals.css";

import CustomSnackbar from "@/components/shared/CustomSnackbar";
import { SnackbarProvider } from "@/utils/snackbarProvider";
import theme from "../theme";

const NAVIGATION: Navigation = [
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "tasks",
    title: "Tasks",
    icon: <TaskIcon />,
  },
];

const BRANDING = {
  title: "Task Mate",
  logo: (
    <Image src="/images/logo.webp" alt="Tasks Tracker" width={48} height={56} />
  ),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              theme={theme}
            >
              <SnackbarProvider>
                {props.children}
                <CustomSnackbar />
              </SnackbarProvider>
            </NextAppProvider>
          </React.Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
