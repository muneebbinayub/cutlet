import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import myContext from '../context/contextGlobals';

export const HeroMain = () => {
    const {globalData,setGlobalData} = useContext(myContext)
    const [userData,setUserData] = useState(null);
    const navigateTo = useNavigate();
    useEffect(()=>{
        const fetchAll = async()=>{
            try{
                const response = await fetch('http://localhost:200/api/heromain');
                if(response.status===200){
                    const data = await response.json();
                    setUserData(data);
                    console.log(data);
                }
                else if(response.status==404){
                    console.log(data);
                    console.log("Data Not Found");
                }
            }catch(err){
                console.log("Error 404 internal server error",err);
            }
        }
        fetchAll();
    },[]);

    const handleClick = (name) => {
        setGlobalData({ name: name });
      };
    
      useEffect(() => {
        // This effect will run after globalData has been updated
        if(globalData.name)
        {
            console.log('done');
        navigateTo('/hero');
        console.log("globaldata:",globalData.name);}
        }, [globalData]);

  return (
    <div className='h-full overflow-hidden w-screen bg-primary text-white flex items-center justify-center flex-col gap-10  p-5 '>{userData && userData.map((user, index) => (
        <div onClick={()=>handleClick(user.username)} className='overflow-hidden w-3/4  bg-secoudary whitespace-normal rounded-md p-7 flex items-center justify-center gap-7 flex-col' key={index}>
          <p>{` ${user.username}`}</p>
          <p className='whitespace-normal'>{`Email: ${user.email}`}</p>
          {/* Add other fields you want to display */}
        </div>
      ))}</div>
  )
}

