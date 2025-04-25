import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NajadFarm = () => {
  const navigate = useNavigate();
   const pricePerTon = 8.55; // Price per tCO2e
    const [quantity, setQuantity] = useState(100); // Default quantity
    const transactionFeeRate = 0.01; // 1% transaction fee
  
    // Calculate prices
    const priceBeforeFee = quantity * pricePerTon;
    const transactionFee = priceBeforeFee * transactionFeeRate;
    const totalPrice = priceBeforeFee + transactionFee;
  return (
    <div className="min-h-screen bg-[#FDFBF6] flex flex-col">
      {/* Navbar */}
      <header className="fixed w-full top-0 z-50 bg-[#FDFBF6] text-gray-900 shadow-md">
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


      {/* Hero Section */}
      <div className="relative h-80">
        <img
          src="images/Figure18.jfif"
          alt="Najd Agri-Tech Estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold text-white">Najd Agri-Tech Estate</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 md:flex md:flex-row md:gap-8">
        {/* Left Column - Farm Details */}
        <div className="w-full md:w-3/5 bg-white rounded-lg shadow-sm p-6 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-6">Farm Details</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Basic Farm Information:</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li>Farm Name:Najd Agri-Tech Estate</li>
              <li>Situated in the Najd region of central Saudi Arabia</li>
              <li>Utilizes advanced irrigation systems to overcome the arid climate challenges</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Smart Farming Technologies:</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li>Drone-based crop monitoring and precision agriculture</li>
              <li>AI-powered irrigation management</li>
              <li>Automated greenhouse systems
              IoT sensors for soil and climate monitoring</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Sustainable Practices:</h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li>Solar-powered operations</li>
              <li>Water recycling and conservation systems</li>
              <li>Automated greenhouse systems</li>
              <li>Desert agriculture innovations</li>
            </ul>
          </div>
          
          <a
           href="https://www.najdagtech.com/services-ar"
           target="_blank"
           rel="noopener noreferrer"
          >
        <button className="text-white bg-yellow-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
         Visit Farm Page
       </button>
       </a>
        </div>
        
        {/* Right Column - Pricing */}
        <div className="w-full md:w-2/5 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-center font-medium text-gray-700 mb-6">Pricing</h3>

        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm">$/tCO2e</span>
            <span className="font-medium">{pricePerTon.toFixed(2)} $/tCO2e</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-sm">Amount</span>
            <div className="flex items-center">
              <button
                className="w-6 h-6 border rounded-l flex items-center justify-center"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-t border-b"
              />
              <button
                className="w-6 h-6 border rounded-r flex items-center justify-center"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
              <span className="ml-2 text-sm">tCO2e</span>
            </div>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-sm">Price before fee</span>
            <span className="font-medium">{priceBeforeFee.toFixed(2)} SAR</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-sm">Transaction fee (1%)</span>
            <span className="font-medium">{transactionFee.toFixed(2)} SAR</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="text-sm font-medium">Total</span>
            <span className="font-bold">{totalPrice.toFixed(2)} SAR</span>
          </div>

          <button onClick={() => navigate("/checkout")} className="text-white bg-yellow-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
            Buy now {totalPrice.toFixed(2)} SAR
          </button>
        </div>
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
};

export default NajadFarm;