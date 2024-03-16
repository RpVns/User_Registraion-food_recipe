import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./signIn/SignIn";
import SignUp from "./signup/SignUp";
import Home from "../pages/homePage/Home";
import AboutUs from "../pages/aboutUs/AboutUs";
import Protection from "../components/Protection";

const Main = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* <Route path="/aboutUs" element={<AboutUs/>}/> */}

          <Route path="/aboutUs" element={<Protection />}>
            <Route path="/aboutUs" element={<AboutUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Main;
