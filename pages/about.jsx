import React from 'react'
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import About from '../components/About';

const AboutUs= () =>{
  return (

      <>
        <Header />
        <div id="wrapper" className="flex flex-col min-h-full">
            <About/>
          <Footer className="mt-auto" />
        </div>
      </>
    );
  
}

export default AboutUs