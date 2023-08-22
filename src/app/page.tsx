"use client"
import RequiresAuth from "@/components/RequireAuth";

export default function Home() {
  return (
    <RequiresAuth>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>This is protected</h1>
      </main>
    </RequiresAuth>
  );
}
