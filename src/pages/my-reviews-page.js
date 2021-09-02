import React from "react";
import MainLayout from "../components/main-layout";

import { withAuthentication } from "../components/hoc/hoc";
import { ProjectDataProvider } from "../components/context/projects/project-data-context";
import { ReviewDataProvider } from "../components/context/reviews/review-data-context";

import MyReviewsManagement from "../components/reviews/my-reviews-management";

const MyReviewsPage = () => {
  return (
    <ProjectDataProvider>
      <ReviewDataProvider>
        <MainLayout>
          <MyReviewsManagement />
        </MainLayout>
      </ReviewDataProvider>
    </ProjectDataProvider>
  );
};

const MyReviewsPageProtected = withAuthentication(MyReviewsPage);
export default MyReviewsPageProtected ;
;
