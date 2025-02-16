import Provider from "@/components/provider";
import CustomSnackbar from "@/components/shared/CustomSnackbar";
import * as React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        <Provider>
          {children}
          <CustomSnackbar />
        </Provider>
      </body>
    </html>
  );
}
