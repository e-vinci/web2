import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const NestedMdxBlock = ({ children }) => {
  if (children === undefined) return null;

  const childrenAsReactElements = convertAllChildrenToReactElement(children);

  return childrenAsReactElements;
};

const convertAllChildrenToReactElement = (children) => {
  const childrenAsReactElements = [];

  if (Array.isArray(children)) {
    children.forEach((element) => {
      const potentiallyConvertedReactElement =
        getReactElementFromAnyChild(element);
      childrenAsReactElements.push(potentiallyConvertedReactElement);
    });
  } else {
    const potentiallyConvertedReactElement =
      getReactElementFromAnyChild(children);
    childrenAsReactElements.push(potentiallyConvertedReactElement);
  }
  return childrenAsReactElements;
};

const getReactElementFromAnyChild = (child) => {
  if (React.isValidElement(child)) {
    return child;
  } else {
    const markdownStringConvertedToReactElement =
      getReactElementFromMarkdownString(child);
    return markdownStringConvertedToReactElement;
  }
};

const getReactElementFromMarkdownString = (markdownString) => {
  return (
    <ReactMarkdown
      children={markdownString}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    />
  );
};

export default NestedMdxBlock;
