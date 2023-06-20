import React from 'react';
import { graphql, useStaticQuery, withPrefix } from 'gatsby';
import SectionHeader from './section-header.js';
import Section from './section.js';
import Content from './content.js';
import Header from './header/header';
import Footer from './footer.js';
import Image from './image.js';
import SEO from './seo/seo.js';
import '../scss/main.scss';
import Scroll from './scroll/scroll';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider } from 'react-intl';
import { useLocation } from '@reach/router';
import { NavigationProvider } from './contexts/navigation-context.js';
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
            languages {
              defaultLangKey
              langs
            }
            title
            menuLinks {
              name
              link
              protected
              subMenu {
                link
                name
                protected
              }
            }
            authorEmail
            youtubeUrl
            authorEmail
            facebookUrl
            instagramUrl
            defaultAssociatedProjectGroupName
            isAuthentication
            version
          }
        }
      }
    `
  );

  const location = useLocation();

  let pathname = location?.pathname;

  const baseUrl = withPrefix('/');
  const potentialPrefix = baseUrl.replace('/', '');
  const prefix = potentialPrefix !== '' ? baseUrl : undefined;

  if (prefix) {
    pathname = pathname.replace(prefix, '/');
  }

  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, pathname);
  const homeLink = `/${langKey}/`.replace(`/${defaultLangKey}/`, '/');

  const url = getUrlForLang(homeLink, pathname);

  const langsMenu = getLangs(langs, langKey, url).map((item) => ({
    ...item,
    link: item.link.replace(`/${defaultLangKey}/`, '/'),
  }));

  return (
    <NavigationProvider>
      <IntlProvider locale={langKey} messages={{ langsMenu: langsMenu }}>
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
            siteMetadata={data.site.siteMetadata}
            {...(navbarExtraStyles
              ? { navbarExtraStyles: navbarExtraStyles }
              : {})}
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
                    <Image name={featuredImage} />{' '}
                  </Content>
                </Section>
              </div>
            )}
            {children}
          </main>

          <Footer
            siteMetaData={data.site.siteMetadata}
            langs={langsMenu}
          ></Footer>
          <Scroll showBelow={250} />
        </div>
      </IntlProvider>
    </NavigationProvider>
  );
};

export default MainLayout;
