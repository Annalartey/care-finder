import * as React from 'react';
import About from './About';
import Faqs from './Faqs';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import WhyUs from './WhyUs';
import { Helmet } from 'react-helmet-async'


function LandingPage() {
  return (
    <>
      {/* <Helmet>
        <title>Landing Page</title>
        <meta name="description" content="Search for a hospital in Ghana" />
      </Helmet> */}

      <div>
        <Header />
        <Home />
        <About />
        <WhyUs />
        <Faqs />
        <Footer />
      </div>
    </>
  )
}

export default LandingPage