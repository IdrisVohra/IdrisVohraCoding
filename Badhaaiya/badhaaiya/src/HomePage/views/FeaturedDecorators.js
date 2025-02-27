import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/FeaturedDecorators.css";


const FeaturedDecorators = () => {

    const [featureddecorators, setFeaturedDecorators] = useState([]);

    {/* FeaturedDecorators API Call */}
    useEffect(() => {
        axios.get("http://localhost:5000/api/FeaturedCarterers")
            .then(response => {
                setFeaturedDecorators(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="FeaturedDecorators">
        <h2>FEATURED DECORATORS</h2>
        <div className="FeaturedDecorators-List">
            {featureddecorators.map((featureddecorators) => (
            <div key={featureddecorators.id} className="FeaturedDecorators-card">
                <img src={`/HomePage/Images/${featureddecorators.name}.png`} alt={featureddecorators.name} />
                <p>{featureddecorators.name}</p>
            </div>
            ))}
        </div>
        </div>
    );
};

export default FeaturedDecorators;
