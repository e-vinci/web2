import React, { useState, useEffect } from "react";
import MainLayout from "../components/main-layout";
import callAPI from "../utils/api/fetch";

const ProjectPage = () => {
  const [projectGroup, setProjectGroup] = useState(undefined);

  useEffect(() => {
    // get data from APIs
    getData();
  }, []);

  const getData = async () => {
    try {
      let tempProjectGroup = await callAPI(
        "projectgroups/default/public",
        "get"
      );
      setProjectGroup(tempProjectGroup);
      console.log("data:", tempProjectGroup);
    } catch (error) {
      console.error("getData:error", error);
    }
  };

  return (
    <MainLayout>
      <h3>Project Page</h3>
      <p>Current project : {JSON.stringify(projectGroup)}</p>
    </MainLayout>
  );
};

export default ProjectPage;
