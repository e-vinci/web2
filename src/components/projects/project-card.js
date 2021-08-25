import React from "react";
import { Link, useStaticQuery } from "gatsby";
import YoutubeImage from "../image/youtube-image.js";
import he from "he";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faUserPlus,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import { getNamesFromEmail } from "../../utils/string/string";
import { useProjectData } from "../context/projects/project-data-context";

const ProjectCard = ({ project, setFilteredContents }) => {
  // Get state management functions from the provider
  const {
    deleteOneProject,
    updateProjectData,
    addMemberToProject,
    deleteMemberFromProject,
  } = useProjectData();
  // Deal with events
  const onProjectDelete = async () => {
    //console.log("projectId: endpoint:", "DELETE /api/projects/" + projectId);
    await deleteOneProject(project);
    await updateProjectData(project.projectGroupName);
    setFilteredContents(undefined);
  };

  const onAddMemberToProject = async () => {
    const updatedProject = await addMemberToProject(project);
    console.log("onAddMemberToProject:", updatedProject);
    if (updateProjectData) {
      await updateProjectData(project.projectGroupName);
      setFilteredContents(undefined);
    }
  };

  const onDeleteMemberFromProject = async () => {
    const updatedProject = await deleteMemberFromProject(project);
    console.log("onDeleteMemberFromProject:", updatedProject);
    if (updateProjectData) {
      await updateProjectData(project.projectGroupName);
      setFilteredContents(undefined);
    }
  };

  if (!project) return null;

  return (
    <div className="index__card" key={project.shortId} id={project.shortId}>
      <div className="index__card__header">
        {"Projet N° " + project.shortId + " : " + project.name}
      </div>

      <div className="index__card__description">
        <FontAwesomeIcon icon={faTrashAlt} onClick={onProjectDelete} />
        <FontAwesomeIcon icon={faEdit} />
        <FontAwesomeIcon icon={faUserPlus} onClick={onAddMemberToProject} />
        <FontAwesomeIcon
          icon={faUserTimes}
          onClick={onDeleteMemberFromProject}
        />
      </div>

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
      {/* Deal with project members */}
      <div className="index__card__content">
        {project.projectMembers !== undefined &&
        project.projectMembers.length > 0 ? (
          <>
            <div className="index__card__content__title">Membres du projet</div>
            <div className="index__card__content__description">
              {project.projectMembers
                .map((member) => getNamesFromEmail(member))
                .join(", ")}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
