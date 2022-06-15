import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { CustomNavigationClient } from "../navigation/navigation-client";

const msalInstance = new PublicClientApplication(msalConfig);

export default ({ element }) => {
  // The next 2 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  //const navigationClient = new CustomNavigationClient();
  //msalInstance.setNavigationClient(navigationClient);

  return <MsalProvider instance={msalInstance}>{element}</MsalProvider>;
};
