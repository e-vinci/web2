import React, { useState, useEffect } from 'react';
import ProjectsView from './projects-view';
import Spinner from '../spinner/spinner';

import { useProjectData } from '../context/projects/project-data-context';
import LinkFile from '../file/link-file';

const ProjectManagement = ({ associatedProjectGroupName, projectDocument }) => {
  // Get state from the provider
  const {
    projectGroupData,
    updateProjectGroupData,
    userData,
    updateUserData,
    isLoaded,
    projectData,
    addOneProject,
    updateProjectData,
  } = useProjectData();

  const [filteredContents, setFilteredContents] = useState(undefined);
  const [query, setQuery] = useState('');

  console.log("projectDocument : ", projectDocument);

  const handleInputChange = (e) => {
    // Get project data from Context
    //const { projectData } = useProjectData();

    const inputText = e.target.value;
    setQuery(e.target.value);

    console.log('handleInputChange::ProjectData', projectData);
    const filteredData = projectData.filter((content) => {
      // destructure data from post frontmatter
      const { shortId, name, description } = content;
      return (
        // standardize data with .toLowerCase()
        // return true if the subject, skills...
        // contains the query string
        name.toLowerCase().includes(inputText.toLowerCase()) ||
        description.toLowerCase().includes(inputText.toLowerCase()) ||
        (inputText.length > 0 && parseInt(inputText) === shortId)
      );
    });

    if (filteredData && filteredData.length > 0)
      setFilteredContents(filteredData);
    else setFilteredContents(undefined);
  };

  const onProjectAdd = async () => {
    console.log('add and', projectGroupData._id);
    await addOneProject(projectGroupData._id);
    const newListOfProjects = await updateProjectData(projectGroupData._id);
    setFilteredContents(undefined);
  };

  useEffect(() => {
    // get data from APIs
    getData();
  }, []);

  const getData = async () => {
    try {
      // Deal with project group data
      const group = await updateProjectGroupData(associatedProjectGroupName);
      // Deal with user role data {role:..., isAdmin:...}
      const user = await updateUserData(associatedProjectGroupName);
      // Deal with project data
      const temp = await updateProjectData(group._id);
    } catch (error) {
      console.error('getData:error', error);
    }
  };

  return (
    <>
      {!isLoaded && <Spinner />}
      {projectGroupData === undefined ? (
        ''
      ) : (
        // deal with project view
        <div className="pl-3 pt-3 pb-3 pr-3">
          <h3 className="">Projets des groupes de {projectGroupData?._id}</h3>
          {/* Deal with potential project document to print*/}
          {projectDocument && (
            <LinkFile name={projectDocument}>
              Consignes & template du projet
            </LinkFile>
          )}
          <div className="index">
            <input
              type="text"
              aria-label="Search"
              placeholder="Filtrez les contenus..."
              onChange={handleInputChange}
              className="index__search"
            />
            {filteredContents && filteredContents.length > 0 ? (
              <ProjectsView
                projects={filteredContents}
                setFilteredContents={setFilteredContents}
              ></ProjectsView>
            ) : (
              <ProjectsView
                projects={projectData}
                setFilteredContents={setFilteredContents}
              ></ProjectsView>
            )}
          </div>

          {/* // deal with add a project button */}
          {userData === undefined || !userData.isAdmin ? (
            ''
          ) : (
            <button className="index__button" onClick={onProjectAdd}>
              Ajouter projet
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default ProjectManagement;
