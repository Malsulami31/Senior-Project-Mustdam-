import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";

const Checkout = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const pricePerCredit = 10;
  const transactionFee = 2;
  const totalPrice = quantity * pricePerCredit + transactionFee;

  const handlePayment = async (e) => {
    e.preventDefault();

    const auth = getAuth();//Initializes Firebase Authentication to access user-related functions.
    const db = getFirestore();//Initializes Firebase Firestore to interact with the database.
    const user = auth.currentUser;// Represents the currently signed-in user (or null if no user is logged in).

    if (user) {//ensure the user is logged in
      try {
        // Reference to the factory document
        const factoryRef = doc(db, "Factory", user.uid);

        // Update the CarbonCreditPurchased field
        await updateDoc(factoryRef, {
          CarbonCreditPurchased: increment(quantity),
        });

        // Navigate to the confirmation page
        navigate("/confirmation", { state: { quantity, totalPrice } });
      } catch (error) {
        if (error.code === "permission-denied") {
          console.error("Permission denied: You do not have access to update this record.", error);
          alert("You do not have permission to perform this action. Please contact support.");
        } else if (error.code === "not-found") {
          console.error("Document not found: The factory record does not exist.", error);
          alert("We couldn't find your factory record. Please verify your account details.");
        } else {
          console.error("Unexpected error while updating Firestore:", error);
          alert("An unexpected error occurred while processing your purchase. Please try again later.");
        }
      }
    } else {
      alert("You need to be logged in to complete the purchase.");
    }
  };


  return (
    <div style={styles.pageContainer}>
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

      {/* Checkout Section */}
      <div style={styles.overlay}>
        <h2 style={styles.heading}>Checkout</h2>
        

        <form onSubmit={handlePayment} style={styles.paymentForm}>
          <label>Card Number:</label>
          <input type="text" required placeholder="**** **** **** ****" style={styles.input} />

          <label>Expiry Date:</label>
          <input type="text" required placeholder="MM/YY" style={styles.input} />

          <label>CVV:</label>
          <input type="text" required placeholder="123" style={styles.input} />

          <button type="submit" style={styles.payButton}>Pay Now</button>
        </form>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerSections}>
          <div style={styles.footerColumn}>
            <h4>Platform</h4>
            <p>Home</p>
            <p>About Us</p>
            <p>Carbon Market</p>
            <p>Contact Us</p>
          </div>
          <div style={styles.footerColumn}>
            <h4>Legal</h4>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
            <p>Cookies Policy</p>
            <p>Environmental Policy</p>
            <p>FAQs</p>
          </div>
          <div style={styles.footerColumn}>
            <h4>Contact Us</h4>
            <p>Email: Mustdam@gmail.com</p>
            <p>Phone: (+966) 000000001</p>
            <p>Jeddah, Saudi Arabia</p>
          </div>
          <div style={styles.footerColumn}>
            <h4>Social Media</h4>
            <img src="/images/Figure5.png" alt="Mustdam Logo" className="h-55 w-55 mt-4" />
          </div>
        </div>
        <p>&copy; 2025 Mustdam | All Rights Reserved</p>
      </footer>
    </div>
  );
};

const styles = {
  pageContainer: {
    background: "url('/images/Figure1.jfif') no-repeat center center/cover",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "10px 20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 10,
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    background: "#f3f3f3",
    padding: "5px 10px",
    borderRadius: "5px",
    width: "30%",
  },
  searchInput: {
    background: "transparent",
    outline: "none",
    border: "none",
    marginLeft: "8px",
    width: "100%",
  },
  navIcons: {
    display: "flex",
    gap: "15px",
    cursor: "pointer",
  },
  overlay: {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "2px 2px 15px rgba(0, 0, 0, 0.3)",
    width: "40%",
    margin: "auto",
    marginTop: "80px",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "15px",
  },
  summaryBox: {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  paymentForm: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  payButton: {
    background: "#28a745",
    color: "white",
    padding: "12px",
    marginTop: "15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
  footer: {
    background: "white",
    padding: "20px",
    textAlign: "center",
    borderTop: "1px solid #ccc",
  },
  footerSections: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 50px",
  },
  footerColumn: {
    textAlign: "left",
  },
  footerImage: {
    marginTop: "10px",
  },
};

export default Checkout;

