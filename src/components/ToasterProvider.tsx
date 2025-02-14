"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  );
}
