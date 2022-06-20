import React from "react";
import { graphql } from "gatsby";
import { useStaticQuery } from "gatsby";

import MainLayout from "../components/main-layout";

import { withAuthentication } from "../components/hoc/hoc";
import { ProjectDataProvider } from "../components/context/projects/project-data-context";

import ProjectManagement from "../components/projects/project-management";

const ProjectPage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultAssociatedProjectGroupName
          }
        }
      }
    `
  );

  const associatedProjectGroupName =
    data?.site.siteMetadata.defaultAssociatedProjectGroupName;

  return (
    <ProjectDataProvider>
      <MainLayout>
        <ProjectManagement
          associatedProjectGroupName={associatedProjectGroupName}
        />
      </MainLayout>
    </ProjectDataProvider>
  );
};

const ProjectPageProtected = withAuthentication(ProjectPage);
export default ProjectPageProtected;
