import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import './style/App.css'
import Signup from "./pages/Signup";
import Profile from './pages/Profile'

export const App = () => {
  return (
    <div className="home">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
