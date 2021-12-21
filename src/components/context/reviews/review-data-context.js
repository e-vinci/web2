import React, { useContext, useState } from "react";
import callAPI from "../../../utils/api/fetch";
import { getIdToken } from "../../../utils/auths/authPopup";

const ReviewDataContext = React.createContext([
  {},
  () => {},
  {},
  () => {},
  false, // isLoaded = false by default
  () => {},
]);

const ReviewDataProvider = ({ children }) => {
  const [myReviewSummaryData, setMyReviewSummaryData] = useState(undefined);
  const [allReviewsData, setAllReviewsData] = useState(undefined);
  const [myReviewsData, setMyReviewsData] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ReviewDataContext.Provider
      value={[
        myReviewSummaryData,
        setMyReviewSummaryData,
        allReviewsData,
        setAllReviewsData,
        myReviewsData,
        setMyReviewsData,
        isLoaded,
        setIsLoaded,
      ]}
    >
      {children}
    </ReviewDataContext.Provider>
  );
};

let updateOperationCount = 0;

const useReviewData = () => {
  const [
    myReviewSummaryData,
    setMyReviewSummaryData,
    allReviewsData,
    setAllReviewsData,
    myReviewsData,
    setMyReviewsData,
    isLoaded,
    setIsLoaded,
  ] = useContext(ReviewDataContext);

  const updateMyReviewSummaryData = async (userName, projectGroupName) => {
    try {
      const myReviewSummary = await callAPI(
        `reviews/users/${userName}/projectgroups/${projectGroupName}/count`,
        "get",
        getIdToken(),
        undefined
      );
      setMyReviewSummaryData(myReviewSummary);

      return myReviewSummary;
    } catch (err) {
      console.error("useReviewData:updateMyReviewSummaryData:error:", err);
    }
  };

  const updateMyReviewsData = async (userName, projectGroupName) => {
    try {
      if (updateOperationCount === 0) setIsLoaded(false);
      updateOperationCount++;
      const myReviews = await callAPI(
        `reviews/users/${userName}/projectgroups/${projectGroupName}`,
        "get",
        getIdToken(),
        undefined
      );
      setMyReviewsData(myReviews);
      updateOperationCount--;
      if (updateOperationCount === 0) setIsLoaded(true);
      return myReviews;
    } catch (err) {
      console.error("useReviewData:updateMyReviewsData:error:", err);
    }
  };

  const updateAllReviewsData = async (projectGroupName) => {
    try {
      if (updateOperationCount === 0) setIsLoaded(false);
      updateOperationCount++;
      const allReviews = await callAPI(
        `reviews/projectgroups/${projectGroupName}/summary`,
        "get",
        getIdToken(),
        undefined
      );
      setAllReviewsData(allReviews);
      updateOperationCount--;
      if (updateOperationCount === 0) setIsLoaded(true);
      return allReviews;
    } catch (err) {
      console.error("useReviewData:updateAllReviewsData:error:", err);
    }
  };

  const updateExpectedProjectReview = async (data, id) => {
    try {
      const reviewUpdated = await callAPI(
        "reviews/" + id,
        "PATCH",
        getIdToken(),
        data
      );

      return reviewUpdated;
    } catch (err) {
      console.error("useReviewData:updateProjectReview:error:", err);
    }
  };

  const createFreeProjectReview = async (data, id) => {
    console.log("data:", data ,"id:", id);
    try {
      const newReview = await callAPI("reviews", "POST", getIdToken(), {
        ...data,
        projectId: id,
      });

      return newReview;
    } catch (err) {
      console.error("useReviewData:createFreeProjectReview:error:", err);
    }
  };

  return {
    ...{
      myReviewSummaryData,
      updateMyReviewSummaryData,
      allReviewsData,
      updateAllReviewsData,
      myReviewsData,
      updateMyReviewsData,
      updateExpectedProjectReview,
      createFreeProjectReview,
      isLoaded,
      setIsLoaded,
    },
  };
};

export { ReviewDataProvider, useReviewData };
