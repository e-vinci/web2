import React, { useContext, useState } from "react";
import callAPI from "../../../utils/api/fetch";
import { getIdToken } from "../../../utils/auths/authPopup";

const ProjectDataContext = React.createContext([
  {},
  () => {},
  {},
  () => {},
  {},
  () => {},
  {},
  () => {},
]);

const ProjectDataProvider = ({ children }) => {
  const [projectGroupData, setProjectGroupData] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [projectData, setProjectData] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ProjectDataContext.Provider
      value={[
        projectGroupData,
        setProjectGroupData,
        userData,
        setUserData,
        projectData,
        setProjectData,
        isLoaded,
        setIsLoaded,
      ]}
    >
      {children}
    </ProjectDataContext.Provider>
  );
};

const useProjectData = () => {
  const [
    projectGroupData,
    setProjectGroupData,
    userData,
    setUserData,
    projectData,
    setProjectData,
    isLoaded,
    setIsLoaded,
  ] = useContext(ProjectDataContext);

  const updateProjectGroupData = async () => {
    try {
      const tempProjectGroup = await callAPI(
        "projectgroups/default/public",
        "get"
      );
      setProjectGroupData(tempProjectGroup);
      console.log("STATE NOW ????", projectGroupData);
      return tempProjectGroup;
    } catch (err) {
      console.error("useProjectData:error:", err);
    }
  };

  const updateUserData = async () => {
    try {
      const tempUser = await callAPI(
        "users/role",
        "get",
        getIdToken(),
        undefined
      );
      setUserData(tempUser);
      return tempUser;
    } catch (err) {
      console.error("useProjectData:updateUserData:error:", err);
    }
  };

  const updateProjectData = async (projectGroupName) => {
    try {
      setIsLoaded(false);
      let tempProject = await callAPI(
        "projects/projectgroups/" + projectGroupName,
        "get",
        getIdToken(),
        undefined
      );
      setProjectData(tempProject);
      console.log("project array updated", tempProject);
      setIsLoaded(true);
      return tempProject;
    } catch (err) {
      console.error("useProjectData:updateProjectDataerror:", err);
    }
  };

  /**
   * To be improved if app was to deal with more than one project !
   * @param {*} projectGroupName  : to be later used if the app was to provide multiple projects !
   */
  const addOneProject = async (projectGroupName) => {
    try {
      const newProject = await callAPI(
        "projects",
        "post",
        getIdToken(),
        undefined
      );
      //return await updateProjectData(projectGroupName);
      return newProject;
    } catch (err) {
      console.error("useProjectData:addOneProject:error:", err);
    }
  };

  const deleteOneProject = async (project) => {
    try {
      const deletedProject = await callAPI(
        "projects/" + project._id,
        "DELETE",
        getIdToken(),
        undefined
      );
      //return await updateProjectData(projectGroupName);
      return deletedProject;
    } catch (err) {
      console.error("useProjectData:deleteOneProject:error:", err);
    }
  };

  const addMemberToProject = async (project) => {
    try {
      const projectUpdated = await callAPI(
        "projects/" + project._id + "/member",
        "POST",
        getIdToken(),
        undefined
      );
     
      return projectUpdated;
    } catch (err) {
      console.error("useProjectData:addMemberToProject:error:", err);
    }
  };

  const deleteMemberFromProject = async (project) => {
    try {
      const projectUpdated = await callAPI(
        "projects/" + project._id + "/member",
        "DELETE",
        getIdToken(),
        undefined
      );

      return projectUpdated;
    } catch (err) {
      console.error("useProjectData:deleteMemberFromProject:error:", err);
    }
  };

  return {
    ...{
      projectGroupData,
      updateProjectGroupData,
      userData,
      updateUserData,
      projectData,
      updateProjectData,
      addOneProject,
      deleteOneProject,
      addMemberToProject,
      deleteMemberFromProject,
      isLoaded,
      setIsLoaded,
    },
  };
};

export { ProjectDataProvider, useProjectData };
