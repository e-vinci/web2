import React from "react";
import { graphql } from "gatsby";
import { useStaticQuery } from "gatsby";
import MainLayout from "../components/main-layout";

import { withAuthentication } from "../components/hoc/hoc";
import { ProjectDataProvider } from "../components/context/projects/project-data-context";
import { ReviewDataProvider } from "../components/context/reviews/review-data-context";

import ReviewManagement from "../components/reviews/review-management";

const ReviewPage = () => {
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
      <ReviewDataProvider>
        <MainLayout>
          <ReviewManagement
            associatedProjectGroupName={associatedProjectGroupName}
          />
        </MainLayout>
      </ReviewDataProvider>
    </ProjectDataProvider>
  );
};

const ReviewPageProtected = withAuthentication(ReviewPage);
export default ReviewPageProtected;
