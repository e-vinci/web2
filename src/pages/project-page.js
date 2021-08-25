import React from "react";
import MainLayout from "../components/main-layout";
/*
import callAPI from "../utils/api/fetch";
import Section from "../components/section";
import Content from "../components/content";*/
//import ProjectView from "../components/projects/projects-view";
//import Spinner from "../components/spinner/spinner";
import { withAuthentication } from "../components/hoc/hoc";
import { ProjectDataProvider } from "../components/context/projects/project-data-context";
//import { getIdToken } from "../utils/auths/authPopup";
import {
  useProjectGroupData,
  useUserData,
  useProjectData,
} from "../components/context/projects/project-data-context";

import ProjectManagement from "../components/projects/project-management";

const ProjectPage = () => {
  return (
    <ProjectDataProvider>
      <MainLayout>
        <ProjectManagement />
      </MainLayout>
    </ProjectDataProvider>
  );
};

// const ProjectPage = () => {

//   const [projectGroup, setProjectGroup] = useState(undefined);
//   const [userRole, setUserRole] = useState(undefined);
//   const [projectsData, setProjectsData] = useState(undefined);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Get state from the provider
//   const { projectGroupData, updateProjectGroupData } = useProjectGroupData();
//   const { userData, updateUserData } = useUserData();
//   const { isLoaded, projectData, addOneProject, updateProjectData} = useProjectData();

//   const [filteredContents, setFilteredContents] = useState(undefined);
//   const [query, setQuery] = useState("");

//   const handleInputChange = (e) => {
//     // Get project data from Context
//     //const { projectData } = useProjectData();
//     const inputText = e.target.value;
//     setQuery(e.target.value);

//     const filteredData = projectData.filter((content) => {
//       // destructure data from post frontmatter
//       const { shortId, name, description } = content;
//       return (
//         // standardize data with .toLowerCase()
//         // return true if the subject, skills...
//         // contains the query string
//         name.toLowerCase().includes(inputText.toLowerCase()) ||
//         description.toLowerCase().includes(inputText.toLowerCase()) ||
//         (inputText.length > 0 && parseInt(inputText) === shortId)
//       );
//     });

//     if (filteredData && filteredData.length > 0)
//       setFilteredContents(filteredData);
//   };

//   /*
//   // Deal with project data
//   const updateProjectsData = async (projectGroupName) => {
//     setIsLoaded(false);
//     let tempProject = await callAPI(
//       "projects/projectgroups/" + projectGroupName,
//       "get",
//       getIdToken(),
//       undefined
//     );
//     setProjectsData(tempProject);
//     setFilteredContents(tempProject);
//     setIsLoaded(true);
//   };*/

//   const onProjectAdd = async () => {
//     //const { addOneProject } = useProjectData();

//     addOneProject();
//     /*const newProject = await callAPI(
//       "projects",
//       "post",
//       getIdToken(),
//       undefined
//     );
//     // update the project list
//     updateProjectsData(projectGroup._id);*/
//   };

//   useEffect(() => {
//     // get data from APIs
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       // Deal with project group data
//       /*let tempProjectGroup = await callAPI(
//         "projectgroups/default/public",
//         "get"
//       );
//       setProjectGroup(tempProjectGroup);*/
//       //const { updateProjectGroupData } = useProjectGroupData();
//       updateProjectGroupData();

//       // Deal with user role data {role:..., isAdmin:...}
//       //const { updateUserData } = useUserData();
//       updateUserData();
//       /*const tempUserRole = await callAPI(
//         "users/role",
//         "get",
//         getIdToken(),
//         undefined
//       );
//       setUserRole(tempUserRole);*/

//       // Deal with project data
//       //const { updateProjectData } = useProjectData();
//       updateProjectData();
//       //updateProjectsData(tempProjectGroup._id);
//     } catch (error) {
//       console.error("getData:error", error);
//     }
//   };

//   return (
//     <MainLayout>
//       {/* <Section className="pb-3"> */}
//       {projectGroupData === undefined ? (
//         ""
//       ) : (
//         // deal with project view
//         // <Content>
//         <div className="pl-3 pt-3 pb-3 pr-3">
//           <h3 className="">Projets des groupes de {projectGroupData._id}</h3>
//           <div className="index">
//             <input
//               type="text"
//               aria-label="Search"
//               placeholder="Filtrez les contenus..."
//               onChange={handleInputChange}
//               className="index__search"
//             />
//             <ProjectView projects={filteredContents}></ProjectView>
//           </div>

//           {/* // deal with add a project button */}
//           {userData === undefined || !userData.isAdmin ? (
//             ""
//           ) : (
//             <button className="index__button" onClick={onProjectAdd}>
//               Ajouter projet
//             </button>
//           )}
//         </div>
//       )}
//       {!isLoaded && <Spinner />}
//       {/* </Section> */}
//     </MainLayout>
//   );
// };

const ProjectPageProtected = withAuthentication(ProjectPage);
export default ProjectPageProtected;
