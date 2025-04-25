import { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link

const Market = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-[#FDFBF6]">
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
        <img src="images/Figure17.jfif" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold text-white">
            Revolutionizing Carbon Management for a Sustainable Future
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto -mt-6 px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Project Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-10 w-[560px] mx-auto">
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Link to="/Project1">
            <img src="images/Figure19.jfif" alt="iFarm Vertical Farm" className="w-full h-40 object-cover cursor-pointer" />
          </Link>
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-lg font-bold p-2 text-center">
            iFarm Vertical Farm
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Link to="/Project2">
            <img src="images/Figure20.jfif" alt="Nongshim Farm" className="w-full h-40 object-cover cursor-pointer" />
          </Link>
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-lg font-bold p-2 text-center">
            Nongshim Farm
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Link to="/Project3">
            <img src="images/Figure18.jfif" alt="Najd Agri-Tech Estate" className="w-full h-40 object-cover cursor-pointer" />
          </Link>
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-lg font-bold p-2 text-center">
            Najd Agri-Tech Estate
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Link to="/Project4">
            <img src="images/Figure22.jfif" alt="Al-Wahat Smart Farms" className="w-full h-40 object-cover cursor-pointer" />
          </Link>
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-lg font-bold p-2 text-center">
            Al-Wahat Smart Farms
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Link to="/Project5">
            <img src="images/Figure23.jfif" alt="Saudi Greenhouses Management & Agri Marketing Greenhouses" className="w-full h-40 object-cover cursor-pointer" />
          </Link>
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-lg font-bold p-2 text-center">
            Saudi Greenhouses Management & Agri Marketing Greenhouses
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Link to="/Project6">
            <img src="images/Figure21.jfif" alt="Red Sea Farm" className="w-full h-40 object-cover cursor-pointer" />
          </Link>
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-lg font-bold p-2 text-center">
            Red Sea Farm
          </div>
        </div>
      </div>

      {/* View More Button */}
      <div className="flex justify-center my-6">
        <button type="button" className="text-white bg-yellow-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
          View More
        </button>
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

export default Market;
