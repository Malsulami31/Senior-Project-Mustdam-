import React, { useState, useEffect } from "react";
import {LineChart,Line, XAxis,  YAxis, Tooltip, ResponsiveContainer, BarChart,Bar,CartesianGrid, Legend,} from "recharts";
import {LucideHome,LucideLineChart,LucideFileText,LucideSettings,LucideBell,LucideSearch,LucideUser, LucideTrendingUp,LucideCloud, LucideLeaf,} from "lucide-react";
import { db } from "../firebase"; 
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable"; 
import axios from 'axios';


const Dashboard = () => {
  const [activePage, setActivePage] = useState("/Dashboard");
  const [emissionsData, setEmissionsData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [currentEmission, setCurrentEmission] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(null);
  const [currentCredit, setCurrentCredit] = useState(null);
  const [factoryData, setFactoryData] = useState(null);
  const [emissionData, setEmissionData] = useState([]);
  const [forecastData2, setForecastData2] = useState([]);
  
  const [loading, setLoading] = useState(true);

  const [sourcesData, setSourcesData] = useState([
    { source: "Boilers", emissions: 500 },
    { source: "Industrial Processes", emissions: 400 },
    { source: "Fuel Combustion", emissions: 300 },
  ]);

  const navigate = useNavigate();
  const auth = getAuth();
  const menuItems = [
    { name: "Dashboard", icon: <LucideHome />, path: "/dashboard" },
    { name: "Market", icon: <LucideLineChart />, path: "/Market" },
    { name: "Reports", icon: <LucideFileText />, path: "/Reports" },
    { name: "Home", icon: <LucideSettings />, path: "/Home" },
  ];

 
  // Fetch annual emissions
  useEffect(() => {
    const fetchAnnualEmissions = async () => {
      try {
        const emissionsCol = collection(db, "Emission");
        const emissionsSnapshot = await getDocs(emissionsCol);
        const emissionsList = emissionsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            month: data.Month,
            emissions: data.Co2Amount,
          };
        });
        setEmissionsData(emissionsList);
      } catch (error) {
        console.error("Error fetching annual emissions:", error);
      }
    };
    fetchAnnualEmissions();
  }, []);

  // Fetch current emissions for the logged-in user
  useEffect(() => {
    const fetchCurrentEmission = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userDocRef = doc(db, "Factory", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const data = userDoc.data();
              setCurrentEmission(data.carbonEmissions || 0);
              setCurrentOffset(data.Offset || 0);
              setCurrentCredit(data.CarbonCreditPurchased || 0);
            }
          } catch (error) {
            console.error("Error fetching user emissions:", error);
          }
        }
      });
    };
    fetchCurrentEmission();
  }, []);

  
  // Fetch forecast data(5years) from FastAPI
  useEffect(() => {
    fetch("http://127.0.0.1:8000/forecast/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched forecast data:", data);
        setForecastData(data);
      })
      .catch((error) => console.error("Error fetching forecast data:", error));
  }, []);


  useEffect(() => {
    // Fetch data from FastAPI backend
    axios.get("http://127.0.0.1:8001/forecast2/")
      .then((response) => {
        const processedData = response.data.map(({ Timestamp, Forecast }) => {
          const date = new Date(Timestamp);
          const formattedTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
          return { time: formattedTime, forecast: Math.round(Forecast) };
        });
        setForecastData2(processedData);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  }, []);
  


  const handleNavigation = (path) => {
    if (path === "/Market" || path=== "/Home") {
      // Do not navigate but set activePage to "reports"
      navigate(path);
    } else {
      setActivePage(path);
    }
  };

  useEffect(() => {
    const fetchFactoryAndEmissionData = async (uid) => {
      try {
        // Fetch factory data for the current user using uid as the document ID
        const factoryDocRef = doc(db, "Factory", uid);
        const factorySnapshot = await getDoc(factoryDocRef);
  
        if (factorySnapshot.exists()) {
          const factory = factorySnapshot.data();
          setFactoryData(factory);
  
          // Fetch related emission data filtered by factoryId
          const emissionQuery = query(
            collection(db, "Emission")
          );
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
  
  
  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Factory Report", 10, 10);
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
  
    let yPosition = 30;
  
    if (factoryData) {
      // Add factory details in a manually drawn table format
      doc.text("Factory Details:", 10, yPosition);
      yPosition += 10;
  
      // Draw a simple table for factory data
      const factoryTableData = Object.entries(factoryData).map(([key, value]) => {
        return [key, value];
      });
  
      const tableX = 10; // X position for the table
      const tableY = yPosition; // Y position for the table
      const tableColumnWidth = [50, 140]; // Column widths for factory details table
  
      // Draw table header
      doc.setFont("helvetica", "bold");
      doc.rect(tableX, tableY, tableColumnWidth[0], 10); // Draw cell for Key
      doc.rect(tableX + tableColumnWidth[0], tableY, tableColumnWidth[1], 10); // Draw cell for Value
      doc.text("Key", tableX + 5, tableY + 7); // Key header
      doc.text("Value", tableX + tableColumnWidth[0] + 5, tableY + 7); // Value header
      yPosition += 10;
  
      // Draw table rows
      doc.setFont("helvetica", "normal");
      factoryTableData.forEach((row, index) => {
        const rowY = yPosition + index * 10;
        doc.rect(tableX, rowY, tableColumnWidth[0], 10); // Draw cell for Key
        doc.rect(tableX + tableColumnWidth[0], rowY, tableColumnWidth[1], 10); // Draw cell for Value
        doc.text(row[0], tableX + 5, rowY + 7); // Key data
        doc.text(row[1].toString(), tableX + tableColumnWidth[0] + 5, rowY + 7); // Value data (ensure it's a string)
      });
  
      yPosition += factoryTableData.length * 10 + 10; // Update yPosition after table
  
      // Add emission details in a manually drawn table format
      if (emissionData && emissionData.length > 0) {
        doc.text("Emission Data:", 10, yPosition);
        yPosition += 10;
  
        const emissionTableData = emissionData.map(emission => [
          emission.Co2Amount, emission.Month
        ]);
  
        const emissionTableX = 10; // X position for emission table
        const emissionTableY = yPosition; // Y position for emission table
        const emissionColumnWidth = [50, 140]; // Column widths for emission table
  
        // Draw emission table header
        doc.setFont("helvetica", "bold");
        doc.rect(emissionTableX, emissionTableY, emissionColumnWidth[0], 10); // Draw cell for CO2 Amount
        doc.rect(emissionTableX + emissionColumnWidth[0], emissionTableY, emissionColumnWidth[1], 10); // Draw cell for Month
        doc.text("CO2 Amount", emissionTableX + 5, emissionTableY + 7); // CO2 Amount header
        doc.text("Month", emissionTableX + emissionColumnWidth[0] + 5, emissionTableY + 7); // Month header
        yPosition += 10;
  
        // Draw emission table rows
        doc.setFont("helvetica", "normal");
        emissionTableData.forEach((row, index) => {
          const rowY = yPosition + index * 10;
          doc.rect(emissionTableX, rowY, emissionColumnWidth[0], 10); // Draw cell for CO2 Amount
          doc.rect(emissionTableX + emissionColumnWidth[0], rowY, emissionColumnWidth[1], 10); // Draw cell for Month
          doc.text(row[0].toString(), emissionTableX + 5, rowY + 7); // CO2 Amount data (ensure it's a string)
          doc.text(row[1].toString(), emissionTableX + emissionColumnWidth[0] + 5, rowY + 7); // Month data (ensure it's a string)
        });
  
        yPosition += emissionTableData.length * 10 + 10; // Update yPosition after table
      } else {
        doc.text("No emission data available.", 10, yPosition);
      }
    } else {
      doc.text("No factory data available.", 10, yPosition);
    }
  
    // Add a new page for Recommendation Data
    doc.addPage();
  
    // Static Recommendation data
    const recommendationData = [
      { recommendation: "Increase efficiency in production", month: "April", impact: "High" },
      { recommendation: "Reduce CO2 emissions by 5%", month: "May", impact: "Medium" }
    ];
  
    // Add Recommendation Data Table
    doc.text("Recommendation Data:", 10, 10);
  
    yPosition = 20;
  
    const recommendationTableData = recommendationData.map(item => [
      item.recommendation, item.month, item.impact
    ]);
  
    const recommendationTableX = 10; // X position for recommendation table
    const recommendationTableY = yPosition; // Y position for recommendation table
    const recommendationColumnWidth = [60, 60, 60]; // Column widths for recommendation table
  
    // Draw recommendation table header
    doc.setFont("helvetica", "bold");
    doc.rect(recommendationTableX, recommendationTableY, recommendationColumnWidth[0], 10); // Recommendation
    doc.rect(recommendationTableX + recommendationColumnWidth[0], recommendationTableY, recommendationColumnWidth[1], 10); // Month
    doc.rect(recommendationTableX + recommendationColumnWidth[0] + recommendationColumnWidth[1], recommendationTableY, recommendationColumnWidth[2], 10); // Impact
    doc.text("Recommendation", recommendationTableX + 5, recommendationTableY + 7); // Recommendation header
    doc.text("Month", recommendationTableX + recommendationColumnWidth[0] + 5, recommendationTableY + 7); // Month header
    doc.text("Impact", recommendationTableX + recommendationColumnWidth[0] + recommendationColumnWidth[1] + 5, recommendationTableY + 7); // Impact header
    yPosition += 10;
  
    // Draw recommendation table rows
    doc.setFont("helvetica", "normal");
    recommendationTableData.forEach((row, index) => {
      const rowY = yPosition + index * 10;
      doc.rect(recommendationTableX, rowY, recommendationColumnWidth[0], 10); // Recommendation
      doc.rect(recommendationTableX + recommendationColumnWidth[0], rowY, recommendationColumnWidth[1], 10); // Month
      doc.rect(recommendationTableX + recommendationColumnWidth[0] + recommendationColumnWidth[1], rowY, recommendationColumnWidth[2], 10); // Impact
      doc.text(row[0], recommendationTableX + 5, rowY + 7); // Recommendation data
      doc.text(row[1], recommendationTableX + recommendationColumnWidth[0] + 5, rowY + 7); // Month data
      doc.text(row[2], recommendationTableX + recommendationColumnWidth[0] + recommendationColumnWidth[1] + 5, rowY + 7); // Impact data
    });
  
    yPosition += recommendationTableData.length * 10 + 10; // Update yPosition after table
  
    const benchmarkData = [
      { benchmark: "Production Efficiency", value: "85%" },
      { benchmark: "CO2 Emission Reduction", value: "10%" }
    ];
  
    // Add Benchmark Data Table
    doc.text("Benchmark Data:", 10, yPosition);
    yPosition += 10;
  
    const benchmarkTableData = benchmarkData.map(item => [
      item.benchmark, item.value
    ]);
  
    const benchmarkTableX = 10; // X position for benchmark table
    const benchmarkTableY = yPosition; // Y position for benchmark table
    const benchmarkColumnWidth = [60, 60]; // Column widths for benchmark table
  
    // Draw benchmark table header
    doc.setFont("helvetica", "bold");
    doc.rect(benchmarkTableX, benchmarkTableY, benchmarkColumnWidth[0], 10); // Benchmark
    doc.rect(benchmarkTableX + benchmarkColumnWidth[0], benchmarkTableY, benchmarkColumnWidth[1], 10); // Value
    doc.text("Benchmark", benchmarkTableX + 5, benchmarkTableY + 7); // Benchmark header
    doc.text("Value", benchmarkTableX + benchmarkColumnWidth[0] + 5, benchmarkTableY + 7); // Value header
    yPosition += 10;
  
    // Draw benchmark table rows
    doc.setFont("helvetica", "normal");
    benchmarkTableData.forEach((row, index) => {
      const rowY = yPosition + index * 10;
      doc.rect(benchmarkTableX, rowY, benchmarkColumnWidth[0], 10); // Benchmark
      doc.rect(benchmarkTableX + benchmarkColumnWidth[0], rowY, benchmarkColumnWidth[1], 10); // Value
      doc.text(row[0], benchmarkTableX + 5, rowY + 7); // Benchmark data
      doc.text(row[1], benchmarkTableX + benchmarkColumnWidth[0] + 5, rowY + 7); // Value data
    });
  
    // Save the PDF
    doc.save("FactoryReport.pdf");
  };
  


  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#FDFBF6] text-black p-6 fixed h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-8">🌍 Mustdam</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                activePage === item.path ? "bg-[#DEA05D]" : "hover:bg-[#DEA05E]"
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow ml-64">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md fixed left-64 right-0 top-0 z-10">
          <div className="flex items-center bg-gray-100 p-2 rounded-lg w-1/3">
            <LucideSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-2 w-full"
            />
          </div>
          <div className="flex items-center gap-6">
            <LucideBell className="text-gray-500 cursor-pointer" />
            <LucideUser className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Content Area */}
        {activePage === "/dashboard" && (
          <>
        <div className="p-6 mt-16">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg p-6 rounded-2xl">
              <LucideCloud className="text-blue-500 w-8 h-8 mb-2" />
              <h2 className="text-xl font-semibold">Current Emission Levels</h2>
              <p className="text-gray-600 text-lg">
                {currentEmission !== null ? `${currentEmission} CO₂ tons` : "Loading..."}
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-2xl">
              <LucideLeaf className="text-green-500 w-8 h-8 mb-2" />
              <h2 className="text-xl font-semibold">Carbon Credit Purchased</h2>
              <p className="text-gray-600 text-lg">
                {currentCredit} Carbon Credits
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-2xl">
              <LucideTrendingUp className="text-red-500 w-8 h-8 mb-2" />
              <h2 className="text-xl font-semibold">Target</h2>
              <p className="text-gray-600 text-lg">
                {currentOffset !== null ? `${currentOffset} CO₂ tons per Month` : "Loading..."}
              </p>
            </div>
          </div>
     
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white shadow-lg p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4">Emission By Month</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={emissionsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="emissions" stroke="#ff7300" strokeWidth={3} />
                  <Line type="monotone" dataKey="offset" stroke="#00c49f" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4">Emission Sources</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sourcesData}>
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emissions" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>


       {/* Forecast Chart */}
      <div className="bg-white shadow-lg p-6 rounded-2xl mt-8">
      <h2 className="text-xl font-semibold mb-4">Forecasted Emissions Next 20 Minutes</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={forecastData2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="forecast" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>


          {/* Forecast Chart */}
          <div className="bg-white shadow-lg p-6 rounded-2xl mt-8">
            <h2 className="text-xl font-semibold mb-4">Forecasted Emissions Next 5 Years</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Predicted_CO2" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>  
        </div>
        </>
        
        )}
{activePage === "/Reports" && (
    <>
      {/* Reports Content */}
      <div className="p-6 mt-16">
          <h1 className="text-3xl font-bold mb-6">Reports</h1>
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
      </div>
    </>
  )}
      </div>
    </div>
  );
};

export default Dashboard;