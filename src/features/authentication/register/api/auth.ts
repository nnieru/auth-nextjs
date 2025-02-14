import { RegisterData, RegisterResponse } from "../model/register";

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  console.log("Registering user with data:", data);
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return await response.json();
};
