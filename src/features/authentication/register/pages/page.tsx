"use client";
import React from "react";
import InnerRegisterForm from "../components/RegisterForm";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterForm, registerFormSchema } from "../forms/register";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const handleSubmit = async (data: RegisterForm) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="my-6 text-center text-3xl font-extrabold text-whitee">
            Create your account
          </h2>
          <FormProvider {...form}>
            <form
              className="bg-slate-700 p-4 rounded-lg flex gap-4 flex-col min-w-full md:min-w-[50%] lg:min-w-[30%]"
              onSubmit={form.handleSubmit(handleSubmit)}
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
