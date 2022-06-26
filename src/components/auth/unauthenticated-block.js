import React from "react";
import { UnauthenticatedTemplate } from "@azure/msal-react";

import NestedMdxBlock from "../mdx/nested-mdx-block";

const UnAuthenticatedBlock = ({ children }) => {
  if (!children) return null;

  return (
    <UnauthenticatedTemplate>
      <NestedMdxBlock children={children} />
    </UnauthenticatedTemplate>
  );
};

export default UnAuthenticatedBlock;
