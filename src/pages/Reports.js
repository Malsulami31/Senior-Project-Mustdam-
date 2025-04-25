import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import jsPDF from "jspdf";

const FactoryReport = () => {
  const [factoryData, setFactoryData] = useState(null);
  const [emissionData, setEmissionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchFactoryAndEmissionData = async (uid) => {
      try {
        // Fetch factory data for the current user
        const factoryQuery = query(collection(db, "factory"), where("uid", "==", uid));
        const factorySnapshot = await getDocs(factoryQuery);

        if (!factorySnapshot.empty) {
          const factoryDoc = factorySnapshot.docs[0]; // Assume one factory per user
          const factory = factoryDoc.data();
          setFactoryData(factory);

          // Fetch related emission data
          const emissionQuery = query(collection(db, "emission"), where("factoryId", "==", factoryDoc.id));
          const emissionSnapshot = await getDocs(emissionQuery);

          const emissions = emissionSnapshot.docs.map((doc) => doc.data());
          setEmissionData(emissions);
        } else {
          console.error("No factory data found for this user.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Get the currently logged-in user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchFactoryAndEmissionData(user.uid);
      } else {
        console.error("No user logged in.");
        setLoading(false);
      }
    });
  }, [db, auth]);

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Factory Report", 10, 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    let yPosition = 30;

    if (factoryData) {
      Object.entries(factoryData).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`, 10, yPosition);
        yPosition += 10;
      });

      yPosition += 10;
      doc.text("Emissions Data:", 10, yPosition);
      yPosition += 10;

      emissionData.forEach((emission, index) => {
        doc.text(`Row ${index + 1} - CO2 Amount: ${emission.Co2Amount}, Month: ${emission.Month}`, 10, yPosition);
        yPosition += 10;
      });
    } else {
      doc.text("No data available.", 10, 30);
    }

    doc.save("FactoryReport.pdf");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Factory Report</h1>

      {factoryData ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p><strong>Country:</strong> {factoryData.Country}</p>
          <p><strong>Factory Name:</strong> {factoryData.FactoryName}</p>
          <p><strong>Offset:</strong> {factoryData.Offset}</p>
          <p><strong>Phone:</strong> {factoryData.Phone}</p>
          <p><strong>Carbon Emissions:</strong> {factoryData.carbonEmissions}</p>
          <p><strong>Email:</strong> {factoryData.email}</p>
          <p><strong>Energy Sources:</strong> {factoryData.energySources}</p>
          <p><strong>Industry Type:</strong> {factoryData.industryType}</p>

          <h2 className="text-lg font-bold mt-4">Emissions Data</h2>
          <ul>
            {emissionData.map((emission, index) => (
              <li key={index}>
                <strong>Month:</strong> {emission.Month}, <strong>CO2 Amount:</strong> {emission.Co2Amount}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No factory data found for the current user.</p>
      )}

      <button
        onClick={generatePDF}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Download Report as PDF
      </button>
    </div>
  );
};

export default FactoryReport;
