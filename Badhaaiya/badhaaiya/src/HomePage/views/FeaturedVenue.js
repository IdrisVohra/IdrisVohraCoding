import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// Css Import
import "../css/FeaturedVenue.css";

// Return Function
const FeaturedVenue = () => {
    const [featurevenue, setFeatureVenue] = useState([]);

    {/* Featured-Vender-Venue API Call */}
    useEffect(() => {
        axios.get("http://localhost:5000/api/VendorCards")
            .then(response => {
                setFeatureVenue(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    {/* Featured-Vender-Venue API Call */}

    return(
        <div>
            <section className="featureVenue">
                <h2>FEATURED VENUE</h2>
                <div className="featureVenue-list">
                {featurevenue.map((featurevenue) => (
                    <div key={featurevenue.id} className="featureVenue-card">
                        <img className="outerImg" src={`/HomePage/Images/${featurevenue.name}.png`} alt={featurevenue.name} />
                        <div className="content">
                            <h3>{featurevenue.name}</h3>
                        </div>
                    </div>
                ))}
                </div>
            </section>
        </div>
    );
}

export default FeaturedVenue;