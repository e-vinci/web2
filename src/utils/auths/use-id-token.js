import { InteractionRequiredAuthError } from "@azure/msal-browser";

async function getAsyncIdToken(accounts, instance) {
  if (accounts.length > 0) {
    const request = {
      scopes: ["openid"],
      account: accounts[0],
    };

    try {
      const response = await instance.acquireTokenSilent(request);
      return response.idToken;
    } catch (error) {
      // acquireTokenSilent can fail for a number of reasons, fallback to interaction
      if (error instanceof InteractionRequiredAuthError) {
        const response2 = await instance.acquireTokenRedirect(request);
        return response2.idToken;
      }
    }
  }
}

export { getAsyncIdToken };
