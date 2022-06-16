import React from "react";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { Typography } from "@material-ui/core";
import { loginRequest } from "../../utils/auths/authConfig";

const withFrontmatter = (WrappedComponent, frontmatter) => (props) => {
  return <WrappedComponent {...{ props, frontmatter }} />;
};

const withAuthentication = (WrappedComponent) => (props) => {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <WrappedComponent {...props} />
    </MsalAuthenticationTemplate>
  );
};

const ErrorComponent = ({ error }) => {
  return (
    <Typography variant="h6">An Error Occurred: {error.errorCode}</Typography>
  );
};

const Loading = () => {
  return <Typography variant="h6">Authentication in progress...</Typography>;
};

export { withFrontmatter, withAuthentication };
