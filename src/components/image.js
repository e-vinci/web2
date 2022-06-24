import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

/**
 * Based on a name of a picture (WARNING : there cannot be duplicates), fill a container
 * with a picture.
 * It is also possible to provide as name the source of an external picture that shall contain
 * http:// or https:// to get a StaticImage.
 * NB : the picture is responsive and fully fill the container.
 * @param {*} param0
 * @returns
 */
const Image = ({ children, name, alt, width, height, display }) => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { nin: ["ico", "svg"] }
        }
      ) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(
                quality: 90
                layout: FULL_WIDTH
                placeholder: TRACED_SVG
                tracedSVGOptions: { color: "green", background: "grey" }
              )
            }
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
      <img
        src={name}
        style={{ height: "100%", width: "100%", zIndex: 2 }}
        alt={!alt ? "GatsbyImage" : alt}
      />
    );

  if (!name || !data.allFile.edges || data.allFile.edges.length === 0)
    return <div>{children}</div>;

  const requiredImage = data.allFile.edges.find(
    (image) => image.node.childImageSharp && image.node.base === name
  );
  if (!requiredImage) {
    return (
      <div>
        <h3 style={{ color: "red" }}>The image {name} does not exist !</h3>
        {children}
      </div>
    );
  }

  const image = getImage(requiredImage.node);

  return (
    <GatsbyImage
      image={image}
      style={{ height: height ?? "100%", width: width ?? "100%", zIndex: 2, display: display ?? "block"}}
      imgStyle={{ height: height ?? "100%", width: width ?? "100%", display: display ?? "block"}}
      alt={!alt ? "GatsbyImage" : alt}
    />
  );
};

export default Image;
