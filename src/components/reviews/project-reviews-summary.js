import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

const ProjectReviewsSummary = ({ project }) => {
  if (!project) return null;

  return (
    <div className="counter">
      <div className="">
        <FontAwesomeIcon icon={faHeart} className="counter__symbol counter__symbol--red" />
        <span className="text--light">{project.countLiked}</span>
      </div>

      <div className="">
        <FontAwesomeIcon icon={faComment} className="counter__symbol counter__symbol--orange" />
        <span className="text--light">{project.countExpected}</span>
      </div>

      <div className="">
        <FontAwesomeIcon icon={faComment} className="counter__symbol counter__symbol--green" />
        <span className="text--light">{project.countReviews}</span>
      </div>
    </div>
  );
};

export default ProjectReviewsSummary;
