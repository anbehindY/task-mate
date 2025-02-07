"use client";

import { SnackbarContext } from "@/components/provider/SnackbarProvider";
import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";

const CustomSnackbar = () => {
  const { open, message, type, icon, hideSnackbar } =
    useContext(SnackbarContext);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        icon={icon ? icon : undefined}
        onClose={hideSnackbar}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
