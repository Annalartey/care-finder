import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './component/LandingPage';
import SignIn from './component/SignIn'
import SignUp from './component/Signup'
import HospitalSearch from './component/HospitalSearch';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = { <LandingPage/> } />
        <Route path='signin' element = { <SignIn/> } />
        <Route path='signup' element = { <SignUp/> } />
        <Route path='hospital-search' element = { <HospitalSearch/> } />
      </Routes>
    </div>
  );
}

export default App;