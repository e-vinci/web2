import React from 'react';
import wrapWithProvider from './src/utils/auths/wrap-with-provider';

let i18nPluginOptions;

async function asyncPluginConfig() {
  const {
    default: { plugins },
  } = await import('./gatsby-config.mjs');
  const { options: i18nPluginOptionsTemp } = plugins.find(
    (plugin) => plugin.resolve === `gatsby-plugin-i18n`
  );
  i18nPluginOptions = i18nPluginOptionsTemp;
}

export const wrapRootElement = wrapWithProvider;

export const onServiceWorkerUpdateReady = () => {
  window.location.reload(true);
};

export const onClientEntry = async () => {
  await asyncPluginConfig();
  if (i18nPluginOptions.prefixDefault) {
    if (window.location.pathname === '/') {
      window.location.pathname = siteMetadata.languages.defaultLangKey;
    }
  }
};
