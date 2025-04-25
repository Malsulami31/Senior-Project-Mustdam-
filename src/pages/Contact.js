import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

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
      {/* Contact Form */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-10 py-10 pt-24"
        style={{ backgroundImage: "url('/images/Figure7.png')", backgroundSize: "cover", backgroundPosition: "center" }}>

        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl ">
          <h2 className="text-xl font-semibold text-center mb-4">Contact the Mustdam Team</h2>
          <h5 className="text-l font-semibold text-center text-gray-700">Tell us how we can help and we’ll get in touch shortly</h5>
          <form onSubmit={handleSubmit}>

            <label className="block">Name*</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2 mb-2 text-gray-700" 
              placeholder="Your Name" 
              required 
            />

            <label className="block">Email*</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2 mb-2 text-gray-700" 
              placeholder="Your Email" 
              required 
            />

            {/* Dropdown for Reason Type */}
            <label className="block">Reason*</label>
            <select 
              name="reason" 
              value={formData.reason} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2 mb-2 bg-white text-gray-700"
              required
            >
              <option value="">Select a reason</option>
              <option value="complaint">Complaint</option>
              <option value="request">Request</option>
              <option value="feedback">Feedback</option>
              <option value="inquiry">Inquiry</option>
            </select>

            <label className="block">Message*</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2 mb-2 text-gray-700" 
              placeholder="Your Message" 
              rows="5"
              required 
            />

            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded w-full mt-4">
              Send Message
            </button>
          </form>
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

