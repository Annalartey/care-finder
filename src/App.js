import './App.css';
import About from './component/About';
import Footer from './component/Footer';
import Home from './component/Home';
import WhyUs from './component/WhyUs';

function App() {
  return (
    <div className="App">
      <Home/>
      <About/>
      <WhyUs/>
      <Footer/>
    </div>
  );
}

export default App;
