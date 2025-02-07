"use client";

import CheckIcon from "@mui/icons-material/Check";
import { createContext, ReactNode, useState } from "react";

type SnackbarType = "success" | "error" | "warning" | "info";

type ShowSnackbarType = (
  message: string,
  icon?: ReactNode,
  type?: SnackbarType
) => void;

type SnackbarContextType = {
  open: boolean;
  message: string;
  type: SnackbarType;
  icon: ReactNode | null;
  showSnackbar: ShowSnackbarType;
  hideSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  open: false,
  message: "",
  icon: null,
  type: "success",
  showSnackbar: () => {},
  hideSnackbar: () => {},
});

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>("success");
  const [icon, setIcon] = useState<ReactNode | null>(<CheckIcon />);

  const showSnackbar: ShowSnackbarType = (
    message: string,
    icon?: ReactNode,
    type?: SnackbarType
  ) => {
    setMessage(message);
    setOpen(true);
    setType(type || "success");
    setIcon(icon || null);
  };

  const hideSnackbar = () => {
    setOpen(false);
    setMessage("");
    setType("success");
    setIcon(null);
  };

  return (
    <SnackbarContext.Provider
      value={{ open, message, icon, type, showSnackbar, hideSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
