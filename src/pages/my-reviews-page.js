import React from "react";
import { graphql } from "gatsby";
import { useStaticQuery } from "gatsby";

import MainLayout from "../components/main-layout";

import { withAuthentication } from "../components/hoc/hoc";
import { ProjectDataProvider } from "../components/context/projects/project-data-context";
import { ReviewDataProvider } from "../components/context/reviews/review-data-context";

import MyReviewsManagement from "../components/reviews/my-reviews-management";

const MyReviewsPage = () => {
  const data = useStaticQuery(
    graphql`
      query  {
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
          <MyReviewsManagement
            associatedProjectGroupName={associatedProjectGroupName}
          />
        </MainLayout>
      </ReviewDataProvider>
    </ProjectDataProvider>
  );
};

const MyReviewsPageProtected = withAuthentication(MyReviewsPage);
export default MyReviewsPageProtected;
