"use client";
import { notFound, useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const VerificationPage = () => {
  const params = useParams();
  if (!params) {
    notFound();
  }
  const id = params.id;
  const form = useForm();
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl">
        Hi! Welcome <strong>name-template</strong>{" "}
      </h1>
      <p className="text-lg">
        please input your token here and click verify button ^^
      </p>
      <p>ID: {id}</p>
      <FormProvider {...form}>
        <form
          className="min-w-0.5"
          onSubmit={form.handleSubmit((data) => {
            const joinedData = Object.values(data.token).join("");
            console.log(joinedData);
          })}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="p-4 rounded-lg text-black text-center w-12"
                  {...form.register(`token[${index}]`, {
                    required: true,
                    maxLength: 1,
                    onChange: (e) => {
                      const input = e.target as HTMLInputElement;
                      if (input.value.length > 1) {
                        input.value = input.value.slice(0, 1);
                      }
                    },
                  })}
                />
              ))}
            </div>
            <button
              type="submit"
              className="p-2 rounded-lg bg-blue-800 hover:bg-blue-500 w-full"
            >
              Verify
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default VerificationPage;
