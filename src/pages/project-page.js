import React from 'react';
import { graphql } from 'gatsby';
import { useStaticQuery } from 'gatsby';

import MainLayout from '../components/main-layout';

import { withAuthentication } from '../components/hoc/hoc';
import { ProjectDataProvider } from '../components/context/projects/project-data-context';

import ProjectManagement from '../components/projects/project-management';

const ProjectPage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultAssociatedProjectGroupName,
            projectDocument
          }
        }
      }
    `
  );

  const {
    defaultAssociatedProjectGroupName: associatedProjectGroupName,
    projectDocument,
  } = data?.site.siteMetadata;

  console.log("document:", projectDocument);

  return (
    <ProjectDataProvider>
      <MainLayout>
        <ProjectManagement
          {...{ associatedProjectGroupName, projectDocument }}
        />
      </MainLayout>
    </ProjectDataProvider>
  );
};

const ProjectPageProtected = withAuthentication(ProjectPage);
export default ProjectPageProtected;
