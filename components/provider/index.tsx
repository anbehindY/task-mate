import { ReactNode } from "react";
import { SnackbarProvider } from "./SnackbarProvider";
import TanstackProvider from "./TanstackProvider";
import ToolPadProvider from "./ToolpadProdvider";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ToolPadProvider>
      <TanstackProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </TanstackProvider>
    </ToolPadProvider>
  );
}
