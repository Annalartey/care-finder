import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './component/LandingPage';
import SignIn from './component/SignIn'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = { <LandingPage/> } />
        <Route path='signin' element = { <SignIn/> } />
      </Routes>
    </div>
  );
}

export default App;
