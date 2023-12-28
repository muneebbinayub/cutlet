import React, { useState } from 'react'


export const Admin = () => {
    const [file,setFile] = useState(null);

    const handleChange = (e)=>{
        setFile(e.target.files[0]);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',file);
        try{
            const response = await fetch('http://localhost:200/api/admin',{
                method:"POST",
                body:formData,
            });
            const data = await response.json();
            console.log(data);
        }catch(err){
            console.log("React image didnt upload",err);
        }
    }
    return (
    <div className='h-screen w-full bg-primary'>
        <form onSubmit={handleSubmit} className='w-full h-full flex items-center justify-center flex-col gap-9'>
            <input type="file" name="image" id="" onChange={handleChange}  className='mx-8 sm:w-4/5 md:w-1/2 px-3 py-4 lg:w-1/3 outline-none border-none bg-secoudary rounded-lg text-myWhite'/>
            <button type='submit' className='mx-8 sm:w-4/5 md:w-1/2 px-3 py-4 lg:w-1/3 outline-none border-none bg-myYellow rounded-lg text-primary'>submit</button>
        </form>
    </div>
  )
}

export default Admin;