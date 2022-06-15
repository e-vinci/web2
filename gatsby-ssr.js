/*import React from "react";
import ProjectDataProvider from "./src/components/context/projects/project-data-context";

export const wrapRootElement = ({ element }) => (
  <ProjectDataProvider>{element}</ProjectDataProvider>
);
*/

import wrapWithProvider from "./src/utils/auths/wrap-with-provider";

export const wrapRootElement = wrapWithProvider;