import React from "react";
import { Link, useStaticQuery } from "gatsby";
import YoutubeImage from "../image/youtube-image.js";
import ProjectCard from "./project-card.js";
import he from "he";

const ProjectsView = ({ projects , setFilteredContents}) => {
  console.log("PROJECTSVIEW", projects);
  if (!projects || projects.length <= 0) return null;

  return (
    <>
      {projects.map((project) => (
        <ProjectCard {...{ project, setFilteredContents }} />
      ))}
    </>
  );
};

export default ProjectsView;
