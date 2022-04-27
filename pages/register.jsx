import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Forms } from "../components/Forms";
const Register = () => {
  return (
    <>
      <Header />
      <div id="wrapper" className="flex flex-col min-h-full">
        <Forms />
        <Footer className="mt-auto" />
      </div>
    </>
  );
};
export default Register;
