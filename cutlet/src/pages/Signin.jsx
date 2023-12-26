import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Signin = () => {

  const [invalidError,setInvalidError]=useState('');
  const [isValid,setIsValid]=useState('');
  const [formData,setFormData] = useState({
    email:'',
    password:'',
  });

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
    console.log(e.target.value)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await fetch('http://localhost:200/api/signin',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData)
    }).then(async(reso)=>{
      const data = await reso.json();
      if(reso.status===200)
      {
        setInvalidError("");
        setIsValid(data.message);
        localStorage.setItem("token",data.message)
        console.log("muneeb",localStorage.getItem("token"));
      }
      else if(reso.status===404){
        setIsValid("");
        setInvalidError(data.message);
      }
    }).catch((err)=>{
      setIsValid("");
      setInvalidError("internal server error")
      console.log(err);
    })
  }
  return (
    <section className="section bg-primary flex items-center justify-center flex-col gap-7">
      <h1 className="text-myYellow text-4xl tracking-wider font-normal">
        SIGN IN
      </h1>
      <form onSubmit={handleSubmit} className="w-full flex items-center justify-center flex-col gap-7">
        <input
          type="email"
          className="sm:w-4/5 md:w-1/2 lg:w-1/3 px-3 py-4 outline-none border-none bg-secoudary rounded-lg text-myWhite"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="text"
          className="mx-8 sm:w-4/5 md:w-1/2 px-3 py-4 lg:w-1/3 outline-none border-none bg-secoudary rounded-lg text-myWhite"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button
          type="sumbit"
          className="bg-myYellow sm:w-4/5 md:w-1/2 px-3 py-4 lg:w-1/3  rounded-md"
        >
          Sign in
        </button>
      </form>
      <h3 className="text-myWhite">New user? <Link to={"/signup"}>Sign up</Link> </h3>
      <h3 className="text-red-700">{invalidError}</h3>
      <h3 className="text-myWhite">{isValid}</h3>
    </section>
  );
};

export default Signin;
