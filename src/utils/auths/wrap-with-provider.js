import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../../components/codeblock/codeblock";

const msalInstance = new PublicClientApplication(msalConfig);

// Deal with code snippet in MD(X) files
const component = {
  pre: CodeBlock,
};


export default ({ element }) => {
  return (<MsalProvider instance={msalInstance}>
    <MDXProvider components={component}>{element}
    </MDXProvider>
    </MsalProvider>);
};



