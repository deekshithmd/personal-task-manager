import React from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto bg-transparent backdrop-blur fixed inset-0 z-50 outline-none focus:outline-none">
    <div className="relative w-auto my-6 mx-auto max-w-3xl">{children}</div>
    </div>
  );
}
