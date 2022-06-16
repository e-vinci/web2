import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

/**
 * Based on a name of a file (WARNING : there cannot be duplicates), provide a link to this file
 *
 * It is also possible to provide as name the source of an external file that shall contain
 * http:// or https:// to get an external link.
 * @param {*} param0
 * @returns
 */
const LinkFile = ({ children, name, ...other }) => {
  const data = useStaticQuery(graphql`
    {
      allFile {
        edges {
          node {
            relativePath
            publicURL
            base
          }
        }
      }
    }
  `);

  if (
    (name && name.toLowerCase().includes("http://")) ||
    (name && name.toLowerCase().includes("https://"))
  )
    return (
      <a href={name} {...other}>
        {children}
      </a>
    );

  const requiredFile = data.allFile.edges.find(
    (file) => file.node.base === name
  );
  if (!requiredFile) {
    return (
      <div>
        <h3 style={{ color: "red" }}>The file {name} does not exist !</h3>
        {children}
      </div>
    );
  }

  return (
    <a href={requiredFile.node.publicURL} {...other}>
      {children}
    </a>
  );
};

export default LinkFile;
