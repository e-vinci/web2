import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import YoutubeImage from "../image/youtube-image.js";
import he from "he";

const PublicProjectsView = ({ projectGroupName }) => {
  console.log("groupName start", projectGroupName);
  const data = useStaticQuery(
    graphql`
      query allPublicProjects {
        allPublicProjects {
          edges {
            node {
              name
              description
              presentationUrl
              frontendProductionUrl
              frontendRepo
              backendRepo
              projectGroupName
            }
          }
        }
      }
    `
  );

  const { edges: projects } = data.allPublicProjects;

  // filter the projects for the required year
  const filteredProjects = projects.filter(
    ({ node: project }) => project.projectGroupName === projectGroupName
  );

  console.log("groupName 2", projectGroupName);
  console.log("prior to filtering :", projects);
  console.log("filtered projects :", filteredProjects);

  return (
    <div className="index">
      {filteredProjects.map(({ node: project }, index) => (
        <div className="index__card" key={index}>
          <div className="index__card__header">{he.decode(project.name)}</div>

          <div className="index__card__content">
            {project.description !== undefined ? (
              <>
                <div className="index__card__content__title">Description</div>
                <div className="index__card__content__description">
                  {he.decode(project.description)}
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          <div className="index__card__content">
            {project.presentationUrl !== undefined ? (
              <>
                <div className="index__card__content__title">
                  Vidéo de présentation
                </div>
                <div className="index__card__content__description">
                  <YoutubeImage src={project.presentationUrl} />
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          <div className="index__card__content">
            {project.frontendProductionUrl !== undefined ? (
              <>
                <div className="index__card__content__title">URL du site</div>
                <div className="index__card__content__description">
                  <a href={project.frontendProductionUrl} target="_blank">
                    {project.frontendProductionUrl}
                  </a>
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          <div className="index__card__content">
            {project.frontendRepo !== undefined ? (
              <>
                <div className="index__card__content__title">Repo frontend</div>
                <div className="index__card__content__description">
                  <a href={project.frontendRepo} target="_blank">
                    {project.frontendRepo}
                  </a>
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          <div className="index__card__content">
            {project.backendRepo !== undefined ? (
              <>
                <div className="index__card__content__title">Repo backend</div>
                <div className="index__card__content__description">
                  <a href={project.backendRepo} target="_blank">
                    {project.backendRepo}
                  </a>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicProjectsView;
