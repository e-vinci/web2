import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { GatsbyImage } from "gatsby-plugin-image";
//import { auto } from "@popperjs/core";
import { convertToBgImage } from "gbimage-bridge"
/**
 * this will be a section background by default
 * NB : currently, a section background cannot pass extra classes (only .section_background)
 *  */
const Background = ({ children, imageName, className }) => {
  //const classValue = `${className ? className : "section__background"}`;
  const classValue = `background ${className ? className : ""}`;
  const data = useStaticQuery(graphql`
    {
      allFile(filter: {sourceInstanceName: {eq: "images"}, extension: {nin: ["ico", "svg"]}}) {
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

  if (!imageName || !data.allFile.edges || data.allFile.edges.length === 0)
    return <div className={classValue}>{children}</div>;

  const requiredImage = data.allFile.edges.find(
    (image) =>
      image.node.childImageSharp && image.node.base === imageName
  );
  //console.log("image found", requiredImage);
  if (!requiredImage) {
    return (
      <div className={classValue}>
        <h3 style={{ color: "red" }}>The image {imageName} does not exist !</h3>
        {children}
      </div>
    );
  }

  const bgImage = convertToBgImage(requiredImage.node.childImageSharp.gatsbyImageData)

  return (
    <BackgroundImage
      Tag="section"
      className={classValue}
      {...bgImage}
      preserveStackingContext={true}
    >
      {children}
    </BackgroundImage>

    /*
    <div className="grid">
      <GatsbyImage
        image={requiredImage.node.childImageSharp.gatsbyImageData}
        layout="fullWidth"
        className="grid__background-image-wrapper" //{{ zIndex: 0, gridArea: "content" }}
        imgClassName="grid__background-image-wrapper__image"
      />
      <div className="grid__content">{children}</div>
    </div>*/


      


  );
};

export default Background;
