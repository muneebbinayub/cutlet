import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import './style/App.css'
import Signup from "./pages/Signup";
import Profile from './pages/Profile'
import Admin from "./pages/Admin";
import { Hero } from "./pages/Hero";
import { HeroMain } from "./pages/HeroMain";
import myContext from "./context/contextGlobals";

export const App = () => {
  const [globalData,setGlobalData] = useState({
    name:"",
    email:"",
  })
  return (
    <div className="home">
      <myContext.Provider value={{globalData,setGlobalData}}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/admin" element={<Admin/>}></Route>
            <Route path="/hero" element={<Hero/>}></Route>
            <Route path="/heromain" element={<HeroMain/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      </myContext.Provider>
    </div>
  );
};

export default App;
