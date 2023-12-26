import React, { useEffect, useState } from 'react';

export const Profile = () => {
    const [loadData, setLoadData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log("hello");
            console.log(localStorage.getItem("token"));
            
            const response = await fetch("http://localhost:200/api/check", {
                method: "GET",
                headers: {
                    "token": localStorage.getItem("token")
                }
            });

            const data = await response.json();
            if(response){
                console.log("response message",data.message);
                console.log(data);
                console.log(data.data);
                const {email,username} = data.data;
                console.log(email,username);
            }
            else{
                console.log("error respo")
            }
            // Assuming data.message contains the information to determine if data should be loaded
            setLoadData(data.message === 'true'); 
        };

        fetchData();
    }, []); // Empty dependency array means this effect will only run once when the component mounts

    const logOut = ()=>{
        localStorage.setItem("token","ophaibahi");
        console.log("logged out",localStorage.getItem("token"))
    }

    return (
        <section>
            {loadData && (
                <div>
                    <h1 className='text-white'>Hello, I am there !!!!!!!!!</h1>
                    <button onClick={logOut} className='bg-red-800 px-5'>Logout</button>
                </div>
            )}
        </section>
    );
};

export default Profile;
