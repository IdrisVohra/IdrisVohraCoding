import React from "react";
import ProjectCard from "./components/project.jsx";
import projects from "./data/project.js";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div style={{
        textAlign: 'center', 
        margin: '3rem 0 4rem 0'
      }}>
        <div style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          animation: 'bounce 2s infinite'
        }}>🚀</div>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 0.5rem 0',
          lineHeight: 1.1
        }}>
          My Projects
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '1.1rem',
          margin: 0,
          fontWeight: 500
        }}>
          Explore my latest work and creations
        </p>
      </div>

      <div className="cards-container">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} {...proj} />
        ))}
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}
      </style>
    </div>
  );
}

export default App;