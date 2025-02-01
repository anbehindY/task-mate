import { StatsCardType } from "@/types";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

const StatsCard = ({ title, value, icon, color }: StatsCardType) => {
  return (
    <Grid size={{ xs: 1, sm: 1, md: 1 }}>
      <Paper sx={{ p: 3, textAlign: "center", width: "100%" }}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3">{value}</Typography>
        {React.cloneElement(icon, { sx: { fontSize: 40, color, mt: 2 } })}
      </Paper>
    </Grid>
  );
};

export default StatsCard;
