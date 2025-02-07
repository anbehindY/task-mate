import { ReactNode } from "react";
import { SnackbarProvider } from "./SnackbarProvider";
import ToolPadProvider from "./ToolpadProdvider";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ToolPadProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ToolPadProvider>
  );
}
