import React from "react";
import MainLayout from "../components/main-layout";

import { withAuthentication } from "../components/hoc/hoc";
import { ProjectDataProvider } from "../components/context/projects/project-data-context";

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

const ProjectPageProtected = withAuthentication(ProjectPage);
export default ProjectPageProtected;
