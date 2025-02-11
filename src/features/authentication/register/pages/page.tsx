import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="my-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
