import React from 'react';
import wrapWithProvider from './src/utils/auths/wrap-with-provider';
import { siteMetadata, plugins } from './gatsby-config';

const { options: i18nPluginOptions } = plugins.find(
  (plugin) => plugin.resolve === `gatsby-plugin-i18n`
);

export const wrapRootElement = wrapWithProvider;

export const onServiceWorkerUpdateReady = () => {
  window.location.reload(true);
};

export const onClientEntry = () => {
  if (i18nPluginOptions.prefixDefault) {
    if (window.location.pathname === '/') {
      window.location.pathname = siteMetadata.languages.defaultLangKey;
    }
  }
};
