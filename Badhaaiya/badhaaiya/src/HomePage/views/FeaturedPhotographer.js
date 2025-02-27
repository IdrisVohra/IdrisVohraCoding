import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "../css/FeaturedPhotographers.css";
import { data } from "react-router-dom";

const FeaturedPhotographers = () => {

    const [featurephotographers, setFeaturePhotographers] = useState([]);

    {/* FeaturedPhotographers API Call */}
    useEffect(() => {
        axios.get("http://localhost:5000/api/FeaturedCarterers")
            .then(response => {
                setFeaturePhotographers(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // useEffect(() => {
    //     fetch('http://localhost:5000/api/FeaturedCarterers')
    //         .then(response => response.json())
    //         .then(data => {
    //             setFeaturePhotographers(data);  // Update state
    //             alert(JSON.stringify(featurephotographers));  // Show alert after setting state
    //         })
    //         .catch(error => console.error("Error fetching data:", error));
    // }, []);
    
    {/* FeaturedPhotographers API Call */}

    return (
        <section className="FeaturedPhotographers">
            <h2>FEATURED PHOTOGRAPHERS</h2>
            <div className="FeaturedPhotographers-OuterDiv">
                {featurephotographers.map((featurephotographers) => (
                    <div key={featurephotographers.id} className="FeaturedPhotographers-List">
                        <div className="FeaturedPhotographers-innerdiv1">
                            <img src={`/HomePage/Images/${featurephotographers.name}.png`} alt={featurephotographers.name} />
                        </div>
                        <div className="FeaturedPhotographers-innerdiv2">
                            <h3>{featurephotographers.name}</h3>                        
                        </div>
                        
                    </div>
                ))}
            </div>
        </section>
    );

    // return (
    // <div className="w-64 rounded-3xl overflow-hidden shadow-lg border border-gray-300 bg-white">
    //     {/* Image Section */}
    //     <div className="relative">
    //     <img src={image} alt={name} className="w-full h-64 object-cover" />
    //     </div>

    //     {/* Vendor Name Section */}
    //     <div className="relative -top-6 bg-white rounded-b-3xl p-4 text-center border-t border-gray-300">
    //     <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    //     </div>
    // </div>
    // );
}

export default FeaturedPhotographers;