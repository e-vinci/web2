// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
import { getMsalConfig, loginRequest } from "./authConfig.js";
import graphConfig from "../graph/graphConfig.js";
import * as Msal from "msal";
//import Navbar from "../../Components/Navbar.js";
import { navigate } from "gatsby";

// don't do anything if this is run at server side (no window object)
let myMSALObj;
let rawIdToken;
if (typeof window !== "undefined")
  myMSALObj = new Msal.UserAgentApplication(getMsalConfig());

/**
 *
 * @returns as a promise,  True if the user is signedIn.
 */
async function signIn() {
  try {
    const loginResponse = await myMSALObj.loginPopup(loginRequest);
    rawIdToken = loginResponse.idToken.rawIdToken;
    const accountData = myMSALObj.getAccount();
    if (accountData) {
      console.log("sign in:", accountData);
      return true;
    }
    return false;
  } catch (error) {
    console.error("signIn error:", error);
    throw error;
  }
}

function signOut() {
  myMSALObj.logout();
}

const getUserName = () =>
  myMSALObj.getAccount() ? myMSALObj.getAccount().userName : undefined;

const getName = () =>
  myMSALObj.getAccount() ? myMSALObj.getAccount().name : undefined;
const getIdToken = () =>
  myMSALObj.getAccount() ? sessionStorage.getItem("msal.idtoken") : undefined;

const acquireTokenSilent = async () => {
  try {
    const loginResponse = await myMSALObj.acquireTokenSilent(loginRequest);

    if (loginResponse) return true;

    return false;
  } catch (error) {
    console.error("acquireTokenSilent error:", error);

    throw error;
  }
};

export {
  signIn,
  signOut,
  myMSALObj,
  getUserName,
  getName,
  getIdToken,
  acquireTokenSilent,
};
