import "./globals.css";
import type { Metadata } from "next";
import ReduxProvider from "@/components/redux-provider";

export const metadata: Metadata = {
  title: "Task Manager App",
  description: "Task Manager Application to manage daily tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body>
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
