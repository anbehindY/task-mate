import theme from "@/theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import { LinearProgress } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Navigation } from "@toolpad/core";
import { NextAppProvider } from "@toolpad/core/nextjs";
import Image from "next/image";
import { ReactNode, Suspense } from "react";

export default function ToolPadProvider({ children }: { children: ReactNode }) {
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
      <Image
        src="/images/logo.webp"
        alt="Tasks Tracker"
        width={48}
        height={56}
      />
    ),
  };

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <Suspense fallback={<LinearProgress />}>
        <NextAppProvider
          navigation={NAVIGATION}
          branding={BRANDING}
          theme={theme}
        >
          {children}
        </NextAppProvider>
      </Suspense>
    </AppRouterCacheProvider>
  );
}
