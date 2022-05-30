import React from 'react'
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import ContactForm from '../components/ContactForm';

const ContactUs= () =>{
  return (

      <>
        <Header />
        <div id="wrapper" className="flex flex-col min-h-full">
         <ContactForm/>
          <Footer className="mt-auto" />
        </div>
      </>
    );
  
}

export default ContactUs