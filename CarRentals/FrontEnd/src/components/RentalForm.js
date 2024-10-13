import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";

const RentalForm = () => {
  const [vehicleId, setVehicleId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [carModel, setCarModel] = useState('');
  const [givenTime, setGivenTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [extensionTime, setExtensionTime] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [advancePaid, setAdvancePaid] = useState('');
  const [totalTripCharges, setTotalTripCharges] = useState('');
  const [documentsSubmitted, setDocumentsSubmitted] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const rentalData = {
      vehicleId,
      customerName,
      address,
      carModel,
      givenTime,
      returnTime,
      totalHours,
      extensionTime,
      pricePerHour,
      advancePaid,
      totalTripCharges,
      documentsSubmitted,
    };
    
    try {
      await axios.post('http://localhost:5000/api/rentals', rentalData);
      navigate('/rental-list'); // Navigate back to the rental list after submission
    } catch (error) {
      console.error("Error submitting rental:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <a className="back-link-container">
        <Link to="/rental-list" className="back-link">Back</Link>
      </a>
      <div>
        <label>Vehicle ID:</label>
        <input value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} required />
      </div>
      <div>
        <label>Customer Name:</label>
        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
      </div>
      <div>
        <label>Address:</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div>
        <label>Car Model:</label>
        <input value={carModel} onChange={(e) => setCarModel(e.target.value)} required />
      </div>
      <div>
        <label>Given Time:</label>
        <input type="datetime-local" value={givenTime} onChange={(e) => setGivenTime(e.target.value)} required />
      </div>
      <div>
        <label>Return Time:</label>
        <input type="datetime-local" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required />
      </div>
      <div>
        <label>Total Hours:</label>
        <input type="number" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} required />
      </div>
      <div>
        <label>Extension Time (Optional):</label>
        <input type="number" value={extensionTime} onChange={(e) => setExtensionTime(e.target.value)} />
      </div>
      <div>
        <label>Price Per Hour:</label>
        <input type="number" value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)} required />
      </div>
      <div>
        <label>Advance Paid:</label>
        <input type="number" value={advancePaid} onChange={(e) => setAdvancePaid(e.target.value)} required />
      </div>
      <div>
        <label>Total Trip Charges:</label>
        <input type="number" value={totalTripCharges} onChange={(e) => setTotalTripCharges(e.target.value)} required />
      </div>
      <div>
        <label>Documents Submitted:</label>
        <input type="checkbox" checked={documentsSubmitted} onChange={(e) => setDocumentsSubmitted(e.target.checked)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RentalForm;
