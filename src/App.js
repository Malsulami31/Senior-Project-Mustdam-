import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React,{useState,useEffect} from 'react';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Contact from './pages/Contact'; 
import AboutUS from './pages/AboutUS'; 
import Carbon_Market from './pages/Carbon_Market'; 
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Project1 from './pages/Project1';
import Project2 from './pages/Project2';
import Project3 from './pages/Project3';
import Project4 from './pages/Project4';
import Project5 from './pages/Project5';
import Project6 from './pages/Project6';
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import FarmerProfile from "./pages/FarmerProfile";
import SignIn from "./pages/Signin";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} /> {/* Correct path */}
        <Route path="/contact" element={<Contact />} /> {/* Correct path */}
        <Route path="/aboutus" element={<AboutUS />} /> {/* Correct path */}
        <Route path="/carbon_market" element={<Carbon_Market />} /> {/* Correct path */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Correct path */}
        <Route path="/market" element={<Market/>} /> {/* Correct path */}
        <Route path="/project1" element={<Project1/>} /> {/* Correct path */}
        <Route path="/project2" element={<Project2/>} /> {/* Correct path */}
        <Route path="/project3" element={<Project3/>} /> {/* Correct path */}
        <Route path="/project4" element={<Project4/>} /> {/* Correct path */}
        <Route path="/project5" element={<Project5/>} /> {/* Correct path */}
        <Route path="/project6" element={<Project6/>} /> {/* Correct path */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/FarmerProfile" element={<FarmerProfile />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
