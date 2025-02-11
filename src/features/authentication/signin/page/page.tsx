import { login } from "@/lib/actions/auth";
// import "@/app/global.css";

const SignInPage = () => {
  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="bg-slate-700 p-4 rounded-lg flex gap-4 flex-col min-w-full md:min-w-[50%] lg:min-w-[30%]">
        <p>Your're not signed in</p>
        <button onClick={login} className="bg-black rounded-lg p-2">
          Sign In With Github
        </button>
        <div className="h-[1px] bg-white" />

        <form className="mt-4" action={""}>
          <div className="flex flex-col gap-2">
            <label>username</label>
            <input type="text"></input>
          </div>
          <div className="flex flex-col gap-2">
            <label>password</label>
            <input type="password"></input>
          </div>
        </form>

        <button className="bg-black rounded-lg p-2">Sign In</button>
      </div>
    </div>
  );
};

export default SignInPage;
