import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

import { loginRequest } from "../../utils/auths/authConfig";

const withFrontmatter = (WrappedComponent, frontmatter) => (props) => {
  console.log("props", props);
  return <WrappedComponent {...{ props, frontmatter }} />;
};

const withAuthentication = (WrappedComponent) => (props) => {
  const { instance } = useMsal();

  const isAuthenticated = useIsAuthenticated();

  const [isSigned, setIsSigned] = useState(false);

  // useEffect has to be used in order to ensure that the code is executed at client side
  useEffect(() => {
    if (!isAuthenticated) {
      instance.loginRedirect(loginRequest);
    }
  });

  return <WrappedComponent {...props}></WrappedComponent>;
};

export { withFrontmatter, withAuthentication };
