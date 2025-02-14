import { useMutation } from "@tanstack/react-query";
import { type RegisterData } from "../model/register";
import { registerUser } from "../api/auth";

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      return registerUser(data);
    },

    onError: (error: Error) => {
      console.error(error);
    },
  });
}
