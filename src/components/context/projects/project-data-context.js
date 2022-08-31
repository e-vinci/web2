import React, { useContext, useState } from 'react';
import callAPI from '../../../utils/api/fetch';
import { useMsal } from '@azure/msal-react';
import { getAsyncIdToken } from '../../../utils/auths/use-id-token';

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
  const { instance, accounts } = useMsal();

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

  const updateProjectGroupData = async (associatedProjectGroupName) => {
    try {
      const idToken = await getAsyncIdToken(accounts, instance);
      const tempProjectGroup = await callAPI(
        `projectgroups/${associatedProjectGroupName}`,
        'get',
        idToken,
        undefined
      );
      setProjectGroupData(tempProjectGroup);
      console.log('STATE NOW ????', tempProjectGroup);
      return tempProjectGroup;
    } catch (err) {
      console.error('useProjectData:error:', err);
    }
  };

  const updateUserData = async (associatedProjectGroupName) => {
    try {
      const idToken = await getAsyncIdToken(accounts, instance);
      const tempUser = await callAPI(
        `users/role/?projectgroupname=${associatedProjectGroupName}`,
        'get',
        idToken,
        undefined
      );
      setUserData(tempUser);
      return tempUser;
    } catch (err) {
      console.error('useProjectData:updateUserData:error:', err);
    }
  };

  const updateProjectData = async (projectGroupName) => {
    try {
      const idToken = await getAsyncIdToken(accounts, instance);
      setIsLoaded(false);
      let tempProject = await callAPI(
        'projects/projectgroups/' + projectGroupName,
        'get',
        idToken,
        undefined
      );
      setProjectData(tempProject);
      console.log('project array updated', tempProject);
      setIsLoaded(true);
      return tempProject;
    } catch (err) {
      console.error('useProjectData:updateProjectDataerror:', err);
    }
  };

  /**
   * Add one project to an existing projectGroupName !
   * @param {*} projectGroupName
   */
  const addOneProject = async (projectGroupName) => {
    try {
      const idToken = await getAsyncIdToken(accounts, instance);
      const newProject = await callAPI('projects', 'post', idToken, {
        projectGroupName,
      });
      //return await updateProjectData(projectGroupName);
      return newProject;
    } catch (err) {
      console.error('useProjectData:addOneProject:error:', err);
    }
  };

  const deleteOneProject = async (project) => {
    try {
      const idToken = await getAsyncIdToken(accounts, instance);
      const deletedProject = await callAPI(
        'projects/' + project._id,
        'DELETE',
        idToken,
        undefined
      );
      //return await updateProjectData(projectGroupName);
      return deletedProject;
    } catch (err) {
      console.error('useProjectData:deleteOneProject:error:', err);
    }
  };

  const addMemberToProject = async (project) => {
    try {
      const idToken = await getAsyncIdToken(accounts, instance);
      const projectUpdated = await callAPI(
        'projects/' + project._id + '/member',
        'POST',
        idToken,
        undefined
      );

      return projectUpdated;
    } catch (err) {
      console.error('useProjectData:addMemberToProject:error:', err);
    }
  };

  const deleteMemberFromProject = async (project) => {
    try {
      const idToken = await getAsyncIdToken(accounts, instance);
      const projectUpdated = await callAPI(
        'projects/' + project._id + '/member',
        'DELETE',
        idToken,
        undefined
      );

      return projectUpdated;
    } catch (err) {
      console.error('useProjectData:deleteMemberFromProject:error:', err);
    }
  };

  const updateProject = async (data, id) => {
    console.log('project to be updated:', data);
    try {
      const idToken = await getAsyncIdToken(accounts, instance);
      const projectUpdated = await callAPI(
        'projects/' + id,
        'PATCH',
        idToken,
        data
      );

      console.log('project updated:', projectUpdated);
      return projectUpdated;
    } catch (err) {
      console.error('useProjectData:updateProject:error:', err);
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
      updateProject,
      isLoaded,
      setIsLoaded,
    },
  };
};

export { ProjectDataProvider, useProjectData };
