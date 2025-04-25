import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "/Users/ghadihersi/Desktop/Senior-Project-Mustdam--Mustdam_Frontend/src/firebase.js";



export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    name: "",
    farmSize: "",
    Phone:"",
    Offset:"",
    FactoryName:"",
    FarmName:"",
    energySources:"",
    carbonEmissions: "",
    industryType:"",
    Country:"",
    SustainablePrac:"",
    farmingMethods:"",
    useCase: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.email.includes("@")) newErrors.email = "Invalid email";
      if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }
    if (step === 2 && !formData.userType) newErrors.userType = "Please select a user type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step === 2 && formData.userType === "farmer") {
        setStep(3); // Show farmer form
      } else if (step === 2 && formData.userType === "factory") {
        setStep(4); // Show factory form
      } else if (step === 3) {
        setStep(5); 
      } else {
        setStep((prev) => prev + 1);
      }
    }
  };
  const prevStep = () => {
    if (step === 4) {
        setStep(2); 
    } else if (step === 5 && formData.userType === "factory") {
        setStep(4); // Show factory form
    } else if (step === 5 && formData.userType === "farmer") {
        setStep(3); // Show farmer form
    } else {
    setStep((prev) => prev - 1);
    }
  };
  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      file: event.target.files[0],
    });
  };

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!formData.email || !formData.password || !formData.userType) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
        let userType=formData.userType;
      let userData = {
        email: formData.email,
      };
  
      if (userType === "farmer") {
        userData = {
          ...userData,
          FarmName:formData.FarmName,
          FarmPhone:formData.Phone,
          farmSize: formData.farmSize,
          farmingMethods: formData.farmingMethods,
          SustainablePrac:formData.SustainablePrac,
          Country:formData.Country,
        };
      } else if (userType === "factory") {
        userData = {
          ...userData,
          factoryName: formData.FactoryName,
          Offset: formData.Offset,
          industryType:formData.industryType,
          FactoryName:formData.FactoryName,
          Phone:formData.Phone,
          carbonEmissions:formData.carbonEmissions,
          energySources:formData.energySources,
          Country:formData.Country,

        };
      }
        if (userType === "factory"){
          await setDoc(doc(db, "Factory", user.uid), userData);
          console.log("User document written successfully!");
        } else if (userType === "farmer"){
          await setDoc(doc(db, "Farmer", user.uid), userData);
          console.log("User document written successfully!");
        } 
      // 4. Redirect user
      if (formData.userType === "factory") {
        navigate("/Dashboard");
      } else if (formData.userType === "farmer") {
        navigate("/FarmerProfile");
      }

    } catch (error) {
       alert("Failed to register: " + error.message);
       console.error("Error during sign-up:", error.message);
    }
     alert("Registered Successfully!");
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
            <a href="#register" className="hover:text-green-400">Register</a>
          </nav>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </header>

      {/* Registration Form */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-10 py-10 pt-24"
        style={{ backgroundImage: "url('/images/Figure6.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className={`bg-white shadow-lg rounded-lg p-6 w-full ${step === 1 ? "max-w-md" : step === 2 ? "max-w-lg" : "max-w-xl"}`}>

        {step === 1 && (
  <div className="scrollable-container">
    <h2 className="text-xl font-semibold text-center mb-4">Login details</h2>
    <h4 className="text-l font-semibold text-center text-gray-700">
      Enter your email address and a password. These will be the credentials you will use to log into the platform. We will send you an email to validate your account.
    </h4>
    <label className="block">Email*</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2 mb-1"
      placeholder="Example@gmail.com"
    />
    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

    <label className="block">Password*</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2 mb-1"
      placeholder="Password must be 6 characters"
    />
    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

    <label className="block">Confirm Password*</label>
    <input
      type="password"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2 mb-1"
      placeholder="Repeat Password "
    />
    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

    <div className="flex justify-between items-center mt-4">
      <button
        onClick={nextStep}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Continue
      </button>
      <p className="text-sm">
        Already have an account?{" "}
        <Link to="/Signin" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  </div>
)}

          
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-center mb-4">Type of User</h2>
              <h4 className="text-l font-semibold text-center mb-4 text-gray-700">Are you joining Mustdam as a farmer or a factory representative?</h4>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" name="userType" value="farmer" onChange={handleChange} className="mr-2" />  I am registering as a Farmer
                </label>
                <label className="flex items-center">
                  <input type="radio" name="userType" value="factory" onChange={handleChange} className="mr-2" /> I am registering as a Factory
                </label>
              </div>
              {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}

              <div className="flex justify-between mt-4">
                <button onClick={prevStep} className="bg-yellow-500 text-white px-4 py-2 rounded">Back</button>
                <button onClick={nextStep} className="bg-yellow-500 text-white px-4 py-2 rounded">Continue</button>
              </div>
            </div>
          )}
          {step === 3 && formData.userType === "farmer" && (
            <div>
                <h2 className="text-xl font-semibold text-center mb-4">Profile Information</h2>
            
                <label className="block">Name*</label>
                <input type="text" name="FarmName" value={formData.FarmName} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="write name here" />
                
                <label className="block">Phone</label>
                <input type="number" name="Phone" value={formData.Phone} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="write phone here" />

                <label className="block">Country*</label>
                <input type="text" name="Country" value={formData.Country} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="write country here" />

                <label className="block">Type of farming</label>
                <textarea name="farmingMethods" value={formData.farmingMethods}  onChange={handleChange}  className="w-full border rounded px-3 py-2 mb-1"  placeholder="Write type of farming here" rows={3}/>

                <label className="block">Farm Size (in hectares)</label>
                <input type="Number" name="farmSize" value={formData.farmSize} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="writ Farm Size here" />
                
                <label className="block">Sustainable Practices</label>
                <textarea   type="text" name="SustainablePrac"  value={formData.SustainablePrac}  onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1"  placeholder="Write sustainable practices here"rows={3}/>

                <div className="flex justify-between mt-4">
                <button onClick={prevStep} className="bg-yellow-500 text-white px-4 py-2 rounded">Back</button>
                <button onClick={nextStep} className="bg-yellow-500 text-white px-4 py-2 rounded">Continue</button>
              </div>
            </div>
        )}
         {step === 4 && formData.userType === "factory" && (
            <div>
                <h2 className="text-xl font-semibold text-center mb-4 ">Profile Information</h2>
            
                <label className="block">Name*</label>
                <input type="text" name="FactoryName" value={formData.FactoryName} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="write name here" />
                
                <label className="block">Phone</label>
                <input type="text" name="Phone" value={formData.Phone} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="write phone here" />

                <label className="block">Country*</label>
                <input type="text" name="Country" value={formData.Country} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="write country here" />

                <label className="block">Industry Type</label>
                <input type="text" name="industryType" value={formData.industryType} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="write industry type here" />

                <label className="block">Energy Sources</label>
                <input type="text" name="energySources" value={formData.energySources} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="writ Energy Sources here" />
                
                <label className="block">Enter your factory’s annual carbon emissions</label>
                <input type="text" name="carbonEmissions" value={formData.carbonEmissions} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="write factory’s annual carbon emissions (in metric tons) here" />

                <label className="block">Offset Goal</label>
                <input type="text" name="Offset" value={formData.Offset} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-1" placeholder="write your Offset Goal here" />

                <label className="block">Upload any existing reports or data for analysis*</label>
                <input type="file" onChange={handleFileChange} className="w-full border rounded px-3 py-2 mb-1" />

                <div className="flex justify-between mt-4">
                <button onClick={prevStep} className="bg-yellow-500 text-white px-4 py-2 rounded">Back</button>
                <button onClick={nextStep} className="bg-yellow-500 text-white px-4 py-2 rounded">Continue</button>
              </div>
            </div>
        )}
        {step === 5 && (
    <div>
        <h2 className="text-xl font-semibold text-center mb-4">Use of the Platform</h2>
        <h4 className="text-l font-semibold text-center mb-6 text-gray-700">
        By default, all users can purchase carbon credits to offset their emissions.
        Please specify how else you will use Mustdam:
        </h4>
        <div className="space-y-4"> {/* Vertical space between checkboxes */}
        <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" name="userType" />
            I only want to buy or offset carbon credits or contribute to sustainability projects.
        </label>
        <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" name="userType" />
            I want to stay updated with the latest sustainability news and offers.
        </label>
        <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" name="userType" />
            I agree to Mustdam's terms and conditions.
        </label>
        </div>

        <div className="flex justify-between mt-6"> {/* Increased margin-top */}
        <button onClick={prevStep} className="bg-yellow-500 text-white px-4 py-2 rounded">Back</button>
        <button onClick={handleSignUp} className="bg-yellow-500 text-white px-4 py-2 rounded">Sign up</button>
        </div>
    </div>
    )}

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