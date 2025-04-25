import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Revolutionizing Carbon Management"; // Typing effect text

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 100);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="bg-white font-sans">
        {/* Navbar */}
    <header className="fixed w-full top-0 z-50 bg-white text-gray-900 shadow-md">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Mustdam Name and Logo */}
        <div className="flex items-center space-x-4">
        <img src="/images/mustdam-logo.png" alt="Mustdam Logo" className="h-8 w-10" />
        <h1 className="text-xl text-black-500 uppercase font-bold">Mustdam</h1>
        </div>

        {/* Navigation Links */}
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

      {/* Hero Section with Parallax Background */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Figure1.jfif')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5 }} className="relative z-10 px-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg ">
          Revolutionizing Carbon Management for a Sustainable Future.
          </h1>
          <button className="mt-20 px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-700 transition">
          <Link to="/register">Join Us!</Link> 
          </button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-16 flex flex-wrap items-center">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl text-gray-500 uppercase">Know About Us</h2>
          <h3 className="text-3xl font-bold mt-2">Saudi Arabia’s First Carbon Credit Market</h3>
          <p className="mt-4 text-gray-600">
          Mustdam contributes to the development of one of the first carbon credit markets and emission management in Saudi Arabia that helps organizations adhere to standards and reduce its emissions more effectively.
          It's a comprehensive solution for sustainable success.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
          >
            About Us
          </motion.button>
        </div>
        <div className="w-full md:w-1/2">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/images/Figure2.jfif"
            alt="About"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section id="services" className="py-20 bg-gray-100 px-6 md:px-16 flex flex-wrap-reverse items-center">
        <div className="w-full md:w-1/2">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/images/Figure4.jpg"
            alt="Carbon Trust"
            className="w-100 h-80 rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-xl text-gray-500 uppercase">What We Do</h2>
          <h3 className="text-3xl font-bold mt-2">Carbon Credit You Can Trust</h3>
          <p className="mt-4 text-gray-600">
          Enables companies to advance climate mitigation beyond their value chain by  investing in high-integrity carbon credits.
          It’s an opportunity for companies to take responsibility for emissions they can’t yet cut.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
          >
            <Link to="/carbon_market">Carbon Market</Link>
          </motion.button>
        </div>
      </section>

      

      {/* Registration Section */}
      <section id="register" className="py-20 px-6 md:px-16 text-center text-white relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Figure3.jfif')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-xl text-gray-300 uppercase">Registration</h2>
          <h3 className="text-3xl font-bold mt-2">We are creating a sustainable society, for everyone.</h3>
          <p className="mt-4">
          Join our sustainable community and start contributing to a greener future.
          participate in carbon credit programs, and connect with a community supporting sustainable practices.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
          >
            <Link to="/register">Register</Link>
          </motion.button>
        </div>
      </section>

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