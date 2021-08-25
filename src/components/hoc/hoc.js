import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { getUserName } from "../../utils/auths/authPopup";

const withFrontmatter = (WrappedComponent, frontmatter) => (props) => {
  console.log("props", props);
  return <WrappedComponent {...{ props, frontmatter }} />;
};

const withAuthentication = (WrappedComponent) => (props) => {
  const [isSigned, setIsSigned] = useState(false);

  // useEffect has to be used in order to ensure that the code is executed at client side
  useEffect(() => {
    const username = getUserName();
    if (!username) {
      navigate("/login");
      return null;
    }
    // user is authenticated
    setIsSigned(true);
  });

  if (!isSigned) {
    return null;
  }
  return <WrappedComponent {...props}></WrappedComponent>;
};

export { withFrontmatter, withAuthentication };
