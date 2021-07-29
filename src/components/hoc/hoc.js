import React from "react";

const withFrontmatter = (WrappedComponent, frontmatter) => (props) => {
  console.log("props", props);
  return <WrappedComponent {...{ props, frontmatter }} />;
};

export { withFrontmatter };
