import React from "react";
import { graphql } from "gatsby";
import { useStaticQuery } from "gatsby";
import SectionHeader from "./section-header.js";
import Section from "./section.js";
import Content from "./content.js";
import Header from "./header.js";
import Footer from "./footer.js";
import Image from "./image.js";
import SEO from "./seo/seo.js";
import "../scss/main.scss";
import Scroll from "./scroll/scroll";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Fix huge icon flash: https://github.com/FortAwesome/react-fontawesome/issues/234
config.autoAddCss = false;

const MainLayout = ({
  children,
  navbarExtraStyles,
  headerImage,
  featuredImage,
  pageTitle,
  frontmatter,
}) => {
  const data = useStaticQuery(
    graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            menuLinks {
              name
              link
              subMenu {
                link
                name
              }
            }
            authorEmail
            youtubeUrl
            authorEmail
            facebookUrl
            instagramUrl
          }
        }
      }
    `
  );


  return (
    <div className="master">
      {/* Dealing with Meta Tags : page title.... 
      Use the SEO component*/}
      {/* <Helmet>{pageTitle && <title>{pageTitle}</title>}</Helmet> */}
      <SEO
        title={pageTitle}
        {...(frontmatter ? { description: frontmatter.description } : {})}
        language="fr"
      />

      <Header
        siteTitle={data.site.siteMetadata.title}
        menuLinks={data.site.siteMetadata.menuLinks}
        {...(navbarExtraStyles ? { navbarExtraStyles: navbarExtraStyles } : {})}
        {...(headerImage ? { headerImage: headerImage } : {})}
      />

      <main className="main">
        {featuredImage && (
          <div>
            <Section className="pt-3">
              <SectionHeader className="section__header--left">
                {pageTitle}
              </SectionHeader>
              <Content className="vh-50">
                <Image name={featuredImage} />{" "}
              </Content>
            </Section>
          </div>
        )}
        {children}
      </main>

      <Footer siteMetaData={data.site.siteMetadata}></Footer>
      <Scroll showBelow={250} />
    </div>
  );
};

export default MainLayout;
