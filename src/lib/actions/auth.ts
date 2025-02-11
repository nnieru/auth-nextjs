"use client";

import { signIn, signOut } from "next-auth/react";

export const login = async () => {
  await signIn("github", {
    callbackUrl: "http://localhost:3000",
  });
};

export const logout = async () => {
  await signOut();
};
