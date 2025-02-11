"use client";

import { useForm, useFormContext } from "react-hook-form";

const form = useFormContext();

const RegisterForm = () => {
  return (
    <form className="bg-slate-700 p-4 rounded-lg flex gap-4 flex-col min-w-full md:min-w-[50%] lg:min-w-[30%] ">
      <div className="flex flex-col gap-1">
        <label className="text-white ">username</label>
        <input type="text" className="text-black p-1 rounded-lg"></input>
      </div>
      <div className="flex flex-col gap-1 ">
        <label className="text-white">email</label>
        <input type="email" className="text-black p-1 rounded-lg"></input>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-white">password</label>
        <input type="password" className="text-black p-1 rounded-lg"></input>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-white">confirm password</label>
        <input type="password" className="text-black p-1 rounded-lg"></input>
      </div>
      <button className="bg-black rounded-lg p-2">Register</button>
    </form>
  );
};

export default RegisterForm;
