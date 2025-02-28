import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";

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

    const SlideLeft = () => {
        var slider = document.getElementById('FeaturedVendorSlider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const SlideRight = () => {
        var slider = document.getElementById('FeaturedVendorSlider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return(
        <div>
            <section className="featureVenue">
                <h2>FEATURED VENUE</h2>
                <div className="scroll">
                    <MdChevronLeft onClick={SlideLeft} size={20} />
                    <div id="FeaturedVendorSlider" className="featureVenue-list">
                    {featurevenue.map((featurevenue) => (
                        <div key={featurevenue.id} className="featureVenue-card">
                            <img className="outerImg" src={`/HomePage/Images/${featurevenue.name}.png`} alt={featurevenue.name} />
                            <div className="content">
                                <h3>{featurevenue.name}</h3>
                            </div>
                        </div>
                    ))}
                    </div>
                    <MdChevronRight onClick={SlideRight} size={20} />
                </div>
            </section>
        </div>
    );
}

export default FeaturedVenue;