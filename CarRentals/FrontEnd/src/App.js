// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import RentalList from "./components/RentalList";
import RentalForm from "./components/RentalForm";
import RentalEdit from "./components/RentalEdit";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/rental-list" element={<RentalList />} />
          <Route path="/rental-form" element={<RentalForm />} />
          <Route path="/rental-edit/:id" element={<RentalEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
