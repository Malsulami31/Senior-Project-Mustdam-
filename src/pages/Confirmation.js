import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const certificateUrl = "/images/Figure15.jfif";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = certificateUrl;
    link.download = "Carbon_Credit_Certificate.jfif";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}>
        <h2 style={styles.heading}>Payment Successful</h2>
        <p>Thank you for purchasing carbon credits!</p>
        

        <button onClick={handleDownload} style={styles.downloadButton} >
          Download Certificate
        </button>
        <button onClick={() => navigate("/")} style={styles.homeButton}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    background: "url('/images/Figure7.png') no-repeat center center/cover",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "2px 2px 15px rgba(0, 0, 0, 0.3)",
    width: "40%",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "15px",
  },
  downloadButton: {
    background: "orange",
    color: "white",
    padding: "12px",
    margin: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
  homeButton: {
    background: "orange",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default Confirmation;
