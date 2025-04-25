import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";




export default function AboutUs() {
  return (
    <div className="bg-white font-sans">
      {/* Navbar */}
      <header className="fixed w-full top-0 z-50 bg-white text-gray-900 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/images/mustdam-logo.png" alt="Mustdam Logo" className="h-8 w-10" />
            <h1 className="text-xl text-black-500 uppercase font-bold">Mustdam</h1>
          </div>
          <nav className="space-x-6">
            <a href="/" className="hover:text-green-400">Home</a>
            <a href="/aboutus" className="hover:text-green-400">About Us</a>
            <a href="#carbon-market" className="hover:text-green-400">Carbon Market</a>
            <a href="/contact" className="hover:text-green-400">Contact Us</a>
            <a href="/register" className="hover:text-green-400">Register</a>
          </nav>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </header>

      <div className="bg-amber-50 w-full mx-auto px-8 py-4 font-sans">
       
       <section className="py-12">
<div className="w-full px-8">
<div className="flex flex-col md:flex-row gap-6 items-center">
<div className="md:w-1/3">
 <img src='/images/Figure24.png' alt="logo" className="w-full h-auto rounded-lg " />
</div>
<div className="w-full md:w-2/3">
     <div className="mb-4">
       <div className="flex items-center mb-2">
         <div className="w-8 h-px bg-gray-400 mr-3"></div>
         <span className="text-xs font-medium tracking-wider text-gray-600 uppercase">KNOW ABOUT US</span>
       </div>
       
       <h1 className="text-5xl  font-bold mb-6">
         What Does <span className="text-olive-600">Mustdam</span> Means?
       </h1>
       
       <p className="text-gray-700 max-w-full">
         The name Mustdam is derived from the Arabic word for "sustainable" reflecting our commitment to 
         environmental responsibility and long-term ecological balance. Inspired by Saudi Vision 2030's goals of 
         reducing carbon emissions and promoting green initiatives.
       </p>
     </div>
   </div>
 </div>
 </div>
</section>

<section className="w-full bg-white py-12 ">
<div className="w-full">
 <div className="mb-8">
   <h2 className="text-4xl font-bold text-black mb-4">About Mustdam</h2>
   <h3 className="text-3xl font-semibold text-orange-600 mb-6">Saudi Arabia's First Carbon Credit Market</h3>
   <p className="text-gray-700 text-xl">
     Mustdam proudly stands as Saudi Arabia's first dedicated carbon credit marketplace, pioneering a new era of environmental sustainability and economic opportunity in the Kingdom. 
     Our groundbreaking platform bridges the gap between organizations seeking to manage their carbon footprint and farmers implementing sustainable practices, 
     establishing a foundation for the nation's growing green economy.
   </p>
 </div>
 <div className="w-full h-64 relative rounded-2xl overflow-hidden shadow-lg">
   <img 
     src='/images/Figure8.jpg' 
     alt="Agriculture with irrigation system" 
     className="w-full h-full object-cover"


   />
 </div>
</div>
</section>

{/* Features Section */}
<section className="bg-gray-50 py-12">
 <div className="w-full px-8">
   <h2 className="text-4xl font-bold mb-8">What Sets Us Apart</h2>
   
   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
     {/* Feature 1 */}
     <div className="flex gap-4">
       <div className="bg-green-100 p-2 h-10 w-10 flex items-center justify-center rounded">
         <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
           <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
         </svg>
       </div>
       <div>
         <h3 className="font-bold text-gray-800 text-2x lmb-2">First-Mover Advantage</h3>
         <p className="text-gray-600 text-sm">
           Our first-to-market pioneering platform powers Saudi's transition towards a greener economy by providing unmatched solutions and expertise to the Saudi market.
         </p>
       </div>
     </div>
     
     {/* Feature 2 */}
     <div className="flex gap-4">
       <div className="bg-green-100 p-2 h-10 w-10 flex items-center justify-center rounded">
         <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
           <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
         </svg>
       </div>
       <div>
         <h3 className="font-bold text-gray-800 mb-2">Advanced Technology</h3>
         <p className="text-gray-600 text-sm">
           Our cutting-edge blockchain-backed platform ensures maximum transparency, equipped to measure carbon footprints and validation while facilitating real-time monitoring, reporting, and verification (MRV).
         </p>
       </div>
     </div>
     
     {/* Feature 3 */}
     <div className="flex gap-4">
       <div className="bg-green-100 p-2 h-10 w-10 flex items-center justify-center rounded">
         <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
           <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
         </svg>
       </div>
       <div>
         <h3 className="font-bold text-gray-800 mb-2">Seamless Market Integration</h3>
         <p className="text-gray-600 text-sm">
           Our platform provides seamless market interactions, connecting organizations to validated carbon offset opportunities created by forward-thinking Saudi farmers through our streamlined process.
         </p>
       </div>
     </div>
     
     {/* Feature 4 */}
     <div className="flex gap-4">
       <div className="bg-green-100 p-2 h-10 w-10 flex items-center justify-center rounded">
         <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
           <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
         </svg>
       </div>
       <div>
         <h3 className="font-bold text-gray-800 mb-2">Local Impact, Global Vision</h3>
         <p className="text-gray-600 text-sm">
           We're empowering Saudi Arabia's agricultural sector with the tools to tackle climate concerns, while helping Kingdom communities and global investors support Saudi farmers achieving Vision 2030 sustainability goals, positioning Saudi at the forefront of the regional carbon market.
         </p>
       </div>
     </div>
   </div>
 </div>
</section>

{/* Solutions Section */}
<section className="py-12">
 <div className="container mx-auto px-4">
   <h2 className="text-2xl font-bold mb-8">Our Solutions</h2>
   
   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
     {/* For Organizations */}
     <div className="bg-amber-100 p-6 rounded-lg">
       <h3 className="font-bold mb-4">For Organizations</h3>
       <ul className="list-disc pl-5 space-y-2">
         <li>Real-time monitoring and reporting</li>
         <li>Automated reporting and compliance</li>
         <li>Accurate calculation of emission levels</li>
         <li>ESG credential fulfillment and disclosure</li>
         <li>Carbon offsets certification</li>
         <li>First-mover access to Saudi Arabia's domestic carbon market</li>
       </ul>
     </div>
     
     {/* For Farmers */}
     <div className="bg-amber-100 p-6 rounded-lg">
       <h3 className="font-bold mb-4">For Farmers</h3>
       <ul className="list-disc pl-5 space-y-2">
         <li>Pioneering access to Saudi Arabia's first carbon credit market</li>
         <li>Farmer-centric sustainable practices</li>
         <li>Education implementing environmental methodologies</li>
         <li>Technology-driven validation of carbon offsets</li>
         <li>Simplified reporting and documentation processes</li>
         <li>New revenue opportunities for sustainable agriculture in the Kingdom</li>
       </ul>
     </div>
   </div>
   
   <div className="text-center mt-8">
     <a href="#" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md inline-block">Join the Movement</a>
   </div>
 </div>
</section>
   </div>

      {/* Footer */}
      <footer className="py-10 bg-white text-gray-700 text-center border-t">
      <div className="flex justify-between px-10 space-x-8">
        <a href="#" className="text-black hover:text-black hover:underline">
        <div className="font-normal">
            <p>Platform</p>
            <p className="mt-4">Home</p>
            <p>About Us</p>
            <p>Carbon Market</p>
            <p>Contact Us</p>
        </div>
        </a>
        <a href="#" className="text-black hover:text-black hover:underline">
        <div className="font-normal">
            <p>Legal</p>
            <p className="mt-4">Terms & Conditions</p>
            <p>Privacy Policy</p>
            <p>Cookies Policy</p>
            <p>Environmental Policy</p>
            <p>FAQs</p>
        </div>
        </a>
        <a href="#" className="text-black hover:text-black hover:underline">
        <div className="font-normal">
            <p>Contact Us</p>
            <p className="mt-4">Mustdam@gmail.com</p>
            <p>(+966)000000001</p>
            <p>Jeddah, Saudi Arabia</p>
        </div>
        </a>
        <a href="#" className="text-black hover:text-black hover:underline">
        <div className="font-normal">
            <p>Social Media</p>
            <img src="/images/Figure5.png" alt="Mustdam Logo" className="h-55 w-55 mt-4" />
        </div>
        </a>
    </div>
    <p className="mt-8">&copy; 2025 Mustdam | All Rights Reserved</p>
    </footer>
    </div>
  );
}
