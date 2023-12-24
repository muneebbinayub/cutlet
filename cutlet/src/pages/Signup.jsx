import React from "react";
import { useState } from "react";

export const Signup = () => {

  const [savingError,setSavingError] = useState('');
  const [savingSuccess,setSavingSuccess] = useState('');
  const [formData,setFormData] = useState({
    username:'',
    email:'',
    password:'',
  });

  const handleChange=((e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
    console.log(e.target.value)
  })

  const handelSubmit = ((e)=>{
    e.preventDefault();
    fetch("http://localhost:200/api/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(formData)
    }).then((resp)=>{
      if(resp.status=== 200){
        setSavingError("");
        console.log("user created successfully",resp);
        setSavingSuccess("user created successfully");
      }else{
        setSavingSuccess("");
        setSavingError("User not created")
        console.log("user not created")
      }
    }).catch((err)=>{
      console.log("user not created error:",err);
      setSavingError("User not created");
    })
  })
  return (
    <section className="section bg-primary flex items-center justify-center flex-col gap-7">
      <h1 className="text-myYellow text-4xl tracking-wider font-normal">
        SIGN UP
      </h1>
      <form
        onSubmit={handelSubmit}
        className="w-full flex items-center justify-center flex-col gap-7"
      >
        <input
          type="text"
          className="sm:w-4/5 md:w-1/2 lg:w-1/3 px-3 py-4 outline-none border-none bg-secoudary rounded-lg text-myWhite"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="email"
          className="mx-8 sm:w-4/5 md:w-1/2 px-3 py-4 lg:w-1/3 outline-none border-none bg-secoudary rounded-lg text-myWhite"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="mx-8 sm:w-4/5 md:w-1/2 px-3 py-4 lg:w-1/3 outline-none border-none bg-secoudary rounded-lg text-myWhite"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button
          type="sumbit"
          className="bg-myYellow sm:w-4/5 md:w-1/2 px-3 py-4 lg:w-1/3  rounded-md"
        >
          Sign up
        </button>
      </form>
      <h3 className="text-red-300">{savingError}</h3>
      <h3 className="text-myWhite">{savingSuccess}</h3>
    </section>
  );
};

export default Signup;
