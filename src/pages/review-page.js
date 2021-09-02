import React from "react";
import MainLayout from "../components/main-layout";

import { withAuthentication } from "../components/hoc/hoc";
import { ProjectDataProvider } from "../components/context/projects/project-data-context";
import { ReviewDataProvider } from "../components/context/reviews/review-data-context";

import ReviewManagement from "../components/reviews/review-management";

const ReviewPage = () => {
  return (
    <ProjectDataProvider>
      <ReviewDataProvider>
        <MainLayout>
          <ReviewManagement />
        </MainLayout>
      </ReviewDataProvider>
    </ProjectDataProvider>
  );
};

const ReviewPageProtected = withAuthentication(ReviewPage);
export default ReviewPageProtected;
