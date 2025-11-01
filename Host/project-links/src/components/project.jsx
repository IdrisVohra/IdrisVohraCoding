import React from "react";
import "./project.css";

const ProjectCard = ({ title, image, link, category, description, technologies }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
      <div className="project-card">
        <div className="card-background"></div>
        <div className="card-gradient"></div>
        
        <div className="project-image-container">
          <img src={image} alt={title} className="project-image" />
          <div className="image-overlay"></div>
          <div className="category-badge">{category || "Web App"}</div>
          <div className="tech-stack">
            {technologies && technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
        
        <div className="project-info">
          <div className="project-header">
            <h3 className="project-title">{title}</h3>
            <div className="project-arrow">→</div>
          </div>
          
          <p className="project-description">
            {description || "A modern web application built with cutting-edge technologies."}
          </p>
          
          <div className="project-footer">
            <div className="project-stats">
              <span className="stat">🚀 Live Demo</span>
            </div>
            {/* <div className="project-hover-effect">
              <span>View Project</span>
            </div> */}
          </div>
        </div>
        
        <div className="card-sparkle"></div>
      </div>
    </a>
  );
};

export default ProjectCard;