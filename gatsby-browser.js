import React from "react";
import ProjectDataProvider from "./src/components/context/projects/project-data-context";
export const onServiceWorkerUpdateReady = () => window.location.reload(true);
/*
export const wrapRootElement = ({ element }) => (
    <ProjectDataProvider>{element}</ProjectDataProvider>
  )
*/