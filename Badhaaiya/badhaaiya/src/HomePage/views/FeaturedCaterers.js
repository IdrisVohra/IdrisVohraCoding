import React from "react";
import { MapPin, CheckCircle, Section } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";


import "../css/FeaturedCaterers.css";

const CatererCard = () => {

    const [featurecaterers, setFeatureCaterers] = useState([]);

    {/* FeaturedCaterers API Call */}
    useEffect(() => {
        axios.get("http://localhost:5000/api/FeaturedCarterers")
            .then(response => {
                setFeatureCaterers(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    {/* FeaturedCaterers API Call */}

    return (
        <section className="FeaturedCaterers">
            <h2>FEATURED CATERERS</h2>
            <div className="FeaturedCaterers-OuterDiv">
                {featurecaterers.map((featurecaterers) => (
                <div className="FeaturedCaterers-List">
                    <div key={featurecaterers.id} className="FeaturedCaterers-image">
                        <img src={`/HomePage/Images/${featurecaterers.name}.png`} alt={featurecaterers.name} />
                    </div>

                    <div className="FeaturedCaterers-card-content">
                        <div className="FeaturedCaterers-div1">
                            <h3>{featurecaterers.name}</h3>
                            <div>
                                {featurecaterers.catogery ? (
                                        <CheckCircle size={16} className="FeaturedCaterers-veg-check" />
                                    ) : (
                                        <CheckCircle size={16} className="FeaturedCaterers-non-veg-check" />
                                    )}
                                <span>{featurecaterers.catogery ? "Veg" : "Non-Veg"}</span>
                            </div>
                        </div>
                        <div className="FeaturedCaterers-div2">
                            <p>{featurecaterers.description}</p>
                        </div>
                        <div className="FeaturedCaterers-div3">
                            <div>
                                <MapPin size={16} className="FeaturedCaterers-icon" />
                                <span>{featurecaterers.location}</span>
                            </div>
                            <button>Add To Cart</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </section>
      );
}

export default CatererCard;