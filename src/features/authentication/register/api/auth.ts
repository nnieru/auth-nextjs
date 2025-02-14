import { RegisterData, RegisterResponse } from "../model/register";

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    const errorMessage = contentType?.includes("application/json")
      ? (await response.json()).message
      : await response.text();

    console.log(errorMessage);
    throw new Error(errorMessage || "Registration failed");
  }

  return await response.json();
};
