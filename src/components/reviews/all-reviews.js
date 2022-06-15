import React from "react";
import ReviewCard from "./review-card";


const AllReviews = ({ projects, setFilteredContents, myReviewsSummary }) => {
  console.log("SUMMARY:", myReviewsSummary);
  if (myReviewsSummary && myReviewsSummary.expectedReviews > 0)
    return (
      <td className="index--long-text">
        Veuillez compléter les revues qui vous ont été attribuées dans le Menu
        "Revues de projets", "Mes revues". Une fois vos{" "}
        {myReviewsSummary.expectedReviews} revues réalisées, votre accès aux
        résultats sera débloqué ; )`
      </td>
    );

  if (!projects || projects.length <= 0) return null;

  return (
    <>
      {projects.map((project, index) => (
        <ReviewCard key={index} {...{ project, setFilteredContents }} />
      ))}
    </>
  );
};

export default AllReviews;
