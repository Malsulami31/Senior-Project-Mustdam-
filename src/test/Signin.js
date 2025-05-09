import { auth } from "../firebase"; // Adjust the relative path if needed
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore"; // Ensure query is imported
import { db } from "../firebase";

/**
 * Handle user sign-in with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} - Resolves with a success message or rejects with an error.
 */
export const SignIn2 = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
  
      const farmerQuery = query(
        collection(db, "Farmers"),
        where("uid", "==", user.uid)
      );
      const farmerDocs = await getDocs(farmerQuery);
  
      if (!farmerDocs.empty) return "FarmerProfile";
  
      const factoryQuery = query(
        collection(db, "Factories"),
        where("uid", "==", user.uid)
      );
      const factoryDocs = await getDocs(factoryQuery);
  
      if (!factoryDocs.empty) return "Dashboard";
  
      return "NotFound";
    } catch (error) {
      throw new Error("Authentication failed.");
    }
  };