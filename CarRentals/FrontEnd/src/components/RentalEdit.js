import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/global.css";
import RentalList from "./RentalList.js";


const RentalEdit = () => {
  const { id } = RentalList.currentRentalId;
  const [rental, setRental] = useState({
    extensionTime: 0,
    totalHours: 0,
    pricePerHour: 0,
    totalTripCharges: 0,
    givenTime: new Date(),
    returnTime: new Date()
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rentals/${id}`);
        setRental(res.data);
      } catch (error) {
        console.error("Error fetching rental:", error);
      }
    };
    fetchRental();
  }, [id]);

  const handleInputChange = (e) => {
    setRental({
      ...rental,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        alert(JSON.stringify(id));
      await axios.put(`http://localhost:5000/api/rentals/${id}`, rental);
      alert("Rental updated successfully!");
      navigate('/rental-list');
    } catch (error) {
      console.error("Error updating rental:", error);
    }
  };

  return (
    <div className="rental-edit-container">
      <h2 class="Edit-Header">Edit Rental</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Extension Time:</label>
          <input
            type="number"
            name="extensionTime"
            value={rental.extensionTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Total Hours:</label>
          <input
            type="number"
            name="totalHours"
            value={rental.totalHours}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price Per Hours:</label>
          <input
            type="number"
            name="pricePerHour"
            value={rental.pricePerHour}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Total Trip Charges:</label>
          <input
            type="number"
            name="totalTripCharges"
            value={rental.totalTripCharges}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Given Time:</label>
          <input
            type="datetime-local"
            name="givenTime"
            value={rental.givenTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Return Time:</label>
          <input
            type="datetime-local"
            name="returnTime"
            value={rental.returnTime}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Rental</button>
      </form>
    </div>
  );
};

export default RentalEdit;
