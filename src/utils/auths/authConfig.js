// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters,
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html

const getMsalConfig = () => {
  // don't do anything if this is run at server side (no window object)
  if (typeof window === "undefined") return;

  let msalConfig;
  console.log("HOST", window.location.host);
  if (
    window.location.host === "localhost:8000" ||
    window.location.host === "127.0.0.1:8000"
  ) {
    msalConfig = {
      auth: {
        clientId: "2aad2517-743a-4a40-84c9-d5d8f411b5b0",
        authority:
          "https://login.microsoftonline.com/f7a15417-57cb-4855-8d36-064f95aada17", //"f7a15417-57cb-4855-8d36-064f95aada17",
        redirectUri: "http://localhost:8000",
        postLogoutRedirectUri: "https://localhost:8000",
      },
      cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      },
    };
  } else {
    msalConfig = {
      auth: {
        clientId: "e4274dd2-fd73-4756-abac-0faa44362f5b",
        authority:
          "https://login.microsoftonline.com/f7a15417-57cb-4855-8d36-064f95aada17", //"f7a15417-57cb-4855-8d36-064f95aada17",
        redirectUri: "https://e-vinci.github.io/myjscourse",
        postLogoutRedirectUri:
          "https://e-vinci.github.io/myjscourse",
      },
      cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      },
    };
  }
  return msalConfig;
};

// URL to get info :
// https://login.microsoftonline.com/f7a15417-57cb-4855-8d36-064f95aada17/.well-known/openid-configuration

// Add here the scopes to request when obtaining an access token for MS Graph API
// for more, visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/docs/scopes.md
const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};

// Add here scopes for access token to be used at MS Graph API endpoints.
const tokenRequest = {
  scopes: ["Mail.Read"],
};

export { getMsalConfig, loginRequest };
