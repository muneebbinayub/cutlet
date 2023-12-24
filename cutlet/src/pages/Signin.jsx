import React from "react";
import { Link } from "react-router-dom";

export const Signin = () => {
  return (
    <section className="section bg-primary flex items-center justify-center flex-col gap-7">
      <h1 className="text-myYellow text-4xl tracking-wider font-normal">
        SIGN IN
      </h1>
      <form method="POST" className="w-full flex items-center justify-center flex-col gap-7">
        <input
          type="text"
          className="sm:w-4/5 md:w-1/2 lg:w-1/3 px-3 py-4 outline-none border-none bg-secoudary rounded-lg text-myWhite"
          placeholder="Username"
        />
        <input
          type="text"
          className="mx-8 sm:w-4/5 md:w-1/2 px-3 py-4 lg:w-1/3 outline-none border-none bg-secoudary rounded-lg text-myWhite"
          placeholder="Password"
        />
        <button
          type="sumbit"
          className="bg-myYellow sm:w-4/5 md:w-1/2 px-3 py-4 lg:w-1/3  rounded-md"
        >
          Sign in
        </button>
      </form>
      <h3 className="text-myWhite">New user? <Link to={"/signup"}>Sign up</Link> </h3>
    </section>
  );
};

export default Signin;
