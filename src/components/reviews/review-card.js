import React, { useState, useRef, useEffect } from "react";
import YoutubeImage from "../image/youtube-image.js";
import he from "he";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faMinusCircle,
  faSave,
  faTimes,
  faCommentDots,
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useMsal } from "@azure/msal-react";
import { getNamesFromEmail } from "../../utils/string/string";
import { useProjectData } from "../context/projects/project-data-context";
import ContentEditable from "../content-editable/content-editable.js";
import ProjectReviewsSummary from "./project-reviews-summary.js";
import { useReviewData } from "../context/reviews/review-data-context.js";
import Quote from "../quote/quote.js";

const ReviewCard = ({ project, setFilteredContents }) => {
  const { accounts } = useMsal();
  const userName = accounts?.[0].username; //getUserName(); SEE IF EXISTS !!!

  let userReview;
  // get the associated review of the authenticated user (from my reviews)
  if (project.praise !== undefined) userReview = project;
  // get the eventual associated review of the authenticated user (from all reviews)
  else if (project.projectReviews && project.projectReviews.length > 0) {
    userReview = project.projectReviews.find(
      (element) => element.userName === userName
    );
  }

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [like, setLike] = useState(userReview ? userReview.like : false);
  const [projectUpdateState, setProjectUpdateState] = useState({});
  const [isDetailed, setIsDetailed] = useState(false);

  const detailedElementRef = useRef(null);

  // Scroll to the element that is detailed or that is put back without details
  useEffect(() => {
    if (detailedElementRef.current && isDetailed) {
      detailedElementRef.current.scrollIntoView();
    }
  }, [isDetailed]);

  // Get state management functions from the provider
  const {
    userData,
    //projectGroupData,
    //projectData,
  } = useProjectData();

  const {
    updateExpectedProjectReview,
    createFreeProjectReview,
    updateAllReviewsData,
    updateMyReviewSummaryData,
    updateMyReviewsData,
    myReviewSummaryData,
  } = useReviewData();

  // Deal with events

  const onProjectUpdateRequest = () => {
    setIsBeingEdited(true);
  };

  const onQuitProjectUpdateRequest = () => {
    setIsBeingEdited(false);
    // clear the update state
    setProjectUpdateState({});
  };

  const onProjectSave = async () => {
    /* save the updated state via the API only if :
    the state object is not empty
    each expected state property exists OR is given in the props*/
    if (Object.keys(projectUpdateState).length === 0) return;

    if (!projectUpdateState.praise && (!userReview || !userReview.praise))
      return;

    if (
      !projectUpdateState.notImpressed &&
      (!userReview || !userReview.notImpressed)
    )
      return;

    /*
    Determine if it's the update of an expected review or if it is
    the creation of a new review :
    */

    let updatedProject;
    if (userReview) {
      updatedProject = await updateExpectedProjectReview(
        projectUpdateState,
        userReview._id
      );
    } else {
      updatedProject = await createFreeProjectReview(
        projectUpdateState,
        project._id
      );
    }
    // clear the project update state
    setProjectUpdateState({});
    setIsBeingEdited(false);
    // update all review state to re-render
    if (updatedProject) {
      await updateAllReviewsData(project.projectGroupName);
      await updateMyReviewSummaryData(
        userData.userName,
        project.projectGroupName
      );
      await updateMyReviewsData(userData.userName, project.projectGroupName);
      setFilteredContents(undefined);
    }
    // }
  };

  const onViewDetails = () => {
    setIsDetailed(true);
  };

  const onQuitViewDetails = () => {
    setIsDetailed(false);
  };

  // deal with modification of content
  const handleChange = (propChanged) => {
    // update the projectState
    setProjectUpdateState((previousState) => {
      return { ...previousState, ...propChanged };
    });
  };

  const onSetLike = (e) => {
    setLike(!like);
    setProjectUpdateState({
      ...projectUpdateState,
      ...{ like: !like },
    });
  };

  if (!project) return null;

  return (
    <div
      className={
        "index__card" +
        (isBeingEdited
          ? " index__card--is-being-edited"
          : "" + (isDetailed ? " index--long-text" : ""))
      }
      ref={detailedElementRef}
    >
      <div className="index__card__header">
        <span>
          {"Projet N° " + project.shortId + " : " + he.decode(project.name)}
        </span>
      </div>

      <div className="index__card__header">
        <ProjectReviewsSummary project={project} />
      </div>

      <div className="index__card__description">
        {
          /* ADD REVIEW : visible only if         
          the username is not part of the projectMembers AND
          the review is not being edited    AND
          the review is not detailed                
          */

          !project.projectMembers.includes(userName) &&
          !isBeingEdited &&
          !isDetailed ? (
            <FontAwesomeIcon
              icon={faCommentDots}
              onClick={onProjectUpdateRequest}
            />
          ) : (
            ""
          )
        }

        {
          /*SAVE PROJECT : Visible only if :
        project is being edited       
        */
          isBeingEdited && (
            <FontAwesomeIcon icon={faSave} onClick={onProjectSave} />
          )
        }

        {
          /*QUIT PROJECT UPDATE: Visible only if :
        project is being edited       
        */
          isBeingEdited && (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={onQuitProjectUpdateRequest}
            />
          )
        }

        {
          /*VIEW PROJECT REVIEWS DETAILED : Visible only if :
        project is not being edited AND
        project is not detailed AND 
        the user has no more expected reviews    
        */
          !isBeingEdited &&
            !isDetailed &&
            myReviewSummaryData &&
            myReviewSummaryData.expectedReviews === 0 && (
              <FontAwesomeIcon icon={faEye} onClick={onViewDetails} />
            )
        }

        {
          /*QUIT PROJECT REVIEWS DETAILED: Visible only if :
        project is detailed      
        */
          isDetailed && (
            <FontAwesomeIcon icon={faTimes} onClick={onQuitViewDetails} />
          )
        }
      </div>

      {/* Deal with telling if the project is reviewed. :
        Tell that the review is impossible if the user is a member of this project 
        else
        if there is no praise given, tell that the reviewed is not done
        else tell that the review is done*/}

      <div className="index__card__content">
        <div className="index__card__content__title">Ma revue ?</div>
        <div className="index__card__content__description">
          {project.projectMembers.includes(userName) ? (
            <FontAwesomeIcon icon={faMinusCircle} />
          ) : !userReview || ! userReview.praise || userReview.praise.length === 0 ? (
            <FontAwesomeIcon icon={faTimesCircle} />
          ) : (
            <FontAwesomeIcon icon={faCheckCircle} />
          )}
        </div>
      </div>

      <div className="index__card__content">
        {project.description !== undefined ? (
          <>
            <div className="index__card__content__title">Description</div>
            <div className="index__card__content__description">
              {he.decode(project.description)}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="index__card__content">
        {project.presentationUrl !== undefined ? (
          <>
            <div className="index__card__content__title">
              Vidéo de présentation
            </div>

            <div className="index__card__content__description">
              <YoutubeImage src={project.presentationUrl} />
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="index__card__content">
        {project.frontendProductionUrl !== undefined ? (
          <>
            <div className="index__card__content__title">URL du site</div>
            <div className="index__card__content__description">
              <a href={project.frontendProductionUrl} target="_blank">
                {project.frontendProductionUrl}
              </a>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {/* Deals with praises : this shall be shown :
      if the attribute exists OR
      if the user is adding a review (equivalent to a project update) */}
      <div className="index__card__content">
        {project.praise !== undefined || isBeingEdited ? (
          <>
            <div className="index__card__content__title">Mes points forts</div>
            <ContentEditable
              className="index__card__content__description"
              isBeingEdited={isBeingEdited}
              id="praise"
              startContent={userReview ? userReview.praise : ""}
              onChange={handleChange}
            />
          </>
        ) : (
          ""
        )}
      </div>

      {/* Deals with notImpressed points : this shall be shown :
      if the attribute exists OR
      if the user is adding a review (equivalent to a project update) */}
      <div className="index__card__content">
        {project.notImpressed !== undefined || isBeingEdited ? (
          <>
            <div className="index__card__content__title">
              Mes points d'amélioration
            </div>
            <ContentEditable
              className="index__card__content__description"
              isBeingEdited={isBeingEdited}
              id="notImpressed"
              startContent={userReview ? userReview.notImpressed : ""}
              onChange={handleChange}
            />
          </>
        ) : (
          ""
        )}
      </div>

      <div className="index__card__content">
        {project.frontendRepo !== undefined ? (
          <>
            <div className="index__card__content__title">Repo frontend</div>

            <div className="index__card__content__description">
              <a href={project.frontendRepo} target="_blank">
                {project.frontendRepo}
              </a>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="index__card__content">
        {project.backendRepo !== undefined ? (
          <>
            <div className="index__card__content__title">Repo backend</div>
            <div className="index__card__content__description">
              <a href={project.backendRepo} target="_blank">
                {project.backendRepo}
              </a>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {/* Deal with project members : show only if :
      there are project members AND 
      project review is detailed */}
      <div className="index__card__content">
        {project.projectMembers !== undefined &&
        project.projectMembers.length > 0 &&
        isDetailed ? (
          <>
            <div className="index__card__content__title">Membres du projet</div>
            <div className="index__card__content__description">
              {project.projectMembers
                .map((member) => getNamesFromEmail(member))
                .join(", ")}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {/* Deal with Like 
      allow a Like to be edited from false to true (a heart cannot be removed) 
      only when the user has still like to be given
      the state provides the info to ensure that we disable only when we load the component
      (because we want to allow updating like prior to click on save)
      NB : this shall be shown :
      if the attribute exists OR
      if the user is adding a review (equivalent to a project update) */}
      <div className="index__card__content">
        {(project.like !== undefined) | isBeingEdited ? (
          <>
            <div className="index__card__content__title">Favori ?</div>
            <div className="index__card__content__description">
              <input
                type="checkbox"
                checked={like}
                disabled={
                  !isBeingEdited || myReviewSummaryData.availableLike === 0
                    ? true
                    : like && !projectUpdateState.like
                    ? true
                    : false
                }
                onClick={onSetLike}
              />
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {/* Deal with all praises : show only if :      
      project review is detailed AND
      there are user reviews for this project*/}

      {isDetailed && project.projectReviews && project.projectReviews.length > 0
        ? project.projectReviews.map((review, index) => (
            <div className="index__card__content">
              <div className="index__card__content__title">
                {index === 0 ? "Tous les points forts" : ""}
              </div>
              <div className="index__card__content__description">
                <Quote
                  content={he.decode(review.praise)}
                  author={getNamesFromEmail(review.userName)}
                />
              </div>
            </div>
          ))
        : ""}

      {/* Deal with all improvements : show only if :      
      project review is detailed AND
      there are user reviews for this project*/}

      {isDetailed && project.projectReviews && project.projectReviews.length > 0
        ? project.projectReviews.map((review, index) => (
            <div className="index__card__content">
              <div className="index__card__content__title">
                {index === 0 ? "Tous les points d'amélioration" : ""}
              </div>
              <div className="index__card__content__description">
                <Quote
                  content={he.decode(review.notImpressed)}
                  author={getNamesFromEmail(review.userName)}
                />
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default ReviewCard;
