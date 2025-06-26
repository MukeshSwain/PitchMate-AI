import React from "react";
import HeroSection from "../components/HeroSection";

import SampleEmail from "../components/SampleEmail";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Features from "../components/Feature";


function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br max-w-full   bg-gray-900 p-0 sm:px-6 py-10 flex flex-col items-center justify-start font-sans">
        <HeroSection />
       {/* <MockInterviewForm/> */}
       
        
        <Features />

        <SampleEmail />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
