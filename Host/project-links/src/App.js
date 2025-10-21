import React from "react";
import ProjectCard from "./components/project.jsx";
import projects from "./data/project.js";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>My Projects</h1>
      <div className="cards-container">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} {...proj} />
        ))}
      </div>
    </div>
  );
}

export default App;
