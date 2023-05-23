import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
// import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from 'gatsby';
import MainLayout from '../components/main-layout.js';
import Image from '../components/image.js';
import Section from '../components/section.js';
import Content from '../components/content.js';
import Background from '../components/background.js';
import SectionHeader from '../components/section-header.js';
import SectionFooter from '../components/section-footer.js';
import PageHeader from '../components/page-header.js';
import { withFrontmatter } from '../components/hoc/hoc.js';
import CodeBlock from '../components/codeblock/codeblock.js';
import LinkFile from '../components/file/link-file.js';
import ScrollableImage from '../components/image/scrollable-image';
import PublicProjectsView from '../components/public-projects/public-projects-view';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import AuthenticatedBlock from '../components/auth/authenticated-block.js';
import UnAuthenticatedBlock from '../components/auth/unauthenticated-block.js';
import NestedMdxBlock from '../components/mdx/nested-mdx-block.js';
import YoutubeImage from '../components/image/youtube-image.js';

const shortcodes = {
  Link,
  Image,
  Section,
  Content,
  Background,
  SectionHeader,
  SectionFooter,
  PageHeader,
  CodeBlock,
  LinkFile,
  ScrollableImage,
  PublicProjectsView,
  AuthenticatedBlock,
  UnAuthenticatedBlock,
  NestedMdxBlock,
  YoutubeImage,
};

export default function PageTemplate({ data: { mdx, allImages }, children }) {
  shortcodes.PageHeader = withFrontmatter(PageHeader, mdx?.frontmatter);
  return (
    <MainLayout
      {...(mdx?.frontmatter ? { frontmatter: mdx.frontmatter } : {})}
      {...(mdx?.frontmatter?.navbarExtraStyles
        ? { navbarExtraStyles: mdx.frontmatter.navbarExtraStyles }
        : {})}
      {...(mdx?.frontmatter?.headerImage
        ? { headerImage: mdx.frontmatter.headerImage }
        : {})}
      {...(mdx?.frontmatter?.featuredImage
        ? { featuredImage: mdx.frontmatter.featuredImage }
        : {})}
      {...(mdx?.frontmatter?.title ? { pageTitle: mdx.frontmatter.title } : {})}
      {...(allImages && allImages.length > 0 ? { allImages: allImages } : {})}
    >
      <MDXProvider components={shortcodes}>
        <div
          className={
            mdx?.frontmatter?.autoMargin ? 'page page--auto-margin' : 'page'
          }
        >
          <div>{children.length}</div>
          {children}
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
      fields {
        slug
      }

      frontmatter {
        title
        date
        navbarExtraStyles
        headerImage
        featuredImage
        description
        autoMargin
      }
    }
    allImages: allFile(
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
`;
