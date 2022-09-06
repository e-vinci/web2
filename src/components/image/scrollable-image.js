import React from "react";
import Image from "../image";
import { graphql, useStaticQuery } from "gatsby";

const ScrollableImage = ({ children, name, alt, minWidth, maxWidth }) => {
  let style = {};
  if (minWidth) style.minWidth = minWidth;
  if (maxWidth) style.maxWidth = maxWidth;
  const isSVG = name.includes(".svg");
  const isGif = name.includes(".gif");

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

  if (isSVG || isGif) {
    const requiredSvgOrGif = data.allFile.edges.find(
      (file) => file.node.base === name
    );
    if (!requiredSvgOrGif) {
      return (
        <div>
          <h3 style={{ color: "red" }}>The file {name} does not exist !</h3>
          {children}
        </div>
      );
    }

    return (
      <div className="scrollable-image">
        <div className="scrollable-image__wrapper" style={style}>
          <img
            src={requiredSvgOrGif.node.publicURL}
            alt={alt}
            style={{ height: "100%", width: "100%", zIndex: 2 }}
          >
            {children}
          </img>
        </div>
      </div>
    );
  }

  return (
    <div className="scrollable-image">
      <div className="scrollable-image__wrapper" style={style}>
        <Image {...{ name, alt }}>{children}</Image>
      </div>
    </div>
  );
};

export default ScrollableImage;
