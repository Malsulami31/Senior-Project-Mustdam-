import React from "react";
import { Link } from "react-router-dom";

export default function Carbon_Market() {
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
            <a href="/carbon_market" className="hover:text-green-400">Carbon Market</a>
            <a href="/contact" className="hover:text-green-400">Contact Us</a>
            <a href="/register" className="hover:text-green-400">Register</a>
          </nav>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </header>

      {/* Section 1 */}
      <div className="px-10 py-10 pt-24 ">
        <h1 className="text-3xl font-bold mb-4 text-left">ــــــــــ   Know About Us</h1>
        <h2 className="text-2xl font-semibold mb-2 text-green-700 text-left">
          What is the Carbon Market?
        </h2>
        <p className="text-lg text-gray-700 text-left">
          It is a pricing mechanism where individuals, companies, or organizations 
          can voluntarily buy and sell carbon credits to offset their greenhouse gas emissions. 
          These credits support projects that reduce or remove carbon from the atmosphere.
        </p>
        <img src='/images/Figure11.png' alt="Carbon Market" className="mt-6 w-2/3 rounded-lg shadow-md mx-auto" />
      </div>


      {/* Section 2: Carbon Credits */}
      <div className="flex items-center justify-between space-x-8 px-10 mt-20">
        <div className="w-1/2">
        <h2 className="text-2xl font-semibold mb-2 text-black-700">ـــــــــــــــــــــــــــــــــــــــــــــــــــــ</h2>
          <h2 className="text-2xl font-semibold mb-2 text-green-700">What Are Carbon Credits?</h2>
          <p className="text-lg text-gray-700">
            A carbon credit is one tonne of CO2 or equivalent that has been reduced, avoided, or sequestered by a project. 
            Carbon credits are designed to reduce overall carbon emissions by being traded in the marketplace.
          </p>
        </div>
        <img src='/images/Figure12.png' alt="Carbon Credits" className="w-100 h-80 rounded-lg shadow-md" />
      </div>

      {/* Section 3: Carbon Market Participants */}
      <div className="flex items-center justify-between space-x-8 px-10 mt-20 bg-[#FFECD7] py-10">
        <img src='/images/Figure13.jfif' alt="Carbon Market Participants" className="w-100 h-80 rounded-lg shadow-md" />
        <div className="w-1/2">
        <h2 className="text-2xl font-semibold mb-2 text-black-700">ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ</h2>
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Who Participates In Carbon Markets?</h2>
          <p className="text-lg text-gray-700">
            Factories, or organizations that are looking to reduce their carbon footprint or trade it. 
            They can do this by purchasing carbon credits on the marketplace. 
            Their purchase then provides funding for climate mitigation activities that would not otherwise be possible.
          </p>
        </div>
      </div>

        {/* Section 4 */}
  <div className="relative w-full">
    <img 
      src="/images/Figure14.jfif" 
      alt="Background" 
      className="w-full h-auto object-cover"
    />
    
    {/* Overlay Text & Button */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
      <h2 className="text-3xl font-bold mb-4">Play Your Part Today!</h2>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg">
        <Link to="/register">Register</Link>
      </button>
    </div>
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
