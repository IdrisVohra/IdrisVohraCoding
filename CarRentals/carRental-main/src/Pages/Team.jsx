import React, { useEffect, useState } from "react";
import axios from "axios";
import deletebutton from "../images/team/delete.jpeg";

function Team() {
  const [rentals, setRentals] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      setRentals(prevRentals => prevRentals.filter(rental => rental.id !== id));
      await axios.delete(`http://localhost:5000/api/rentals/${id}`);
    } catch (error) {
      console.error("Error submitting rental:", error);
    }
};

return (
    <section className="team-page">
        {/* <HeroPages name="All Trips" /> */}
        <div className="container">
            <div className="team-container">
                {rentals.map((rental) => (
                    <div key={rental.id} className="team-container__box">
                        <div className="team-container__box__descr">
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(rental.id)} 
                                className="delete-button"
                            >
                              <img src={deletebutton}/>
                            </button>

                            <h3>Vehicle ID: {rental.vehicleId}</h3>
                            <p>Customer Name: {rental.customerName}</p>
                            <p>Car Model: {rental.carModel}</p>
                            <p>Given Time: {new Date(rental.givenTime).toLocaleString()}</p>
                            <p>Return Time: {new Date(rental.returnTime).toLocaleString()}</p>
                            <p>Total Hours: {rental.totalHours}</p>
                            <p>Price per Hour: ${rental.pricePerHour}</p>
                            <p>Total Trip Charges: ${rental.totalTripCharges}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// return (
//     <section className="team-page">
//         {/* <HeroPages name="All Trips" /> */}
//         <div className="container">
//             <div className="team-container">
//                 {rentals.map((rental) => (
//                     <div key={rental.id} className="team-container__box">
//                         <div className="team-container__box__descr">
//                             <h3>Vehicle ID: {rental.vehicleId}</h3>
//                             <p>Customer Name: {rental.customerName}</p>
//                             <p>Car Model: {rental.carModel}</p>
//                             <p>Given Time: {new Date(rental.givenTime).toLocaleString()}</p>
//                             <p>Return Time: {new Date(rental.returnTime).toLocaleString()}</p>
//                             <p>Total Hours: {rental.totalHours}</p>
//                             <p>Price per Hour: ${rental.pricePerHour}</p>
//                             <p>Total Trip Charges: ${rental.totalTripCharges}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     </section>
// );
}

export default Team;
