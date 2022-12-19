import React, { useContext, useState } from "react";
import callAPI from "../../../utils/api/fetch";
import { useMsal } from "@azure/msal-react";
import { getAsyncIdToken } from "../../../utils/auths/use-id-token";

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
  const { instance, accounts } = useMsal();

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
      const idToken = await getAsyncIdToken(accounts, instance);
      const myReviewSummary = await callAPI(
        `reviews/users/${userName}/projectgroups/${projectGroupName}/count`,
        "get",
        idToken,
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
      const idToken = await getAsyncIdToken(accounts, instance);
      if (updateOperationCount === 0) setIsLoaded(false);
      updateOperationCount++;
      const myReviews = await callAPI(
        `reviews/users/${userName}/projectgroups/${projectGroupName}`,
        "get",
        idToken,
        undefined
      );
      setMyReviewsData(myReviews);
      updateOperationCount--;
      if (updateOperationCount === 0) setIsLoaded(true);
      return myReviews;
    } catch (err) {
      setIsLoaded(true);
      console.error("useReviewData:updateMyReviewsData:error:", err);
    }
  };

  const updateAllReviewsData = async (projectGroupName) => {
    try {
      const idToken = await getAsyncIdToken(accounts, instance);
      if (updateOperationCount === 0) setIsLoaded(false);
      updateOperationCount++;
      const allReviews = await callAPI(
        `reviews/projectgroups/${projectGroupName}/summary`,
        "get",
        idToken,
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
      const idToken = await getAsyncIdToken(accounts, instance);
      const reviewUpdated = await callAPI(
        "reviews/" + id,
        "PATCH",
        idToken,
        data
      );

      return reviewUpdated;
    } catch (err) {
      console.error("useReviewData:updateProjectReview:error:", err);
    }
  };

  const createFreeProjectReview = async (data, id) => {
    try {
      const idToken = await getAsyncIdToken(accounts, instance);
      const newReview = await callAPI("reviews", "POST", idToken, {
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
