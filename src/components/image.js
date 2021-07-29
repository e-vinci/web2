import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

/**
 * Based on a name of a picture (WARNING : there cannot be duplicates), fill a container
 * with a picture.
 * NB : the picture is responsive and full fill the container.
 * @param {*} param0
 * @returns
 */
const Image = ({ children, name }) => {
  const data = useStaticQuery(graphql`{    
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(quality: 90, layout: FULL_WIDTH, placeholder: TRACED_SVG, tracedSVGOptions: {color:"green", background : "grey"} )
            }
            base
          }
        }
      }
    }
`);

  if (!name || !data.allFile.edges || data.allFile.edges.length === 0)
    return <div>{children}</div>;

  const requiredImage = data.allFile.edges.find(
    (image) =>
      image.node.childImageSharp &&
      image.node.base === name
  );
  //console.log("image found", requiredImage);
  if (!requiredImage) {
    return (
      <div>
        <h3 style={{ color: "red" }}>The image {name} does not exist !</h3>
        {children}
      </div>
    );
  }

  return (
    <GatsbyImage
      image={requiredImage.node.childImageSharp.gatsbyImageData}
      style={{ height: "100%", width: "100%", zIndex: 2 }}
      alt="GatsbyImage" />
  );
};

export default Image;
