"use client";
import React from "react";
import InnerRegisterForm from "../components/RegisterForm";
import { FormProvider, useForm } from "react-hook-form";
import { type RegisterForm, registerFormSchema } from "../forms/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
  const form = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(registerFormSchema),
  });

  const { mutate: register, isPending, isSuccess } = useRegister();

  const onSubmit = (data: RegisterForm, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    register(
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  const onError = (errors: any) => {
    console.log("❌ Validation failed!", errors);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="my-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <FormProvider {...form}>
            <form
              className="bg-slate-700 p-4 rounded-lg flex gap-4 flex-col min-w-full md:min-w-[50%] lg:min-w-[30%]"
              onSubmit={form.handleSubmit(onSubmit, onError)}
            >
              <InnerRegisterForm />
              <button type="submit" className="bg-black rounded-lg p-2">
                Register
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
