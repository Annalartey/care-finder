import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./component/LandingPage";
import SignIn from "./component/SignIn";
import SignUp from "./component/Signup";
import HospitalSearch from "./component/HospitalSearch";
import UserAuthContext from "./context/UserAuthContext";

function App() {
  return (
    <UserAuthContext>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="hospital-search" element={<HospitalSearch />} />
        </Routes>
      </div>
    </UserAuthContext>
  );
}

export default App;
