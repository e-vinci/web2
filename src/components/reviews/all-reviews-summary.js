import React from "react";
import { Link, useStaticQuery } from "gatsby";
import YoutubeImage from "../image/youtube-image.js";
import ReviewCard from "./review-card";
import he from "he";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

const AllReviewsSummary = ({ projects }) => {
  if (!projects) return null;

  console.log("ALLREVIEWS:", projects);

  let summary;
  if (projects.length > 0) summary = projects[0];
  else
    summary = {
      totalLikedReviews: 0,
      totalExpectedReviews: 0,
      totalPerformedReviews: 0,
    };

  return (
    <div className="card card--dark-summary card--fill-wrapper">
      <div className="card__header">Résumé des revues de tous les projets</div>

      <div className="card__content card__content--long-titles">
        <div className="card__content__title">Coups de coeurs donnés</div>
        <div className="card__content__description">
          <FontAwesomeIcon icon={faHeart} />
          <span className="text--light">{summary.totalLikedReviews}</span>
        </div>

        <div className="card__content__title">Revues attendues</div>
        <div className="card__content__description">
          <FontAwesomeIcon icon={faComment} className="card__content--orange"/>
          <span className="text--light">{summary.totalExpectedReviews}</span>
        </div>

        <div className="card__content__title">Revues terminées</div>
        <div className="card__content__description">
          <FontAwesomeIcon icon={faComment} />
          <span className="text--light">{summary.totalPerformedReviews}</span>
        </div>
      </div>
    </div>
  );
};

export default AllReviewsSummary;
