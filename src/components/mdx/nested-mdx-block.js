import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Markdown from "markdown-to-jsx";
import * as ReactDOMServer from "react-dom/server";

const NestedMdxBlock = ({ children }) => {
  if (children === undefined) return null;

  console.log("CHILDREN : ", children);

  let markdowToRender = getMarkdowStringFromChildren(children);

  console.log("RENDER : ", markdowToRender);

  return (
    <ReactMarkdown
      children={markdowToRender}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    />
  );
};

const getMarkdowStringFromChildren = (children) => {
  let markdownString = "";
  if (Array.isArray(children)) {
    markdownString = getMarkdownStringFromJsxArray(children);
  } else if (React.isValidElement(children)) {
    markdownString = getMarkdownStringFromReactElement(children);
  } else markdownString = children ?? "";

  return markdownString;
};

const getMarkdownStringFromJsxArray = (jsxArray) => {
  let markdownString = "";
  jsxArray.forEach(
    (element) =>
      (markdownString += ReactDOMServer.renderToStaticMarkup(element))
  );
  return markdownString;
};

const getMarkdownStringFromReactElement = (reactElement) => {
  return ReactDOMServer.renderToStaticMarkup(reactElement);
};

export default NestedMdxBlock;
