import React, { useState, useMemo } from 'react';
import { User, Search, ChevronDown, X, Trash2, Edit } from 'lucide-react';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "/Users/ghadihersi/Desktop/Senior-Project-Mustdam--Mustdam_Frontend/src/firebase.js"; 
import { useEffect } from 'react';
import { doc, updateDoc,deleteDoc } from "firebase/firestore";
import { auth } from "/Users/ghadihersi/Desktop/Senior-Project-Mustdam--Mustdam_Frontend/src/firebase.js"; 
import { query, where,onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";




const FarmerProfile = () => {
  const [sortOption, setSortOption] = useState('Newest');
  const [activePage, setActivePage] = useState("FarmerProfile");
  const [isAddCreditModalOpen, setIsAddCreditModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [credits, setCredits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCredit, setNewCredit] = useState({
    projectSource: '',
    amount: '',
    pricePerCredit: ''
  });
  const [editingCredit, setEditingCredit] = useState(null);
  const db = getFirestore(app);
  const [formErrors, setFormErrors] = useState({
    projectSource: false,
    amount: false,
    pricePerCredit: false
  });



//fetch  logged in user carbon credit
  useEffect(() => {
    let unsubscribeCredits = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {//make sure the user is logged in
        // User is logged in, fetch their credits
        const creditsQuery = query(
          collection(db, "CarbonCredits"),
          where("uid", "==", user.uid)
        );

        unsubscribeCredits = onSnapshot(creditsQuery, (querySnapshot) => {
          const userCredits = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setCredits(userCredits);
        });
      } else {
        // User is logged out
        setCredits([]);
      }
    });

    return () => {
      if (unsubscribeCredits) unsubscribeCredits();
      unsubscribeAuth();
    };
  }, []);




  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    const setterFunction = isEditing ? setEditingCredit : setNewCredit;
    
    setterFunction(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    setFormErrors(prev => ({
      ...prev,
      [name]: false
    }));
  };


//validate inputs
  const validateForm = (creditToValidate, isEditing = false) => {
    const errors = {
      projectSource: !creditToValidate.projectSource.trim(),//value must not be empty
      amount: !creditToValidate.amount || parseFloat(creditToValidate.amount) <= 0,// The value must be a positive number.
      pricePerCredit: !creditToValidate.pricePerCredit || parseFloat(creditToValidate.pricePerCredit) <= 0//The value must be a positive number.
    };

    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };



const handleAddCredit = async () => {

  //validate input before adding the credits
  if (!validateForm(newCredit)) return;
  // Get the current user's UID
  const user = auth.currentUser;
  // if no user logged in show error
  if (!user) {
    console.error("No user is logged in");
    return;
  }
// object of info to be added in the database
  const creditToAdd = {
    ...newCredit,
    amount: parseFloat(newCredit.amount),
    pricePerCredit: parseFloat(newCredit.pricePerCredit),
    date: new Date().toISOString().split("T")[0],
    status: "Active",
    uid: user.uid, // Attach the user's UID
  };

  try {
    const docRef = await addDoc(collection(db, "CarbonCredits"), creditToAdd);// add doc in which we will add the new credit

   // The rest of the credits (prevCredits) are added after it.
    setCredits((prevCredits) => [{ id: docRef.id, ...creditToAdd }, ...prevCredits]);//Adds the new credit (including Firestore document ID) at the beginning of the array.
    setNewCredit({ projectSource: "", amount: "", pricePerCredit: "" });
    setIsAddCreditModalOpen(false);
  } catch (error) {
    console.error("Error adding credit to Firestore:", error);
  }
};

  

  
const handleEditCredit = async () => {
  if (!validateForm(editingCredit, true)) return;
  //the editingCredit object contains all the information about the credit being edited,
  const { id, ...rest } = editingCredit;
  // It prepares a new object with the updated credit information.
  const creditToUpdate = {
    ...rest,
    amount: parseFloat(editingCredit.amount),//ensure amount is a number
    pricePerCredit: parseFloat(editingCredit.pricePerCredit),//ensure price is a number
  };

  try {
    //Updates the document in Firestore with the creditToUpdate data.
    const docRef = doc(db, "CarbonCredits", id);
    await updateDoc(docRef, creditToUpdate);

    // Updates the app's local list of credits 
    setCredits((prevCredits) =>
      prevCredits.map((credit) =>//Loops through the existing credits (prevCredits).
        credit.id === id ? { ...credit, ...creditToUpdate } : credit//If a credit's id matches the id of the edited credit, it replaces that credit with the updated data.
      )
    );

    setIsEditModalOpen(false);
    setEditingCredit(null);//Clears the editingCredit state to reset the editing form.
  } catch (error) {
    console.error("Error editing credit in Firestore:", error);
  }
};





const handleDeleteCredit = async (id) => {
  if (!window.confirm("Are you sure you want to delete this credit?")) return;

  try {
    // Delete the credit from Firestore
    await deleteDoc(doc(db, "CarbonCredits", id));

    // Updates the local state by removing the credit with the matching id from the credits array.
    setCredits((prevCredits) => prevCredits.filter((credit) => credit.id !== id));
  } catch (error) {
    console.error("Error deleting credit from Firestore:", error);
  }
};

  const handleEditModalOpen = (credit, index) => {
    setEditingCredit({ ...credit, index });
    setIsEditModalOpen(true);//This tells the app to show the modal for editing.
  };



  // Filtered and sorted credits
  const processedCredits = useMemo(() => {
    // First, filter by search term
    let filteredCredits = credits.filter(credit => 
      credit.projectSource.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Then sort 
    return filteredCredits.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOption === 'Newest' 
        ? dateB.getTime() - dateA.getTime() 
        : dateA.getTime() - dateB.getTime();
    });
  }, [credits, searchTerm, sortOption]);


  return (

      <div className="min-h-screen bg-gray-100 flex h screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm p-4">
        <nav>
          <div className="flex items-center text-gray-600 mb-4 bg-orange-50 p-2 rounded">
            <User className="mr-3 text-orange-500" />
            <span className="font-semibold text-orange-600">Farm Admin</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-500 hover:bg-gray-100 p-2 rounded">
            <Link to="/Home" className="flex items-center text-gray-500 hover:bg-gray-100 p-2 rounded">
                <span>Home</span>
              </Link>
            </div>
            <div className="flex items-center text-gray-500 hover:bg-gray-100 p-2 rounded">
            <Link to="/Market" className="flex items-center text-gray-500 hover:bg-gray-100 p-2 rounded">
                <span>Market</span>
              </Link>
            </div>
            <div className="flex items-center text-gray-500 hover:bg-gray-100 p-2 rounded">
              <span>Settings</span>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-800 text-lg font-medium">
            Hello 👋
          </div>
        </div>

        {/* Credit Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white shadow-sm rounded-lg p-4 text-center">
            <div className="text-sm text-gray-500 mb-2">Total Available Credits</div>
            <div className="text-xl font-semibold text-gray-800">
              {credits.reduce((total, credit) => total + parseFloat(credit.amount), 0).toFixed(2)} tCO2e
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-4 text-center">
            <div className="text-sm text-gray-500 mb-2">Total Value</div>
            <div className="text-xl font-semibold text-gray-800">
              {(credits.reduce((total, credit) => 
                total + (parseFloat(credit.amount) * parseFloat(credit.pricePerCredit)), 0)).toFixed(2)} SAR
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-lg p-4 text-center">
            <div className="text-sm text-gray-500 mb-2">Average Price</div>
            <div className="text-xl font-semibold text-gray-800">
              {credits.length > 0 
                ? (credits.reduce((total, credit) => 
                    total + parseFloat(credit.pricePerCredit), 0) / credits.length).toFixed(2)
                : '0.00'}/tCO2e SAR
            </div>
          </div>
        </div>

        {/* Credits Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold">All Credits</div>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-2 top-3 text-gray-400 h-4 w-4" />
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setSortOption(prevOption => 
                  prevOption === 'Newest' ? 'Oldest' : 'Newest'
                )}
                className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                Sort by: {sortOption}
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Credits Table or Empty State */}
        {credits.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg w-full ">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processedCredits.map((credit, index) => (
                  <tr key={index}>
                    <td className="p-3 whitespace-nowrap">{credit.projectSource}</td>
                    <td className="p-3 whitespace-nowrap">{credit.amount} tCO2e</td>
                    <td className="p-3 whitespace-nowrap">{credit.pricePerCredit}/tCO2e SAR</td>
                    <td className="p-3 whitespace-nowrap">{credit.date}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        credit.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {credit.status}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap flex space-x-2">
                      <button 
                        onClick={() => handleDeleteCredit(credit.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditModalOpen(credit, index)}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                You haven't added any carbon credits yet.
              </h2>
              <p className="text-gray-600 mb-6">
                Start recording your sustainable practices to generate credits.
              </p>
              
              <button 
                onClick={() => setIsAddCreditModalOpen(true)}
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Add New Credit
              </button>
            </div>
          </div>
        )}

        {/* Add Credit Modal */}
        {isAddCreditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
              <button 
                onClick={() => setIsAddCreditModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-semibold mb-6">Add New Carbon Credit</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Source</label>
                  <input
                    type="text"
                    name="projectSource"
                    value={newCredit.projectSource}
                    onChange={(e) => handleInputChange(e)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                      formErrors.projectSource 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                    placeholder="e.g. Renewable Energy"
                  />
                  {formErrors.projectSource && (
                    <p className="text-red-500 text-xs mt-1">Project source is required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (tCO2e)</label>
                  <input
                    type="number"
                    name="amount"
                    value={newCredit.amount}
                    onChange={(e) => handleInputChange(e)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                      formErrors.amount 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                    placeholder="Enter amount"
                  />
                  {formErrors.amount && (
                    <p className="text-red-500 text-xs mt-1">Valid amount is required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Credit (SAR)</label>
                  <input
                    type="number"
                    name="pricePerCredit"
                    value={newCredit.pricePerCredit}
                    onChange={(e) => handleInputChange(e)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                      formErrors.pricePerCredit 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                    placeholder="Enter price"
                  />
                  {formErrors.pricePerCredit && (
                    <p className="text-red-500 text-xs mt-1">Valid price is required</p>
                  )}
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsAddCreditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCredit}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Credit Modal */}
        {isEditModalOpen && editingCredit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-semibold mb-6">Edit Carbon Credit</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Source</label>
                  <input
                    type="text"
                    name="projectSource"
                    value={editingCredit.projectSource}
                    onChange={(e) => handleInputChange(e, true)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                      formErrors.projectSource 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                    placeholder="e.g. Renewable Energy"
                  />
                  {formErrors.projectSource && (
                    <p className="text-red-500 text-xs mt-1">Project source is required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (tCO2e)</label>
                  <input
                    type="number"
                    name="amount"
                    value={editingCredit.amount}
                    onChange={(e) => handleInputChange(e, true)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                      formErrors.amount 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                    placeholder="Enter amount"
                  />
                  {formErrors.amount && (
                    <p className="text-red-500 text-xs mt-1">Valid amount is required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price per Credit (SAR)</label>
                  <input
                    type="number"
                    name="pricePerCredit"
                    value={editingCredit.pricePerCredit}
                    onChange={(e) => handleInputChange(e, true)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                      formErrors.pricePerCredit 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                    placeholder="Enter price"
                  />
                  {formErrors.pricePerCredit && (
                    <p className="text-red-500 text-xs mt-1">Valid price is required</p>
                  )}
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditCredit}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add New Credit Button */}
        {credits.length > 0 && (
          <div className="mt-4 text-right">
            <button 
              onClick={() => setIsAddCreditModalOpen(true)}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Add New Credit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerProfile;