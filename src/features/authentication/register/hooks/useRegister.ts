import { useMutation } from "@tanstack/react-query";
import { type RegisterData } from "../model/register";
import { registerUser } from "../api/auth";

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      console.log(data);
      return registerUser(data);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
