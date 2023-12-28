import React, { useEffect, useState } from "react";
// import useHistory from 'react-router-dom'

export const Profile = () => {
    const [loadData, setLoadData] = useState(false);
    const [userName,setUserName] = useState("");
    const [userEmail,setUserEmail] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      console.log("hello");
      console.log(localStorage.getItem("token"));

      const response = await fetch("http://localhost:200/api/check", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (response) {
        console.log("response message", data.message);
        console.log(data);
        console.log(data.data);
        const { email, username } = data.data;
        console.log(email, username);
        setUserEmail(email);
        setUserName(username)
      } else {
        console.log("error respo");
      }
      // Assuming data.message contains the information to determine if data should be loaded
      setLoadData(data.message === "true");
    };

    fetchData();
  }, []); // Empty dependency array means this effect will only run once when the component mounts

  const logOut = () => {
    localStorage.setItem("token", "ophaibahi");
    console.log("logged out", localStorage.getItem("token"));
    history.pushState("/signin")
  };

  return (
    <section>
      {loadData && (
        <div className="h-screen  w-full p-9 bg-primary flex items-center justify-center flex-col gap-10 ">
          <div className="w-full bg-secoudary h-1/4 flex justify-start items-center align-start shadow-xl rounded-md">
              <img
                className="object-contain w-32 h-32 rounded-2xl mx-8"
                src="./src/assets/profile.jpg"
                alt=""
              />
          </div>
          
          <div className="bg-secoudary h-3/4 w-full text-myWhite pl-8 gap-4 flex items-start justify-center flex-col shadow-2xl rounded-md">
            <h3 className=" sm:w-4/5 md:w-1/2  py-4 lg:w-1/3  rounded-md">{userName}</h3>
            <h3 className="secoudary sm:w-4/5 md:w-1/2  py-4 lg:w-1/3  rounded-md">{userEmail}</h3>
            <h3 className="secoudary sm:w-4/5 md:w-1/2  py-4 lg:w-1/3  rounded-md">bio</h3>
            <button onClick={logOut} className="bg-myYellow sm:w-4/6 md:w-1/2 px-3 py-4 lg:w-1/5  rounded-md text-primary text-lg" type="submit">Log out</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
