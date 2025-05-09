import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db,auth } from "/Users/ghadihersi/Desktop/Senior-Project-Mustdam--Mustdam_Frontend/src/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';



const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      // Check 'farmers' collection
      const farmerQuery = query(collection(db, "Farmer"), where("email", "==", userEmail));
      const farmerSnapshot = await getDocs(farmerQuery);

      if (!farmerSnapshot.empty) {
        console.log("Farmer data found:", farmerSnapshot.docs[0].data());
        navigate("/FarmerProfile");
        return;
      }

      // Check 'factories' collection
      const factoryQuery = query(collection(db, "Factory"), where("email", "==", userEmail));
      const factorySnapshot = await getDocs(factoryQuery);

      if (!factorySnapshot.empty) {
        console.log("Factory data found:", factorySnapshot.docs[0].data());
        navigate("/Dashboard");
        return;
      }

      // User not found in either collection
      console.error("User data not found in either collection.");
      alert("User data not found. Please contact support.");

    } catch (error) {
      console.error("Sign-in error:", error.message);
      alert("Authentication failed: " + error.message);
    }
  };

  return (

    
    <div
  className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-10 py-10 pt-24"
  style={{ backgroundImage: "url('/images/Figure6.png')", backgroundSize: "cover", backgroundPosition: "center" }}
>
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
                <a href="#register" className="hover:text-green-400">Register</a>
              </nav>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg">
                <Link to="/register">Register</Link>
              </button>
            </div>
          </header>
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
    <h2 className="text-xl font-semibold text-center mb-4">Sign In</h2>
    <h4 className="text-l font-semibold text-center text-gray-700 mb-4">
      Please enter your email and password to log into your account.
    </h4>

    <label className="block">Email*</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border rounded px-3 py-2 mb-4"
      placeholder="Example@gmail.com"
    />

    <label className="block">Password*</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full border rounded px-3 py-2 mb-4"
      placeholder="Enter your password"
    />

    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handleSignIn}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Sign In
      </button>
      <p className="text-sm">
        Don't have an account?{" "}
        <Link to="/Register" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  </div>
</div>

  );
};

export default SignIn;
