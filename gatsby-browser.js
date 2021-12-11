import React from "react";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "./src/components/codeblock/codeblock";

const component = {
  pre: CodeBlock,
};

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={component}>{element}</MDXProvider>;
};

export const onServiceWorkerUpdateReady = () => window.location.reload(true);
