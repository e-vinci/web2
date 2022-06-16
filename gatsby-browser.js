import React from "react";
import wrapWithProvider from "./src/utils/auths/wrap-with-provider";


export const wrapRootElement = wrapWithProvider;
export const onServiceWorkerUpdateReady = () => window.location.reload(true);

