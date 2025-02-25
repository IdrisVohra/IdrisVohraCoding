import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/global.css';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';


const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentRentalId, setCurrentRentalId] = useState("");

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rentals");
        setRentals(res.data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };
    fetchRentals();
  }, []);

  const fetchDocuments = async (rentalId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/documents/${rentalId}`);
      setDocuments(res.data);
      setCurrentRentalId(rentalId.id);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setDocuments([]);
    setCurrentRentalId(null);
  };

  return (
    <div className="rental-list-container">
      <h2>
        <Link to="/" className="login-link">LogOut</Link> {/* Hyperlink to login page */}
      </h2>
      <div className="rental-grid">
        {rentals.map((rental) => (
          <div className="rental-card" key={rental.id}>
            <div className="rental-card-header">
              <h3>{rental.customerName}</h3>
              {/* Edit icon, linking to the edit page */}
              <Link to={`/rental-edit/${rental.id}`} className="edit-icon">
                <FaEdit />
              </Link>
            </div>
            <p><strong>Vehicle ID:</strong> {rental.vehicleId}</p>
            <p><strong>Address:</strong> {rental.address}</p>
            <p><strong>Car Model:</strong> {rental.carModel}</p>
            <p><strong>Rental Period:</strong></p>
            <p>
              From: {new Date(rental.givenTime).toLocaleString()} <br />
              To: {new Date(rental.returnTime).toLocaleString()}
            </p>
            <p><strong>Total Hours:</strong> {rental.totalHours} hours</p>
            {rental.extensionTime && (
              <p><strong>Extension Time:</strong> {rental.extensionTime} hours</p>
            )}
            <p><strong>Price Per Hour:</strong> Rs.{rental.pricePerHour}</p>
            <p><strong>Advance Paid:</strong> Rs.{rental.advancePaid}</p>
            <p><strong>Total Trip Charges:</strong> Rs.{rental.totalTripCharges}</p>
            <p>
              <strong>Documents Submitted:</strong> 
              {rental.documentsSubmitted ? (
                <a 
                  href="#" 
                  onClick={() => fetchDocuments(rental.id)} 
                  className="document-link"
                >
                  Yes
                </a>
              ) : (
                "No"
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Popup for documents list */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Submitted Documents</h3>
            <ul>
              {documents.map((doc) => (
                <li key={doc.id}>{doc.documentName}</li>
              ))}
            </ul>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      <p>
        <Link to="/rental-form">Add New Rental</Link>
      </p>
    </div>
  );
};

export default RentalList;

