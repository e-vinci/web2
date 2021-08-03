// Helper function to call our API
// using authorization bearer token scheme
import { acquireTokenSilent } from "../auths/authPopup";

export default async function callAPI(endpoint, method = "get", token, data) {
  let headers = new Headers();
  let options = {};
  options.method = method;

  if (token) {
    const bearer = `Bearer ${token}`;
    headers.append("Authorization", bearer);
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  if (
    method.toLowerCase() === "post" ||
    method.toLowerCase() === "patch" ||
    method.toLowerCase() === "put"
  )
    headers.append("Content-Type", "application/json");
  options.headers = headers;  
  const url = process.env.GATSBY_API_URL + endpoint;
  console.log(
    "request made to API at: " + new Date().toString(),
    "URL:",
    url,
    "Options:",
    options
  );
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let fullErrorMessage =
        " Error code : " +
        response.status +
        " : " +
        response.statusText +
        "/nMessage : ";
      const textResponse = await response.text();
      fullErrorMessage += textResponse;
      console.error("fetch() error", fullErrorMessage);
      // deal with token expiration
      if (fullErrorMessage.search("expired") > -1) {
        console.log("issue");
        return await onTokenExpiration();
      }
      throw new Error(fullErrorMessage);
    }
    return await response.json();
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
}

const onTokenExpiration = async () => {
  try {
    const success = await acquireTokenSilent();
    return success;
  } catch (error) {
    console.log("onTokenExpiration:error:", error);
    throw error;
  }
};
