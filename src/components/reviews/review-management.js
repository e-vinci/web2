import React, { useState, useEffect } from "react";
import Spinner from "../spinner/spinner";

import { useProjectData } from "../context/projects/project-data-context";
import { useReviewData } from "../context/reviews/review-data-context";
import AllReviews from "./all-reviews";
import AllReviewsSummary from "./all-reviews-summary";
import MyReviewsSummary from "./my-reviews-summary";

const ReviewManagement = ({associatedProjectGroupName}) => {
  // Get state from the provider
  const { projectGroupData, updateProjectGroupData, userData, updateUserData } =
    useProjectData();

  const {
    myReviewSummaryData,
    updateMyReviewSummaryData,
    allReviewsData,
    updateAllReviewsData,
    isLoaded,
  } = useReviewData();

  const [filteredContents, setFilteredContents] = useState(undefined);
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setQuery(e.target.value);

    const filteredData = allReviewsData.filter((content) => {
      // destructure data from post frontmatter
      const { shortId, name, description } = content;
      return (
        // standardize data with .toLowerCase()
        // return true if the subject, skills...
        // contains the query string
        name.toLowerCase().includes(inputText.toLowerCase()) ||
        description.toLowerCase().includes(inputText.toLowerCase()) ||
        (inputText.length > 0 && parseInt(inputText) === shortId)
      );
    });

    if (filteredData && filteredData.length > 0)
      setFilteredContents(filteredData);
    else setFilteredContents(undefined);
  };

  const onReviewAdd = async () => {
    console.log("add and", projectGroupData._id);
    //await addOneProject();
    //const newListOfProjects = await updateProjectData(projectGroupData._id);
    setFilteredContents(undefined);
  };

  useEffect(() => {
    // get data from APIs
    getData();
  }, []);

  const getData = async () => {
    try {
      // Deal with project group data
      const group = await updateProjectGroupData(associatedProjectGroupName);
      // Deal with user role data {role:..., isAdmin:...}
      const user = await updateUserData(associatedProjectGroupName);
      // Deal with review data
      const temp = await updateMyReviewSummaryData(user.userName, group._id);
      const summary = await updateAllReviewsData(group._id);
      console.log("Summary", summary);
    } catch (error) {
      console.error("getData:error", error);
    }
  };
  let startingDate;
  if (projectGroupData) {
    // get the starting date to a string (parse it as it is seen as a string the date from the API / MongoDB)
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    startingDate = new Date(projectGroupData.reviewStartingDate);
    startingDate = startingDate.toLocaleDateString("fr-FR", options);
  }

  return (
    <>
      {!isLoaded && <Spinner />}
      {projectGroupData === undefined ? (
        ""
      ) : (
        // deal with review view

        <div className="pl-3 pt-3 pb-3 pr-3">
          <h3 className="">
            Gestion des revues des groupes de {projectGroupData?._id}
          </h3>
          {
            /* ONLY SHOW ALL REVIEWS IF
          project group status is not "init" or "dev" AND
          (user is admin OR user is a project member within this group) 
          AND today is after the project review starting date 
          */
            projectGroupData &&
            projectGroupData.status !== "init" &&
            projectGroupData.status !== "dev" &&
            ((userData && userData.isAdmin) ||
              (myReviewSummaryData && myReviewSummaryData.isProjectMember)) ? (
              <div>
                <div className="summary">
                  <div className="summary__card-wrapper">
                    <AllReviewsSummary
                      projects={allReviewsData}                      
                    />
                  </div>
                  <div className="summary__card-wrapper">
                    <MyReviewsSummary myReviewsSummary={myReviewSummaryData} />
                  </div>
                </div>

                <div className="index">
                  <input
                    type="text"
                    aria-label="Search"
                    placeholder="Filtrez les contenus..."
                    onChange={handleInputChange}
                    className="index__search"
                  />

                  <AllReviews
                    projects={
                      filteredContents && filteredContents.length > 0
                        ? filteredContents
                        : allReviewsData
                    }
                    myReviewsSummary={myReviewSummaryData}
                    setFilteredContents={setFilteredContents}
                  ></AllReviews>
                </div>
              </div>
            ) : // deal with reasons not to show the reviews
            // Deal when it is not the season
            !projectGroupData ||
              projectGroupData.status === "init" ||
              projectGroupData.status === "dev" ? (
              `La saison de revues des projets n'a pas encore été ouverte.
      Nous nous réjouissons de vous revoir tout bientôt pour évaluer les projets de différents groupes.
      Une annonce sera faite une fois la saison ouverte ; )
      Date d'ouverture estimée : ${startingDate}`
            ) : (
              // Deal when it is not the right use
              "Vous n'avez pas encore le privilège de voir les revues des projets des groupes de " +
              projectGroupData._id +
              ". Si nécessaire, n'hésitez pas à faire une demande à l'administrateur du site."
            )
          }
        </div>
      )}
    </>
  );
};
export default ReviewManagement;
