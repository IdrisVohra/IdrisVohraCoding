import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage/Home";
import LogInPage from "./Login/Login";
import { useSelector } from "react-redux"; 
import "./App.css";

const App = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/HomePage" element={isLogin ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/" element={<LogInPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./HomePage/Home";
// import "./App.css";

// const App = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;