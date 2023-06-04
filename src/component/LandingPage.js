import React from 'react'
import About from './About';
import Faqs from './Faqs';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import WhyUs from './WhyUs';


function LandingPage() {
  return (
    <div>
      <Header/>
      <Home/>
      <About/>
      <WhyUs/>
      <Faqs/>
      <Footer/>
    </div>
  )
}

export default LandingPage