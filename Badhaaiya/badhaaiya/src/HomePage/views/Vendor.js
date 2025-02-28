import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";


// Css Import
import "../css/Vendor.css";

// Images Import
import route from "../Images/route.png";
import ratings from "../Images/ratings.png";



const Vendor = () => {
    const [vendor, setvendor] = useState([]);
    const [vendorVenue, setvendorVenue] = useState([]);

    {/* Vender API Call */}
    useEffect(() => {
        axios.get("http://localhost:5000/api/VendorCategory")
            .then(response => {
                setvendor(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    {/* Vender API Call */}

    {/* Vender-Venue API Call */}
    useEffect(() => {
        axios.get("http://localhost:5000/api/VendorCards")
            .then(response => {
                setvendorVenue(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    {/* Vender API Call */}

    const SlideLeft = () => {
        var slider = document.getElementById('VenderSlider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const SlideRight = () => {
        var slider = document.getElementById('VenderSlider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return(
        <div>
            {/* Vendors Section */}
            <section className="vendor">
                <h2>VENDORS</h2>
                <div className="vendor-buttons">
                {vendor.map((vendor) => (
                    <button key={vendor.id}>{vendor.name}</button>
                ))}
                </div>
                
                <div className="scroll">
                    <MdChevronLeft onClick={SlideLeft} size={20} />
                    <div id='VenderSlider' className="vendor-list">
                    {vendorVenue.map((vendorVenue) => (
                        <div key={vendorVenue.id} className="vendor-card">
                        <img className="outerImg" src={`/HomePage/Images/${vendorVenue.name}.png`} alt={vendorVenue.name} />
                        <div className="content">
                            <h3>{vendorVenue.name}</h3>
                            <div className="vendor-card-innerdiv">
                                <MapPin size={16} className="icon" />
                                <p>{vendorVenue.location}</p>
                                <div className="ratingDiv">
                                    {/* <p>{vendorVenue.ratings}</p> */}
                                    <p>{"3"}</p>
                                    <img className="ratingImg" src={ratings} alt="ratings"/>
                                </div>
                            </div>
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

export default Vendor;