import React from "react";

const withFrontmatter = (WrappedComponent, frontmatter) => (props) => {
  return <WrappedComponent {...{ props, frontmatter }} />;
};

export { withFrontmatter };
