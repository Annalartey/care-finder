import './App.css';
import About from './component/About';
import Faqs from './component/Faqs';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './component/Home';
import WhyUs from './component/WhyUs';

function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
      <About/>
      <WhyUs/>
      <Faqs/>
      <Footer/>
    </div>
  );
}

export default App;
