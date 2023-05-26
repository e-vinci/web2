import React, { useContext } from 'react';
// import { Link } from 'gatsby';
import { snakeCase } from 'lodash';
import { graphql } from 'gatsby';
import { useStaticQuery } from 'gatsby';
import { useIntl } from 'react-intl';

import InternationalLink from '../navbar/international-link';

const PathViewer = ({ className = 'path-viewer', children }) => {
  return <div className={className}>{children}</div>;
};

const PathViewerItem = ({
  className = 'path-viewer__item',
  children,
  to,
  selected,
}) => {
  const itemTextInSnakeCase = snakeCase(children);

  const data = useStaticQuery(
    graphql`
      {
        allSitePlugin(filter: { name: { eq: "gatsby-plugin-i18n" } }) {
          nodes {
            name
            pluginOptions
          }
        }
      }
    `
  );

  const i18nPluginOptions = data?.allSitePlugin.nodes[0].pluginOptions;

  const { locale } = useIntl();

  let path;
  if (selected) {
    path = '#';
  } else if (to) {
    path = to;
  } else {
    path = '#' + itemTextInSnakeCase;
  }

  return (
    <InternationalLink
      className={`${className} ${selected ? className + '--selected' : ''}`}
      id={`item_${itemTextInSnakeCase}`}
      i18nPluginOptions={i18nPluginOptions}
      absoluteLink={path}
      locale={locale}
    >
      {children}
    </InternationalLink>
  );
};

export { PathViewer, PathViewerItem };
