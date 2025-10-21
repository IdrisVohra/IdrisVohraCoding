import React from "react";
import "./project.css";

const ProjectCard = ({ title, image, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
      <div className="project-card">
        <img src={image} alt={title} className="project-image" />
        <div className="project-info">
          <h3>{title}</h3>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
