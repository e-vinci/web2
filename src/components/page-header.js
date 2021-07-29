import React from "react";
const PageHeader = ({ children, className, frontmatter }) => {
  const classValue = `section__header ${className ? className : ""}`;
  console.log("frontmatter:", frontmatter);
  return (
    <div className={classValue}>
      <h3>{frontmatter.title}</h3>
      {children}
    </div>
  );
};

export default PageHeader;
