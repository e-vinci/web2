import React, { useState } from "react";
import { Link, useStaticQuery } from "gatsby";
import YoutubeImage from "../image/youtube-image.js";
import he from "he";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faUserPlus,
  faUserTimes,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { getNamesFromEmail } from "../../utils/string/string";
import { useProjectData } from "../context/projects/project-data-context";
import ContentEditable from "../content-editable/content-editable.js";

const ProjectCard = ({ project, setFilteredContents }) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isPublic, setIsPublic] = useState(project.isPublic);
  const [projectUpdateState, setProjectUpdateState] = useState({});
  // Get state management functions from the provider
  const {
    deleteOneProject,
    updateProjectData,
    addMemberToProject,
    deleteMemberFromProject,
    updateProject,
    userData,
    projectGroupData,
    projectData,
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

  const onProjectUpdateRequest = () => {
    setIsBeingEdited(true);
  };

  const onQuitProjectUpdateRequest = () => {
    setIsBeingEdited(false);
    // clear the update state
    setProjectUpdateState({});
  };

  const onProjectSave = async () => {
    // save the updated state via the API
    if (projectUpdateState) {
      const updatedProject = await updateProject(
        projectUpdateState,
        project._id
      );
      // clear the project update state
      setProjectUpdateState({});
      setIsBeingEdited(false);
      // re-render all projects
      if (updatedProject) {
        await updateProjectData(project.projectGroupName);
        setFilteredContents(undefined);
      }
    }
  };

  // deal with modification of content
  const handleChange = (propChanged) => {
    // update the projectState
    setProjectUpdateState((previousState) => {
      return { ...previousState, ...propChanged };
    });
  };

  const onSetPublic = (e) => {
    setIsPublic(!isPublic);
    setProjectUpdateState({
      ...projectUpdateState,
      ...{ isPublic: !isPublic },
    });
  };

  console.log("projStateUpdated:", projectUpdateState);

  if (!project) return null;

  return (
    <div
      className={
        "index__card" + (isBeingEdited ? " index__card--is-being-edited" : "")
      }
      key={project.shortId}
      id={project.shortId}
    >
      <div className="index__card__header">
        <span>{"Projet N° " + project.shortId + " : "}</span>
        <ContentEditable
          isBeingEdited={isBeingEdited}
          id="name"
          onChange={handleChange}
          startContent={project.name}
          isInline
        />
      </div>

      <div className="index__card__description">
        {
          /* DELETE icon only if user isAdmin (admin or manager) */
          userData.isAdmin && (
            <FontAwesomeIcon icon={faTrashAlt} onClick={onProjectDelete} />
          )
        }

        {
          /* UPDATE PROJECT : visible only if 
          (user is Admin (admin or manager) OR
          user is a member of this project AND 
          project group status is not "end" ) AND
          project is not being edited
          */
          (userData.isAdmin ||
            (project.projectMembers.includes(userData.userName) &&
              projectGroupData.status !== "end")) &&
          !isBeingEdited ? (
            <FontAwesomeIcon icon={faEdit} onClick={onProjectUpdateRequest} />
          ) : (
            ""
          )
        }

        {
          /* ADD MEMBER TO PROJECT : Visible only if :
        project group status is "init" AND
        userName has not already joined a project AND
        number of members is < maximum number */
          projectGroupData.status === "init" &&
            !projectData.find((project) =>
              project.projectMembers.includes(userData.userName)
            ) &&
            project.projectMembers.length <
              projectGroupData.maximumProjectMembers && (
              <FontAwesomeIcon
                icon={faUserPlus}
                onClick={onAddMemberToProject}
              />
            )
        }
        {
          /*REMOVE MEMBER FROM PROJECT : Visible only if :
        project group status is "init" AND
        userName is already a member of this project
        */
          projectGroupData.status === "init" &&
            project.projectMembers.includes(userData.userName) && (
              <FontAwesomeIcon
                icon={faUserTimes}
                onClick={onDeleteMemberFromProject}
              />
            )
        }
        {
          /*SAVE PROJECT : Visible only if :
        project is being edited       
        */
          isBeingEdited && (
            <FontAwesomeIcon icon={faSave} onClick={onProjectSave} />
          )
        }

        {
          /*QUIT PROJECT UPDATE: Visible only if :
        project is being edited       
        */
          isBeingEdited && (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={onQuitProjectUpdateRequest}
            />
          )
        }
      </div>

      <div className="index__card__content">
        {project.description !== undefined ? (
          <>
            <div className="index__card__content__title">Description</div>
            <ContentEditable
              className="index__card__content__description"
              isBeingEdited={isBeingEdited}
              id="description"
              startContent={project.description}
              onChange={handleChange}
            />
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
            <ContentEditable
              className="index__card__content__description"
              isBeingEdited={isBeingEdited}
              id="presentationUrl"
              startContent={project.presentationUrl}
              onChange={handleChange}
            >
              <YoutubeImage src={project.presentationUrl} />
            </ContentEditable>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="index__card__content">
        {project.frontendProductionUrl !== undefined ? (
          <>
            <div className="index__card__content__title">URL du site</div>
            <ContentEditable
              className="index__card__content__description"
              isBeingEdited={isBeingEdited}
              id="frontendProductionUrl"
              startContent={project.frontendProductionUrl}
              onChange={handleChange}
            >
              <a href={project.frontendProductionUrl} target="_blank">
                {project.frontendProductionUrl}
              </a>
            </ContentEditable>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="index__card__content">
        {project.frontendRepo !== undefined ? (
          <>
            <div className="index__card__content__title">Repo frontend</div>
            <ContentEditable
              className="index__card__content__description"
              isBeingEdited={isBeingEdited}
              id="frontendRepo"
              startContent={project.frontendRepo}
              onChange={handleChange}
            >
              <a href={project.frontendRepo} target="_blank">
                {project.frontendRepo}
              </a>
            </ContentEditable>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="index__card__content">
        {project.backendRepo !== undefined ? (
          <>
            <div className="index__card__content__title">Repo backend</div>
            <ContentEditable
              className="index__card__content__description"
              isBeingEdited={isBeingEdited}
              id="backendRepo"
              startContent={project.backendRepo}
              onChange={handleChange}
            >
              <a href={project.backendRepo} target="_blank">
                {project.backendRepo}
              </a>
            </ContentEditable>
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

      <div className="index__card__content">
        {project.isPublic !== undefined ? (
          <>
            <div className="index__card__content__title">Public ?</div>
            <div className="index__card__content__description">
              <input
                type="checkbox"
                checked={isPublic}
                disabled={isBeingEdited ? false : true}
                onClick={onSetPublic}
              />
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
