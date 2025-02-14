"use client";

import { useFormContext } from "react-hook-form";
import { RegisterForm, registerFormSchema } from "../forms/register";

import React from "react";

const InnerRegisterForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterForm>();

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-white ">username</label>
        <input
          type="text"
          {...register("username")}
          className="text-black p-1 rounded-lg"
        ></input>
        {errors.username && (
          <p className="text-red-400">{errors.username.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 ">
        <label className="text-white">email</label>
        <input
          type="email"
          {...register("email")}
          className="text-black p-1 rounded-lg"
        ></input>
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-white">password</label>
        <input
          type="password"
          {...register("password")}
          className="text-black p-1 rounded-lg"
        ></input>
        {errors.password && (
          <p className="text-red-400">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-white">confirm password</label>
        <input
          type="password"
          {...register("passwordConfirmation")}
          className="text-black p-1 rounded-lg"
        ></input>
        {errors.passwordConfirmation && (
          <p className="text-red-400">{errors.passwordConfirmation.message}</p>
        )}
      </div>
    </>
  );
};

export default InnerRegisterForm;
