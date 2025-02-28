// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import "../css/FeaturedDecorators.css";

// const chunkArray = (array, size) => {
//     const chunkedArr = [];
//     for (let i = 0; i < array.length; i += size) {
//       chunkedArr.push(array.slice(i, i + size));
//     }
//     return chunkedArr;
//   };


// const FeaturedDecorators = () => {

//     const [featureddecorators, setFeaturedDecorators] = useState([]);

//     {/* FeaturedDecorators API Call */}
//     useEffect(() => {
//         axios.get("http://localhost:5000/api/FeaturedCarterers")
//             .then(response => {
//                 //setFeaturedDecorators(response.data);
//                 setFeaturedDecorators(chunkArray(response.data, 2));
//             })
//             .catch(error => console.error("Error fetching data:", error));
//     }, []);

//     return (
//         <div className="FeaturedDecorators">
//         <h2>FEATURED DECORATORS</h2>
//         <div className="FeaturedDecorators-List">
//             {featureddecorators.map((set,index) => (
//             <div key={index} className="FeaturedDecorators-card">
//                 {set.map((setof2) => (
//                     alert(JSON.stringify(setof2)),
//                 <div key={setof2} className="FeaturedDecorators-card">
//                     <img src={`/HomePage/Images/${setof2.name}.png`} alt={setof2.name} />
//                     <p>{setof2.name}</p>
//                 </div>
//                 ))}
//             </div>
//             ))}
//         </div>
//         </div>
//     );
// };

// export default FeaturedDecorators;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/FeaturedDecorators.css";

// Function to split array into chunks of 2
const chunkArray = (array, size) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

const FeaturedDecorators = () => {
  const [featuredDecorators, setFeaturedDecorators] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/FeaturedCarterers")
      .then((response) => {
        setFeaturedDecorators(chunkArray(response.data, 2));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="FeaturedDecorators">
      <h2>FEATURED DECORATORS</h2>
      <div className="FeaturedDecorators-List">
        {featuredDecorators.map((pair, index) => (
          <div key={index} className="FeaturedDecorators-pair">
            {pair.map((decorator) => (
              <div key={decorator.id} className="FeaturedDecorators-card">
                <img
                  src={`/HomePage/Images/${decorator.name}.png`}
                  alt={decorator.name}
                  onError={(e) => (e.target.src = "/HomePage/Images/default.png")}
                />
                <p>{decorator.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDecorators;
