import React from "react";
import ReviewCard from "./review-card";

const MyReviews = ({ projects, setFilteredContents, allReviews }) => {
  console.log("MYREVIEWS:", projects);

  console.log("ALL REVIEWS", allReviews);
  // Merge interesting data from allReviews within projects
  const newProjects = projects?.map((project) => {
    const sameProjectWithOtherData = allReviews.find(
      (element) => project.convertedProjectId === element._id
    );
    const newProject = {
      ...project,
      countExpected: sameProjectWithOtherData.countExpected,
      countLiked: sameProjectWithOtherData.countLiked,
      countReviews: sameProjectWithOtherData.countReviews,
      projectReviews: sameProjectWithOtherData.projectReviews,
    };
    console.log("new proj:", newProject);
    return newProject;
  });

  if (!projects || projects.length <= 0) return null;

  return (
    <>
      {newProjects?.map((project, index) => (
        <ReviewCard key={index} {...{ project, setFilteredContents }} />
      ))}
    </>
  );
};

export default MyReviews;
