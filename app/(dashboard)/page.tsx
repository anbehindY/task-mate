"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import { TaskType } from "@/types";
import { Assignment, CheckCircle, PendingActions } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PageContainer } from "@toolpad/core";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");
    if (localTasks) {
      const tasks = JSON.parse(localTasks);
      setTaskStats({
        totalTasks: tasks.length,
        completedTasks: tasks.filter((task: TaskType) => task.completed).length,
        pendingTasks: tasks.filter((task: TaskType) => !task.completed).length,
      });
    }
  }, []);

  return (
    <PageContainer title="Dashboard" breadcrumbs={[{ title: "" }]}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 1, lg: 3 }}
      >
        <StatsCard
          title="Total Tasks"
          value={taskStats.totalTasks}
          icon={<Assignment />}
          color="primary.main"
        />

        <StatsCard
          title="Completed Tasks"
          value={taskStats.completedTasks}
          icon={<CheckCircle />}
          color="success.main"
        />

        <StatsCard
          title="Pending Tasks"
          value={taskStats.pendingTasks}
          icon={<PendingActions />}
          color="warning.main"
        />
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1" color="textSecondary">
            No recent activity.
          </Typography>
        </Paper>
      </Box>
    </PageContainer>
  );
}
