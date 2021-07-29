import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";
import MainLayout from "../components/main-layout.js";
import Image from "../components/image.js";
import Section from "../components/section.js";
import Content from "../components/content.js";
import Background from "../components/background.js";
import SectionHeader from "../components/section-header.js";
import SectionFooter from "../components/section-footer.js";
import PageHeader from "../components/page-header.js";
import Index from "../components/index/index.js";
import { withFrontmatter } from "../components/hoc/hoc.js";

const shortcodes = {
  Link,
  Image,
  Section,
  Content,
  Background,
  SectionHeader,
  SectionFooter,
  PageHeader,
  Index,
};

export default function PageTemplate({ data: { mdx, allImages } }) {
  shortcodes.PageHeader = withFrontmatter(PageHeader, mdx.frontmatter);

  console.log("page:", allImages.edges);

  return (
    <MainLayout
      {...(mdx.frontmatter ? { frontmatter: mdx.frontmatter } : {})}
      {...(mdx.frontmatter.navbarExtraStyles
        ? { navbarExtraStyles: mdx.frontmatter.navbarExtraStyles }
        : {})}
      {...(mdx.frontmatter.headerImage
        ? { headerImage: mdx.frontmatter.headerImage }
        : {})}
      {...(mdx.frontmatter.featuredImage
        ? { featuredImage: mdx.frontmatter.featuredImage }
        : {})}
      {...(mdx.frontmatter.title ? { pageTitle: mdx.frontmatter.title } : {})}
      {...(allImages && allImages.length > 0 ? { allImages: allImages } : {})}
    >
      <MDXProvider components={shortcodes}>
        <div className="page">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </MDXProvider>
    </MainLayout>
  );
}

export const pageQuery = graphql`
  query pagesAndImages($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      slug
      frontmatter {
        title
        creationdate(formatString: "DD/MM/YYYY")
        navbarExtraStyles
        headerImage
        featuredImage
        description
      }
    }
    allImages: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
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
`;
